import {voidLogger} from './typings/voidLogger';
import {Logger} from './typings/logger';
import {EventEmitter} from './internal/eventEmitter';
import {
    FetchFunction,
    FulfilledFunction,
    MonitorArgs,
    PredicateFunction,
    TimeoutFunction
} from './typings/args/monitorArgs';

const MonitorEvents = {
    Fulfilled: '@burstjs/monitor/fulfilled',
    Timeout: '@burstjs/monitor/timeout',
};

/**
 * The generic monitor class.
 *
 * A monitor can be used to check periodically for a certain situation, e.g. confirmation of a transaction,
 * activation on an account, or even something completely different.
 *
 * Example: (checking for the existence of an account aka account activation)
 * ```js
 * // A method that checks if an account exists
 * // > IMPORTANT: Do not use closures, when you need to serialize the monitor
 * async function tryFetchAccount() {
 *    const BurstApi = composeApi({ nodeHost: 'https://testnet.burstcoin.network:6876/'})
 *    try{
 *        const {account} = await BurstApi.account.getAccount('1234')
 *        return account;
 *    }catch (e){
 *        // ignore error
 *        return null;
 *    }
 *}
 *
 * // A comparing function to check if a certain condition for the returned data from fetch function
 * // is true. If it's true the monitor stops
 * function checkIfAccountExists(account) {
 *    return account !== null;
 *}
 *
 * // Create your monitor
 * const monitor = new Monitor<Account>({
 *    asyncFetcherFn: tryFetchAccount,
 *    compareFn: checkIfAccountExists,
 *    intervalSecs: 10, // polling interval in seconds
 *    key: 'monitor-account',
 *    timeoutSecs: 2 * 240 // when reached timeout the monitor stops
 *});
 * // starts monitor
 * monitor.start();
 *
 * // called when `checkIfAccountExists` returns true
 * monitor.onFulfilled(() => {
 *    console.log('Yay, account active');
 *});
 *
 * // called when `timeoutSecs` is reached
 * monitor.onTimeout(() => {
 *    console.log('Hmm, something went wrong');
 *});
 *```
 * @module monitor
 */
export class Monitor<T> {
    private readonly _timeoutSecs: number = -1;
    private readonly _asyncFetcher: FetchFunction<T>;
    private readonly _compareFn: PredicateFunction<T>;
    private readonly _emitter = new EventEmitter();
    private readonly _intervalSecs: number = -1;
    private readonly _key: string;
    private _startTime = -1;
    private _logger: Logger;
    private _handle: any = undefined;

    /**
     * The monitors constructor
     * @param args The arguments
     */
    constructor(args: MonitorArgs<T>) {
        const {
            asyncFetcherFn,
            compareFn,
            intervalSecs,
            key,
            logger,
            timeoutSecs,
        } = args;

        if (intervalSecs < 1) {
            throw new Error('interval must be greater than zero');
        }

        this._key = key;
        this._intervalSecs = intervalSecs;
        this._timeoutSecs = timeoutSecs;
        this._asyncFetcher = asyncFetcherFn;
        this._compareFn = compareFn;
        this._logger = logger || voidLogger;
    }

    /**
     * The start timestamp if started, or -1
     */
    public get startTime(): number {
        return this._startTime;
    }

    /**
     * The interval
     */
    public get intervalSecs(): number {
        return this._intervalSecs;
    }

    /**
     * The key aka identifier
     */
    public get key(): string {
        return this._key;
    }

    /**
     * The timeout
     */
    public get timeoutSecs(): number {
        return this._timeoutSecs;
    }

    /**
     * Deserializes a serialized monitor
     * @see [[Monitor.serialize]]
     * @param serializedMonitor The serialized monitor
     * @param autoStart If monitor was started on serialization the monitor starts automatically, if set true (default)
     * @return The monitor instance
     */
    public static deserialize<T>(serializedMonitor: string, autoStart = true): Monitor<T> {
        const args = JSON.parse(serializedMonitor);
        const monitor = new Monitor<T>({
            ...args,
            asyncFetcherFn: Monitor._deserializeFunction<FetchFunction>(args.asyncFetcherFn),
            compareFn: Monitor._deserializeFunction<PredicateFunction>(args.compareFn),
        });
        monitor._startTime = args.startTime;
        if (autoStart && args.startTime > -1) {
            monitor.start();
        }
        return monitor;
    }

    private static _serializeFunction(fn): string {
        return fn.toString().replace(/\s+/g, ' ');
    }

    private static _deserializeFunction<T>(serialized: string): T {
        // tslint:disable-next-line:no-eval
        return eval(serialized) as T;
    }

    /**
     * Serializes the monitor, such it can be stored.
     * This serializes also the `asyncFetcher` and `compareFn`
     * It is important that these functions are not closures, i.e. the must not reference
     * outer data/variables, otherwise the behavior on deserialization is not deterministic
     */
    public serialize(): string {
        return JSON.stringify({
            intervalSecs: this._intervalSecs,
            timeoutSecs: this._timeoutSecs,
            key: this._key,
            startTime: this._startTime,
            asyncFetcherFn: Monitor._serializeFunction(this._asyncFetcher),
            compareFn: Monitor._serializeFunction(this._compareFn),
        });
    }

    _debug(msg) {
        this._logger.debug(`[${this._key}] - ${msg}`);
    }

    _resetStartTime() {
        this._startTime = -1;
    }

    /**
     * @return true, if monitor was started and is running
     */
    hasStarted(): boolean {
        return this.startTime !== -1;
    }

    /**
     * @returns true, if a started monitor timed out.
     */
    isExpired(): boolean {
        return this.hasStarted()
            ? (Date.now() - this._startTime) / 1000 >= this._timeoutSecs
            : false;
    }

    /**
     * Starts the monitor
     */
    start() {
        this._debug('Monitoring...');

        if (this.isExpired()) {
            this._debug('Monitor expired');
            this.stop();
            return;
        }

        // @ts-ignore
        this._handle = setTimeout(async () => {
            try {
                const data = await this._asyncFetcher();
                this._debug(`Fetched: ${JSON.stringify(data, null, '\t')}`);
                const predicateFulfilled = this._compareFn(data);
                if (predicateFulfilled) {
                    this._debug('Monitor predicate fulfilled');
                    this._emitter.emit(MonitorEvents.Fulfilled, {
                        key: this.key,
                        data
                    });
                    this._resetStartTime();
                } else if (!this.isExpired()) {
                    this.start();
                } else {
                    this._debug('Monitor timed out');
                    this._emitter.emit(MonitorEvents.Timeout, {
                        key: this.key,
                    });
                    this._resetStartTime();
                }
            } catch (e) {
                this._debug(`Monitor failed: ${e}`);
            }
        }, this._intervalSecs * 1000);

        if (!this.hasStarted()) {
            this._startTime = Date.now();
        }
    }

    /**
     * Stops the monitor
     */
    stop() {
        // @ts-ignore
        clearTimeout(this._handle);
        this._startTime = -1;
    }

    /**
     * Callback function for timeout event. You can add multiple event listener if you want
     * @param fn The callback
     */
    onTimeout(fn: TimeoutFunction): void {
        this._emitter.on(MonitorEvents.Timeout, fn);
    }

    /**
     * Callback function for fulfilled event. You can add multiple event listener if you want
     * @param fn The callback
     */
    onFulfilled(fn: FulfilledFunction<T>): void {
        this._emitter.on(MonitorEvents.Fulfilled, fn);
    }

}
