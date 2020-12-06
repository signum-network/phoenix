/**
 * The Monitor Module is useful to poll for changes, e.g. on the Burst blockchain, especially for confirmations of transactions
 *
 * It is designed to be generic, such that it's not only usable for the blockchain also.
 *
 * Monitors are serializable, such they can be persisted and restored, which is useful for web apps.
 *
 * @moduledefinition monitor
 */
import {Monitor} from './monitor';
import {MonitorRepository} from './typings/monitorRepository';
import {MemoryMonitorRepository} from './repositories/memoryMonitorRepository';
import {LocalStorageMonitorRepository} from './repositories/localStorageMonitorRepository';
import {Logger} from './typings/logger';
import {ConsoleLogger} from './typings/consoleLogger';
export {
    Monitor,
    MonitorRepository,
    MemoryMonitorRepository,
    LocalStorageMonitorRepository,
    Logger,
    ConsoleLogger,
};

