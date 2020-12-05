import {MonitorRepository} from './typings/monitorRepository';
import {voidLogger} from './typings/voidLogger';
import {Logger} from './typings/logger';
import {Monitor} from './monitor';


interface MonitorServiceArgs {
    /**
     * The repository used to store and fetch monitors
     */
    monitorRepository: MonitorRepository;

    /**
     * The interval for monitor to poll in seconds
     */
    monitorIntervalSecs: number;

    /**
     * The timeout for monitor to give up polling, if -1 the monitor never times out
     */
    monitorTimeoutSecs: number;

    /**
     * A logger instance to log internals
     */
    logger?: Logger;
}


export class MonitorService {
    private readonly monitorRepository: MonitorRepository;
    private readonly monitorIntervalSecs: number;
    private readonly monitorTimeoutSecs: number;
    private readonly logger: Logger;
    private _activeMonitors: Monitor[] = [];

    constructor(args: MonitorServiceArgs) {
        this.monitorRepository = args.monitorRepository;
        this.monitorIntervalSecs = args.monitorIntervalSecs;
        this.monitorTimeoutSecs = args.monitorTimeoutSecs;
        this.logger = args.logger || voidLogger;
    }

    get activeMonitors(): Monitor[] {
        return this._activeMonitors;
    }

    async restoreMonitors(): Promise<Monitor[]> {
        const monitors = await this.monitorRepository.getAll();
        const monitorPromises = monitors.map(monitor => {
            this.restoreMonitor(monitor.key);
        });

        return await Promise.all(monitorPromises)
    }

    async restoreMonitor(key): Promise<Monitor> {
        const {expected, startTime} = await this.monitorRepository.get(key);
        const fieldName = Object.keys(expected)[0];
        const expectedValue = expected[fieldName];
        const expired = (Date.now() - startTime) / 1000 > this.monitorTimeoutSecs;
        if (expired) {
            this.logger.debug(`Expired Monitor: ${key}`);
            await this.removeMonitor(key);
            return;
        }
        return this.startMonitor({
            key,
            fieldName,
            expectedValue,
            startTime,
        });
    }

    /**
     * Starts a polling monitor
     * @param key The id for the monitor, i.e monitor id
     * @param asyncFetcher The data fetcher as promise, that's used to fetch the data to be monitored
     * @param targetFieldName The field name of entity to be monitored
     * @param targetValue The value of the monitored entity, such that the callback returns fulfilled = true
     * @param timeoutCallback The callback called if monitoring timed out - signature (currentEntityData: object) => void | Promise<void>
     * @param fulfilledCallback The callback called if targetValue matches - signature (currentEntityData: object) => void | Promise<void>
     * @param startTime The starting timestamp, defaults to Date.now()
     * @returns {Promise<void>}
     */
    async startMonitor({
                           key,
                           asyncFetcher,
                           targetFieldName,
                           targetValue,
                           timeoutCallback,
                           fulfilledCallback,
                       }): Promise<Monitor | null> {
        const isMonitorActive = this._activeMonitors.indexOf(key) !== -1;
        if (isMonitorActive) {
            this.logger.debug(`Monitor [${key}] already active - ignored`);
            return Promise.resolve(null);
        }
        const monitor = new Monitor({
            key,
            abortAfterSecs: this.monitorTimeoutSecs,
            intervalSecs: this.monitorIntervalSecs,
        });
        monitor.start({
            asyncFetcher,
            predicateFn: state => state[targetFieldName] === targetValue,
            callback: async (data, fulfilled) => {
                await this.removeMonitor(key);
                if (!fulfilled) {
                    timeoutCallback(data);
                } else {
                    fulfilledCallback(data);
                }
            },
        });


        // const monitorModel= new MonitorModel
        await this.monitorRepository.insert({
            key,
            expected: {
                [targetFieldName]: targetValue,
            },
            startTime: monitor.startTime,
        });

        this._activeMonitors.push(key);
        this.
    }

    async removeMonitor(key) {
        await this.monitorRepository.remove(key);
        this._activeMonitors = this._activeMonitors.filter(id => id !== id);
        this.logger.debug(`Monitor ${key} removed`);
    }

    public onTimeout(fn: () => void) {

    }

    public onFulfilled(fn: () => void) {

    }
}
