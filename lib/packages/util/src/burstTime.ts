/** @module util */

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */


import {GenesisBlockTime} from './internal';

/**
 * A Value Object to facilitate Burst Timestamp conversions.
 */
export class BurstTime {

    private _burstTimestamp: number;

    private constructor(burstTimestamp: number) {
        this._burstTimestamp = burstTimestamp;
    }

    /**
     * Creates a Burst Time object from Burst Block Time Stamp
     * @param burstTimestamp The timestamp from Block/Tras
     */
    public static fromBurstTimestamp(burstTimestamp: number): BurstTime {
        return new BurstTime(burstTimestamp);
    }

    /**
     * Creates a Burst Time object from Date
     * @param date Any Date object
     */
    public static fromDate(date: Date): BurstTime {
        const burstTime = new BurstTime(0);
        burstTime.setDate(date);
        return burstTime;
    }

    /**
     * @return Gets Burst Timestamp representation
     */
    getBurstTimestamp(): number {
        return this._burstTimestamp;
    }

    /**
     * @return Gets Burst Timestamp representation
     */
    setBurstTimestamp(burstTimestamp: number): void {
        this._burstTimestamp = burstTimestamp;
    }

    /**
     * @return real Date representation
     */
    getDate(): Date {
        const epochTimestamp = (GenesisBlockTime + this._burstTimestamp) * 1000;
        return new Date(epochTimestamp);
    }

    /**
     * Sets BurstTime using native Date
     * @param date Any Date object
     */
    setDate(date: Date) {
        this._burstTimestamp = Math.round(date.getTime() / 1000) - GenesisBlockTime;
    }

    /**
     * Checks for equality
     * @param burstTime The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(burstTime: BurstTime): boolean {
        return this._burstTimestamp === burstTime._burstTimestamp;
    }

    /**
     * Checks if a BurstTime is before a given one
     * @param burstTime The other value to be compared
     * @return true if _before_ a given BurstTime, otherwise false
     */
    public before(burstTime: BurstTime): boolean {
        return this._burstTimestamp < burstTime._burstTimestamp;
    }

    /**
     * Checks if a BurstTime is after a given one
     * @param burstTime The other value to be compared
     * @return true if _after_ a given BurstTime, otherwise false
     */
    public after(burstTime: BurstTime): boolean {
        return this._burstTimestamp > burstTime._burstTimestamp;
    }

}
