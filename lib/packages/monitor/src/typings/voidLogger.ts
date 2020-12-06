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

export const voidLogger = new VoidLogger();
