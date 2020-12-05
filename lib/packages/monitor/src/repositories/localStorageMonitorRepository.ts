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

export class LocalStorageMonitorRepository implements MonitorRepository {

    constructor(private storage: Storage) {
    }

    get(key): Promise<GenericMonitor|null> {
        const item = this.storage.getItem(key);
        const monitor = item && Monitor.deserialize(item);
        return Promise.resolve(monitor || null);
    }

    getAll(): Promise<GenericMonitor[]> {
        const monitors = [];
        for (let i = 0; i < this.storage.length; ++i) {
            const key = this.storage.key(i);
            const serializedMonitor = this.storage.getItem(key);
            monitors.push(Monitor.deserialize(serializedMonitor));
        }
        return Promise.resolve(monitors);
    }

    insert(monitor: GenericMonitor): Promise<void> {
        if (this.storage.getItem(monitor.key)) {
            return Promise.reject(`Model with key '[${monitor.key}]' already exists`);
        }
        this.storage.setItem(monitor.key, monitor.serialize());
        return Promise.resolve();
    }

    remove(key): Promise<void> {
        if (this.storage.getItem(key)) {
            this.storage.removeItem(key);
        }
        return Promise.resolve();
    }
}
