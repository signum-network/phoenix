import {MonitorRepository} from '../typings/monitorRepository';
import {GenericMonitor} from '../typings/GenericMonitor';

interface Dictionary<T> {
    [key: string]: T;
}

/**
 * A repository to hold a monitor instance in the memory
 * This is useful for testing purposes, or just simple management
 * If you need persistence you should go with the [[LocalStorageMonitorRepository]]
 * @module monitor
 */
export class MemoryMonitorRepository implements MonitorRepository {

    private monitors: Dictionary<GenericMonitor> = {};

    /**
     * Gets a specific monitor by key
     * @param key The key of the monitor
     * @return the monitor instance, or null if not found
     */
    get(key): Promise<GenericMonitor | null> {
        return Promise.resolve(this.monitors[key] || null);
    }

    /**
     * Gets all stored monitors
     * @return the monitor instances
     */
    getAll(): Promise<GenericMonitor[]> {
        const monitors = Object.keys(this.monitors).map(k => this.monitors[k]);
        return Promise.resolve(monitors);
    }

    /**
     * Inserts a monitor, if not exists already
     * @param monitor The monitor instance
     * @throws If monitor already stored
     */
    insert(monitor: GenericMonitor): Promise<void> {
        if (this.monitors[monitor.key]) {
            return Promise.reject(`Monitor with key '[${monitor.key}]' already exists`);
        }
        this.monitors[monitor.key] = monitor;
        monitor.stop();
        return Promise.resolve();
    }

    /**
     * Removes a monitor
     * @param key The monitors key
     * @note If no monitor with given key is stored, the method does nothing
     */
    remove(key): Promise<void> {
        if (this.monitors[key]) {
            delete this.monitors[key];
        }
        return Promise.resolve();
    }
}
