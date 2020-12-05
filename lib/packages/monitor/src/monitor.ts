import {voidLogger} from './typings/voidLogger';
import {Logger} from './typings/logger';
import {EventEmitter} from './internal/eventEmitter';
import {FetchFunction, MonitorArgs, PredicateFunction} from './typings/args/monitorArgs';

const MonitorEvents = {
    Fulfilled: '@burstjs/monitor/fulfilled',
    Timeout: '@burstjs/monitor/timeout',
};

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

    constructor(args: MonitorArgs<T>) {
        const {
            timeoutSecs,
            asyncFetcherFn,
            compareFn,
            intervalSecs,
            key,
            logger,
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

    public get startTime(): number {
        return this._startTime;
    }

    public get intervalSecs(): number {
        return this._intervalSecs;
    }

    public get key(): string {
        return this._key;
    }

    public get timeoutSecs(): number {
        return this._timeoutSecs;
    }

    public static deserialize<T>(data: string): Monitor<T> {
        const args = JSON.parse(data);
        return new Monitor({
            ...args,
            asyncFetcherFn: Monitor._deserializeFunction<FetchFunction>(args.asyncFetcherFn),
            compareFn: Monitor._deserializeFunction<PredicateFunction>(args.compareFn),
        });
    }

    private static _serializeFunction(fn): string {
        return fn.toString().replace(/\s+/g, ' ');
    }

    private static _deserializeFunction<T>(serialized: string): T {
        // tslint:disable-next-line:no-eval
        return eval(serialized) as T;
    }

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

    hasStarted(): boolean {
        return this.startTime !== -1;
    }

    isExpired(): boolean {
        return this.hasStarted()
            ? (Date.now() - this._startTime) / 1000 >= this._timeoutSecs
            : false;
    }

    start() {
        this._debug('Monitoring...');

        if (this.isExpired()) {
            this._debug('Monitor expired');
            this.abort();
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
                    this._emitter.emit(MonitorEvents.Fulfilled, data);
                    this._resetStartTime();
                } else if (!this.isExpired()) {
                    this.start();
                } else {
                    this._debug('Monitor timed out');
                    this._emitter.emit(MonitorEvents.Timeout);
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

    abort() {
        // @ts-ignore
        clearTimeout(this._handle);
        this._startTime = -1;
    }

    onTimeout(fn: Function): void {
        this._emitter.on(MonitorEvents.Timeout, fn);
    }

    onFulfilled(fn: Function): void {
        this._emitter.on(MonitorEvents.Fulfilled, fn);
    }

}
