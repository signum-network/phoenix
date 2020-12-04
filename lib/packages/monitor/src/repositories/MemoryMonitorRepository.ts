import {MonitorRepository} from '../typings/monitorRepository';
import {MonitorModel} from '../typings/monitorModel';

interface Dictionary<T> {
    [key: string]: T;
}

export class MemoryMonitorRepository implements MonitorRepository {

    private monitors: Dictionary<MonitorModel> = {};

    get(monitorId): Promise<MonitorModel> {
        return Promise.resolve(this.monitors[monitorId]);
    }

    getAll(): Promise<MonitorModel[]> {
        const monitors = Object.keys(this.monitors).map(k => this.monitors[k]);
        return Promise.resolve(monitors);
    }

    insert(model: MonitorModel): Promise<void> {
        if (this.monitors[model.id]) {
            return Promise.reject(`Object with id '[${model.id}]' already exists`);
        }
        this.monitors[model.id] = model;
        return Promise.resolve();
    }

    remove(monitorId): Promise<void> {
        if (this.monitors[monitorId]) {
            delete this.monitors[monitorId];
        }
        return Promise.resolve();
    }
}

export const memoryModelRepository = new MemoryMonitorRepository();
