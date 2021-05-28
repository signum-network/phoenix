/**
 * Original work Copyright (c) 2020 Burst Apps Team
 * Modfied work Copyright (c) 2021 Signum Network
 */


const GenesisBlockTime = Date.UTC(2014, 7, 11, 2, 0, 0, 0) / 1000;

/**
 * A Value Object to facilitate Burst Timestamp conversions.
 *
 * @module util
 */
export class BlockTime {

    private _blockTimestamp: number;

    private constructor(blockTimestamp: number) {
        this._blockTimestamp = blockTimestamp;
    }

    /**
     * Creates a Block Time object from Block Time Stamp
     * @param timestamp The timestamp from Block
     */
    public static fromBlockTimestamp(timestamp: number): BlockTime {
        return new BlockTime(timestamp);
    }

    /**
     * Creates a Block Time object from Date
     * @param date Any Date object
     */
    public static fromDate(date: Date): BlockTime {
        const blockTime = new BlockTime(0);
        blockTime.setDate(date);
        return blockTime;
    }

    /**
     * @return Gets Block Timestamp representation
     */
    getBlockTimestamp(): number {
        return this._blockTimestamp;
    }

    /**
     * Sets BlockTime using Bursts Timestamp
     */
    setBlockTimestamp(blockTimestamp: number): void {
        this._blockTimestamp = blockTimestamp;
    }

    /**
     * @return Time in seconds since 01.01.1970
     */
    getEpoch(): number {
        return (GenesisBlockTime + this._blockTimestamp) * 1000;
    }

    /**
     * @return real Date representation
     */
    getDate(): Date {
        return new Date(this.getEpoch());
    }

    /**
     * Sets blockTime using native Date
     * @param date Any Date object
     */
    setDate(date: Date): void {
        this._blockTimestamp = Math.round(date.getTime() / 1000) - GenesisBlockTime;
    }

    /**
     * Checks for equality
     * @param blockTime The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(blockTime: BlockTime): boolean {
        return this._blockTimestamp === blockTime._blockTimestamp;
    }

    /**
     * Checks if a blockTime is before a given one
     * @param blockTime The other value to be compared
     * @return true if _before_ a given blockTime, otherwise false
     */
    public before(blockTime: BlockTime): boolean {
        return this._blockTimestamp < blockTime._blockTimestamp;
    }

    /**
     * Checks if a blockTime is after a given one
     * @param blockTime The other value to be compared
     * @return true if _after_ a given blockTime, otherwise false
     */
    public after(blockTime: BlockTime): boolean {
        return this._blockTimestamp > blockTime._blockTimestamp;
    }

}
