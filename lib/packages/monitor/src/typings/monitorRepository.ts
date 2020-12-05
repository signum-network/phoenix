import {GenericMonitor} from './GenericMonitor';

export interface MonitorRepository {
    getAll(): Promise<GenericMonitor[]>;
    get(monitorKey): Promise<GenericMonitor|null>;
    insert(monitor: GenericMonitor): Promise<void>;
    remove(monitorKey): Promise<void>;
}
