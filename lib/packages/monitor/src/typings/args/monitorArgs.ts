/**
 * Copyright (c) 2020 Burst Apps Team
 */

import {Logger} from '../logger';

interface KeyArgs {
    key: string;
}

interface FulfilledArgs<T> extends KeyArgs {
    data: T;
}

export type FetchFunction<T = any> = () => Promise<T>;
export type PredicateFunction<T = any> = (fetchData: T) => boolean;
export type TimeoutFunction = (args: KeyArgs) => void;
export type FulfilledFunction<T = any> = (args: FulfilledArgs<T>) => void;

/**
 * The monitor creation Arguments
 *
 * @module monitor
 */
export interface MonitorArgs<T> {
    /**
     * The monitors identifier
     */
    key: string;
    /**
     * The polling/checking interval in seconds
     */
    intervalSecs: number;
    /**
     * The time in seconds when the monitor should give up checking, i.e. times out
     */
    timeoutSecs: number;
    /**
     * An optional logger
     */
    logger?: Logger;
    /**
     * This is the fetching function called each _interval_.
     * The fetcher must return data of type `T`
     * @note If you intend to serialize, e.g. using [[LocalStorageMonitorRepository]], the monitor
     * you must not use closures, as this might lead to non-deterministic behavior.
     */
    asyncFetcherFn: FetchFunction<T>;
    /**
     * Once the `asyncFetcher` has fetched the data, the result will be compared
     * herein. Return `true`, if a certain condition is met
     * @note If you intend to serialize, e.g. using [[LocalStorageMonitorRepository]], the monitor
     * you must not use closures, as this might lead to non-deterministic behavior.
     */
    compareFn: PredicateFunction<T>;
}
