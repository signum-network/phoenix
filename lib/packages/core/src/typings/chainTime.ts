/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * ChainTime Interface
 * @see [[util.BlockTime]] to convert between chains timestamp and Date
 * @module core
 * */
export interface ChainTime {
    /**
     * The burst time (in seconds since the genesis block)
     */
    readonly time: number;
}
