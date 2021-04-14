/**
 * Original work Copyright (c) 2021 Burst Apps Team
 */

interface AsyncRetryArgs<T> {
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

/**
 * Utility function to retry async functions.
 *
 * @param args The argument object*
 * @module util
 */
export async function asyncRetry<T>(args: AsyncRetryArgs<T>): Promise<T> {
    const {asyncFn, onFailureAsync, retryCount = 1, maxRetrials = 20} = args;
    try {
        return await asyncFn();
    } catch (e) {
        if (retryCount > maxRetrials) {
            throw e; // cannot recover
        }
        const shouldRetry = await onFailureAsync(e, retryCount);
        if (shouldRetry) {
            await asyncRetry({asyncFn, onFailureAsync, retryCount: retryCount + 1});
        } else {
            throw e; // rethrow most recent error
        }
    }
}

