import {MonitorRepository} from '../typings/monitorRepository';
import {GenericMonitor} from '../typings/GenericMonitor';
import {Monitor} from '../monitor';

export interface Storage {
    length: number;
    setItem: (key: string, value: any) => void;
    getItem: (key: string) => any | null;
    removeItem: (key: string) => void;
    key: (n: number) => any | null;
    clear: () => void;
}


/**
 * The LocalStorage repo options
 */
interface Options {
    /**
     * If set to true the monitor will be started automatically on
     * [[LocalStorageMonitorRepository.get]] and [[LocalStorageMonitorRepository.getAll]]
     */
    autoStart?: boolean;
}

const DefaultOptions: Options = {
    autoStart: true
};

/**
 * A repository to persist a monitor in a _localStorage_ like/compliant storage
 *
 * @module monitor
 */
export class LocalStorageMonitorRepository implements MonitorRepository {

    /**
     * @param storage a _localStorage_ compliant implementation
     * Usually, you will use the browser localStorage, so
     *
     * `new LocalStorageMonitorRepository(window.localStorage)`
     *
     * would be your way to go
     * @param options Additional options
     */
    constructor(private storage: Storage, private options: Options = DefaultOptions) {
    }

    /**
     * Gets a specific monitor by key
     * @param key The identifier of the monitor
     * @note The monitor will be deserialized and eventually started (see options)
     * @return the monitor instance, or null if not found
     */
    get(key): Promise<GenericMonitor | null> {
        const item = this.storage.getItem(key);
        const monitor = item && Monitor.deserialize(item, this.options.autoStart);
        return Promise.resolve(monitor || null);
    }

    /**
     * Gets all stored monitors
     * @note The monitors will be deserialized and eventually started (see options)
     * @return the monitor instances
     */
    getAll(): Promise<GenericMonitor[]> {
        const monitors = [];
        for (let i = 0; i < this.storage.length; ++i) {
            const key = this.storage.key(i);
            const serializedMonitor = this.storage.getItem(key);
            monitors.push(Monitor.deserialize(serializedMonitor, this.options.autoStart));
        }
        return Promise.resolve(monitors);
    }

    /**
     * Inserts/Serializes a monitor, if not exists already
     * @param monitor The monitor instance
     * @throws If monitor already stored
     */
    insert(monitor: GenericMonitor): Promise<void> {
        if (this.storage.getItem(monitor.key)) {
            return Promise.reject(`Model with key '[${monitor.key}]' already exists`);
        }
        this.storage.setItem(monitor.key, monitor.serialize());
        return Promise.resolve();
    }

    /**
     * Removes a monitor
     * @param key The monitors key
     * @note If no monitor with given key is stored, the method does nothing
     */
    remove(key): Promise<void> {
        if (this.storage.getItem(key)) {
            this.storage.removeItem(key);
        }
        return Promise.resolve();
    }
}
