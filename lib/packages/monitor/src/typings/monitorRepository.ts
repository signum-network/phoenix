import {MonitorModel} from './monitorModel';

export interface MonitorRepository {
    getAll(): Promise<MonitorModel[]>;
    get(monitorId): Promise<MonitorModel>;
    insert(monitor: MonitorModel): Promise<void>;
    remove(monitorId): Promise<void>;
}
