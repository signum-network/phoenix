/**
 * Copyright (c) 2020 Burst Apps Team
 */

import {GenericMonitor} from './GenericMonitor';

/**
 * The repository for monitor storing
 *
 * @module monitor
 */
export interface MonitorRepository {

    /**
     * Gets all monitors, or empty [], if no monitors are available
     */
    getAll(): Promise<GenericMonitor[]>;

    /**
     * Gets a single monitor
     * @param monitorKey the key to identify the monitor
     * @return The monitor if exists, or `null`
     */
    get(monitorKey): Promise<GenericMonitor | null>;

    /**
     * Inserts a monitor
     * @param monitor the monitor to be stored. If monitor exists already in the repo
     * the insert method rejects the promise with a message, i.e.
     * `Model with key '[${monitor.key}]' already exists`
     */
    insert(monitor: GenericMonitor): Promise<void>;

    /**
     * Removes a monitor
     * @param monitorKey The key for the monitor to be removed. If monitor does not exists,
     * remove just ignores the actions and does not reject or throws any error
     */
    remove(monitorKey): Promise<void>;
}
