/**
 * Original work Copyright (c) 2021 Burst Apps Team
 */


/**
 * Args object for [[asyncRetry]]
 *
 * @module util
 */
export interface AsyncRetryArgs<T> {
    /**
     * The promise to be executed. It needs to throw an error in case of failure
     */
    asyncFn: () => Promise<T>;
    /**
     * The callback in case of a failure of `asyncFn`. Can be used to prepare something before
     * as `asyncFn` is being called next
     * @param e The error thrown by `asyncFn`
     * @param retryCount The number of retrials (incremented automatically) so far
     * @return `true` if `asyncFn` should be called again, or `false`
     */
    onFailureAsync: (e: Error, retryCount: number) => Promise<boolean>;

    /**
     * The absolute maximum number of retrials. Default: 20
     */
    maxRetrials?: number;

    /**
     * The counter of retrials. It is managed automatically, so you do not need to set this
     */
    retryCount?: number;
}
