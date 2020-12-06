/**
 * Copyright (c) 2020 Burst Apps Team
 */

import {Logger} from './logger';

/**
 * A logger implementation that does absolutely nothing
 *
 * @module monitor
 */
export class VoidLogger implements Logger {
    debug(msg: string): void {
    }

    error(msg: string): void {
    }

    log(msg: string): void {
    }
}

/**
 * A singleton instance of the VoidLogger
 * @module monitor
 */
export const voidLogger = new VoidLogger();
