import {voidLogger} from './typings/voidLogger';
import {Logger} from './typings/logger';

interface MonitorArgs {
    key: string;
    intervalSecs: number;
    abortAfterSecs: number;
    logger?: Logger;
    asyncFetcher: () => Promise<unknown>;
}

export class Monitor {

    protected constructor({key, asyncFetcher, intervalSecs, abortAfterSecs, logger}: MonitorArgs) {
        if (intervalSecs < 1) {
            throw new Error('interval must be greater than zero');
        }
        this._key = key;
        this._intervalSecs = intervalSecs;
        this._abortAfterSecs = abortAfterSecs;
        this._asyncFetcher = asyncFetcher;
        this._logger = logger || voidLogger;
    }

    public get startTime(): number {
        return this._startTime;
    }

    private readonly _key: string;
    private readonly _intervalSecs: number = -1;
    private readonly _abortAfterSecs: number = -1;
    private  _asyncFetcher: () => Promise<unknown>;
    private _startTime = -1;
    private _logger: Logger;
    private _handle: any = undefined;

    public abstract fetcher();

    public static deserialize(data: string): Monitor {
        const args = JSON.parse(data) as MonitorArgs;

        return new Monitor(args);
    }

    public async serialize(): Promise<string> {

        const t = this._asyncFetcher.toString()
            .replace(/\s+/g, ' ')
        // const p = JSON.parse(t);
        // tslint:disable-next-line:no-eval
        const x = eval(t);

        const y  = await x() as () => Promise<unknown>;

        return JSON.stringify({
            intervalSecs: this._intervalSecs,
            abortAfterSecs: this._abortAfterSecs,
            key: this._key,
            startTime: this._startTime,
            fetcher: this.fetcher.toString()
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
            ? (Date.now() - this._startTime) / 1000 >= this._abortAfterSecs
            : false;
    }

    start({predicateFn, callback}) {
        this._debug('Monitoring...');

        if (this.isExpired()) {
            this._debug('Monitor expired');
            return;
        }

        // @ts-ignore
        this._handle = setTimeout(async () => {
            try {
                const data = await this.fetch();
                this._debug(`Fetched: ${JSON.stringify(data, null, '\t')}`);
                if (predicateFn(data)) {
                    this._debug('Monitor predicate fulfilled');
                    callback(data, true);
                    this._resetStartTime();
                }
                if (!this.isExpired()) {
                    this.start({predicateFn, callback});
                } else {
                    this._debug('Monitor timed out');
                    callback(data, false);
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


}
