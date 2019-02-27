/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface BlockchainTime {
    /**
     * The current node time (in seconds since the genesis block)
     */
    readonly time: number;
    /**
     * The according Unix timestamp (seconds since 01.01.1970)
     */
    unixTime: number;
}
