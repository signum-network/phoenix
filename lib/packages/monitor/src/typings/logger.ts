type LoggerFn = (msg: string) => void;

export interface Logger {
    error: LoggerFn;
    debug: LoggerFn;
    log: LoggerFn;
}
