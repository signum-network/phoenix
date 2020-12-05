import {MonitorRepository} from '../typings/monitorRepository';
import {GenericMonitor} from '../typings/GenericMonitor';

interface Dictionary<T> {
    [key: string]: T;
}

export class MemoryMonitorRepository implements MonitorRepository {

    private monitors: Dictionary<GenericMonitor> = {};

    get(key): Promise<GenericMonitor | null> {
        return Promise.resolve(this.monitors[key]);
    }

    getAll(): Promise<GenericMonitor[]> {
        const monitors = Object.keys(this.monitors).map(k => this.monitors[k]);
        return Promise.resolve(monitors);
    }

    insert(monitor: GenericMonitor): Promise<void> {
        if (this.monitors[monitor.key]) {
            return Promise.reject(`Monitor with key '[${monitor.key}]' already exists`);
        }
        this.monitors[monitor.key] = monitor;
        return Promise.resolve();
    }

    remove(key): Promise<void> {
        if (this.monitors[key]) {
            delete this.monitors[key];
        }
        return Promise.resolve();
    }
}
