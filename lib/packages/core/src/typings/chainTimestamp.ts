/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * ChainTime Interface
 * @see [[util.ChainTime]] to convert between chains timestamp and Date
 * @module core
 * */
export interface ChainTimestamp {
    /**
     * The chains time (in seconds since the genesis block)
     */
    readonly time: number;
}
