type LoggerFn = (msg: string) => void;

/**
 * The logger interface for a logger used by monitor
 *
 * @module monitor
 */
export interface Logger {
    error: LoggerFn;
    debug: LoggerFn;
    log: LoggerFn;
}
