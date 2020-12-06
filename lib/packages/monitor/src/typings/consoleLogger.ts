/* global console */

import {Logger} from './logger';

/**
 * Simple console logger implementation
 *
 * @module monitor
 */
export class ConsoleLogger implements Logger {
    debug(msg: string): void {
        // @ts-ignore
        console.log(`[DEBUG]: ${msg}`);
    }

    error(msg: string): void {
        // @ts-ignore
        console.log(`[ERROR]: ${msg}`);
    }

    log(msg: string): void {
        // @ts-ignore
        console.log(`[LOG]: ${msg}`);
    }
}

export const consoleLogger = new ConsoleLogger();
