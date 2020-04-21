/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * BurstTime Interface
 * @see [[util.BurstTime]] to convert the Burst Timestamp to Date
 * @module core
 * */
export interface BurstTime {
    /**
     * The burst time (in seconds since the genesis block)
     */
    readonly time: number;
}
