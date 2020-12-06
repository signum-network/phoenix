/**
 * Copyright (c) 2020 Burst Apps Team
 */

import {Logger} from '../logger';

/**
 * This is the type definition for the monitor's fetch function.
 * The fetch function will be called periodically by the monitor. It returns
 * arbitrary data that will be processed by the [[MonitorPredicateFunction]]
 *
 * @module monitor
 */
export type MonitorFetchFunction<T = any> = () => Promise<T>;


/**
 * This is the type definition for the monitor's post-fetch processing function.
 * This predicate function will be called immediately after the monitor fetched
 * data using the [[MonitorFetchFunction]]. This function checks for
 * a certain condition and returns true or false. On `true` the monitor stops fetching
 * and triggers the [[Monitor.onFulfilled]] callback
 *
 * @module monitor
 */
export type MonitorPredicateFunction<T = any> = (fetchData: T) => boolean;

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
    asyncFetcherFn: MonitorFetchFunction<T>;
    /**
     * Once the `asyncFetcher` has fetched the data, the result will be compared
     * herein. Return `true`, if a certain condition is met
     * @note If you intend to serialize, e.g. using [[LocalStorageMonitorRepository]], the monitor
     * you must not use closures, as this might lead to non-deterministic behavior.
     */
    compareFn: MonitorPredicateFunction<T>;
}
