/** @module util */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import Big from 'big.js';

// Big.NE = -9;

enum BurstValueFormat {
    PLANCK,
    BURST,
}

/**
 * A Value Object to facilitate BURST and Planck conversions/calculations.
 *
 * Note: This class uses a big number representation (ES5 compatible) under the hood, so
 * number limits and numeric calculations are much more precise than JS number type
 */
export class BurstValue {

    private _planck: Big;

    private constructor(planck: string = '0') {
        this._planck = Big(planck);
    }

    /**
     * Creates a Burst Value object from Planck
     * @param planck The value in Planck
     */
    public static fromPlanck(planck: string) {
        return new BurstValue(planck);
    }

    /**
     * Creates a Burst Value object from BURST
     * @param burst The value in BURST
     */
    public static fromBurst(burst: number|string) {
        const b = new BurstValue();
        b.burst = typeof burst === 'number' ? burst.toString(10) : burst;
        return b;
    }

    /**
     * Leaky value getter
     * @return the underlying value in its big number representation (immutable)
     */
    get raw(): Big {
        return Big(this._planck);
    }

    /**
     * @return Gets Planck representation
     */
    get planck(): string {
        return this._planck.toString();
    }

    /**
     * @param p Sets value as Planck, i.e. overwrites current hold value
     */
    set planck(p: string) {
        this._planck = Big(p);
    }

    /**
     * @return Gets BURST representation
     */
    get burst(): string {
        return Big(this._planck).div(1E8).toString();
    }

    /**
     * @param b Sets value as BURST, i.e. overwrites current hold value
     */
    set burst(b: string) {
        this._planck = Big(b).mul(1E8);
    }

    /**
     * Checks for equality
     * @param burstValue The other value to be compared
     * @return true if equal, otherwise false
     */
    public equals(burstValue: BurstValue): boolean {
        return this._planck.eq(burstValue._planck);
    }

    /**
     * Checks for lesser or equality
     * @param burstValue The other value to be compared
     * @return true if less or equal, otherwise false
     */
    public lessOrEqual(burstValue: BurstValue): boolean {
        return this._planck.lte(burstValue._planck);
    }

    /**
     * Checks for lesser value
     * @param burstValue The other value to be compared
     * @return true if equal, otherwise false
     */
    public less(burstValue: BurstValue): boolean {
        return this._planck.lt(burstValue._planck);
    }

    /**
     * Checks for greater or equality value
     * @param burstValue The other value to be compared
     * @return true if greater or equal, otherwise false
     */
    public greaterOrEqual(burstValue: BurstValue): boolean {
        return this._planck.gte(burstValue._planck);
    }

    /**
     * Checks for greater value
     * @param burstValue The other value to be compared
     * @return true if greater, otherwise false
     */
    public greater(burstValue: BurstValue): boolean {
        return this._planck.gt(burstValue._planck);
    }

    /**
     * Adds two values
     * @param burstValue The other value to be added
     * @return the mutated BurstValue object;
     */
    public add(burstValue: BurstValue): BurstValue {
        this._planck.plus(burstValue._planck);
        return this;
    }

    /**
     * Substracts from value
     * @param burstValue The other value to be substracted
     * @return the mutated BurstValue object;
     */
    public substract(burstValue: BurstValue): BurstValue {
        this._planck.minus(burstValue._planck);
        return this;
    }

    /**
     * Multiplies with value
     * @param burstValue The other value to be multiplied with
     * @return the mutated BurstValue object;
     */
    public multiply(burstValue: BurstValue): BurstValue {
        this._planck.mul(burstValue._planck);
        return this;
    }

    /**
     * Divides by value
     * @param burstValue The other value to be divided by
     * @return the mutated BurstValue object;
     */
    public divide(burstValue: BurstValue): BurstValue {
        this._planck.div(burstValue._planck);
        return this;
    }

    /**
     * Gets a string representation in form `100 BURST` or `10000000000 Planck`
     * @param format The format
     * @return The converted string accordingly the param in burst or Planck
     */
    public toString(format: BurstValueFormat = BurstValueFormat.BURST): string {
        return format === BurstValueFormat.BURST ? `${this.burst} BURST` : `${this._planck} Planck`;
    }
}
