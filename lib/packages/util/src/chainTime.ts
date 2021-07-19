/**
 * Original work Copyright (c) 2020 Burst Apps Team
 * Modfied work Copyright (c) 2021 Signum Network
 */


const GenesisBlockTime = Date.UTC(2014, 7, 11, 2, 0, 0, 0) / 1000;

/**
 * A Value Object to facilitate Chain Timestamp conversions.
 *
 * @module util
 */
export class ChainTime {

    private _chainTimestamp: number;

    private constructor(blockTimestamp: number) {
        this._chainTimestamp = blockTimestamp;
    }

    /**
     * Creates a Block Time object from Chain Time Stamp
     * @param timestamp The timestamp from Chain
     */
    public static fromChainTimestamp(timestamp: number): ChainTime {
        return new ChainTime(timestamp);
    }

    /**
     * Creates a Block Time object from Date
     * @param date Any Date object
     */
    public static fromDate(date: Date): ChainTime {
        const blockTime = new ChainTime(0);
        blockTime.setDate(date);
        return blockTime;
    }

    /**
     * @return Gets Chain Timestamp representation
     */
    getChainTimestamp(): number {
        return this._chainTimestamp;
    }

    /**
     * Sets ChainTime using Chain Timestamp
     */
    setChainTimestamp(blockTimestamp: number): void {
        this._chainTimestamp = blockTimestamp;
    }

    /**
     * @return Time in seconds since 01.01.1970
     */
    getEpoch(): number {
        return (GenesisBlockTime + this._chainTimestamp) * 1000;
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
        this._chainTimestamp = Math.round(date.getTime() / 1000) - GenesisBlockTime;
    }

    /**
     * Checks for equality
     * @param chainTime The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(chainTime: ChainTime): boolean {
        return this._chainTimestamp === chainTime._chainTimestamp;
    }

    /**
     * Checks if a chainTime is before a given one
     * @param chainTime The other value to be compared
     * @return true if _before_ a given chainTime, otherwise false
     */
    public before(chainTime: ChainTime): boolean {
        return this._chainTimestamp < chainTime._chainTimestamp;
    }

    /**
     * Checks if a chainTime is after a given one
     * @param chainTime The other value to be compared
     * @return true if _after_ a given chainTime, otherwise false
     */
    public after(chainTime: ChainTime): boolean {
        return this._chainTimestamp > chainTime._chainTimestamp;
    }

}
