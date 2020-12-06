/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {MonitorRepository} from '../typings/monitorRepository';
import {Monitor} from '../monitor';
import {consoleLogger} from '../typings/consoleLogger';
import {MonitorArgs} from '../typings/args/monitorArgs';

/**
 * This is the convenience service to work with monitors
 *
 * This service also persists the monitor once it is started and
 * automatically removes on timeout or fulfillment.
 *
 * @moduledefinition monitor
 */
export class MonitorService {

    /**
     * Creates the service instance
     * @param repository The storage repository to be used
     * @param logger The logger to show messages, default is console logging
     */
    constructor(
        private repository: MonitorRepository,
        private logger = consoleLogger) {
    }

    /**
     * Stops a monitor and removes from storage (aka repository)
     * If monitor does not exist, this method does nothing
     * @param key The monitors key
     */
    public async stopMonitor(key) {
        this.logger.debug(`Stopping monitor [${key}]...`);
        const monitor = await this.repository.get(key);
        if (monitor) {
            monitor.stop();
            await this.repository.remove(key);
        }
    }

    /**
     * Loads all monitors from repository _and_ starts them
     */
    async loadAllMonitors() {
        const monitors = await this.repository.getAll();
        const loaderPromises = monitors.map(monitor => this.loadMonitor(monitor.key));
        await Promise.all(loaderPromises);
    }

    /**
     * Loads a single monitor from the storage and starts it
     * @param key The monitors key to be loaded.
     */
    async loadMonitor(key) {
        const monitor = await this.repository.get(key);
        if (!monitor) {
            this.logger.debug(`Monitor [${key}] not found...ignored`);
        } else if (monitor.isExpired()) {
            this.logger.debug(`Removing expired Monitor [${key}]...`);
            await this.repository.remove(key);
        } else {
            await this.startMonitor(monitor);
        }
    }

    /**
     * Starts a monitor.
     *
     * Started monitors will automatically stored in the storage and removed on timeout or fulfillment
     *
     * @param monitor The monitor to be started, or its arguments (the monitor instance will be constructed)
     * @return The started monitor. You want to register your callbacks for [[Monitor.onFulfillment]] and [[Monitor.onTimeout]]
     */
    async startMonitor<T = any>(monitor: Monitor<T> | MonitorArgs<T>): Promise<Monitor<T>> {
        const m = monitor instanceof Monitor ? monitor : new Monitor(monitor);
        if (m.isExpired()) {
            this.logger.debug(`Monitor ${m.key} already expired...removing`);
            await this.repository.remove(m.key);
        }
        m.start();
        await this.repository.insert(m);
        m.onFulfilled(async ({key}) => {
            this.logger.debug(`Monitor ${key} fulfilled...removing`);
            await this.repository.remove(key);
        });
        m.onTimeout(async ({key}) => {
            this.logger.debug(`Monitor ${key} timed out...removing`);
            await this.repository.remove(key);
        });

        return m;
    }
}
