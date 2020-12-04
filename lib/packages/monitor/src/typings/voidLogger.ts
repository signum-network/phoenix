import {Logger} from './logger';

export class VoidLogger implements Logger {
    debug(msg: string): void {
    }

    error(msg: string): void {
    }

    log(msg: string): void {
    }
}

export const voidLogger = new VoidLogger();
