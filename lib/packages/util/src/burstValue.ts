/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import BigNumber from 'bignumber.js';
import {BurstPlanckSymbol, BurstSymbol} from './constants';

BigNumber.config({
    EXPONENTIAL_AT: [-9, 20]
});

/**
 * Enum to determine the representation format of [BurstValue] string
 * @module util
 */
export enum BurstValueFormat {
    PLANCK,
    BURST,
}

function assureValidValue(b: string): void {
    if (!(b && /^-?\d*(\.\d+)?$/.test(b))) {
        throw new Error(`Invalid value: ${b}`);
    }
}

/**
 * A Value Object to facilitate BURST and Planck conversions/calculations.
 *
 * Note: This class uses a big number representation (ES5 compatible) under the hood, so
 * number limits and numeric calculations are much more precise than JS number type
 *
 * @module util
 */
export class BurstValue {

    private _planck: BigNumber;

    private constructor(planck: number | string) {
        if (typeof planck === 'string') {
            assureValidValue(planck);
        }
        this._planck = new BigNumber(planck);
    }

    public static Zero(): BurstValue {
        return new BurstValue('0');
    }

    /**
     * Creates a Burst Value object from Planck
     * @param planck The value in Planck
     */
    public static fromPlanck(planck: number | string): BurstValue {
        return new BurstValue(planck);
    }

    /**
     * Creates a Burst Value object from BURST
     * @param burst The value in BURST
     */
    public static fromBurst(burst: number | string): BurstValue {
        const b = new BurstValue('0');
        b.setBurst(typeof burst === 'number' ? burst.toString(10) : burst);
        return b;
    }

    /**
     * Leaky value getter
     * @return the underlying value in its big number representation (immutable)
     */
    getRaw(): BigNumber {
        return this._planck;
    }

    /**
     * @return Gets Planck representation
     */
    getPlanck(): string {
        return this._planck.toString();
    }

    /**
     * Sets value as Planck, i.e. overwrites current hold value
     * @param p The planck value
     */
    setPlanck(p: string): void {
        assureValidValue(p);
        this._planck = new BigNumber(p);
    }

    /**
     * Gets BURST representation
     * @return value in BURST
     */
    getBurst(): string {
        return this._planck.dividedBy(1E8).toString();
    }

    /**
     * Sets value as BURST, i.e. overwrites current hold value
     * @param b value in BURST
     */
    setBurst(b: string): void {
        assureValidValue(b);
        this._planck = new BigNumber(b).multipliedBy(1E8);
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
     * @return true if less, otherwise false
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
     * @return the _mutated_ BurstValue object
     */
    public add(burstValue: BurstValue): BurstValue {
        this._planck = this._planck.plus(burstValue._planck);
        return this;
    }

    /**
     * Subtracts from value
     * @param burstValue The other value to be subtracted
     * @return the _mutated_ BurstValue object
     */
    public subtract(burstValue: BurstValue): BurstValue {
        this._planck = this._planck.minus(burstValue._planck);
        return this;
    }

    /**
     * Multiplies with a _numeric_ value (not BurstValue)
     * @param value A numeric value to be multiplied with
     * @return the _mutated_ BurstValue object
     */
    public multiply(value: number): BurstValue {
        this._planck = this._planck.multipliedBy(value);
        return this;
    }

    /**
     * Divides by a _numeric_ value (not BurstValue)
     * @param value A numeric value to be divided by
     * @return the _mutated_ BurstValue object
     */
    public divide(value: number): BurstValue {
        if (value === 0) {
            throw new Error('Division by zero');
        }
        this._planck = this._planck.div(value);
        return this;
    }

    /**
     * Gets a string representation in form `Ƀ 100` for BURST or `ƀ 10000000000` for Planck
     * @param format The format
     * @return The converted string accordingly the param in burst or Planck
     */
    public toString(format: BurstValueFormat = BurstValueFormat.BURST): string {
        return format === BurstValueFormat.BURST ? `${BurstSymbol} ${this.getBurst()}` : `${BurstPlanckSymbol} ${this._planck}`;
    }

    /**
     * Clones/Copies the current BurstValue to a new object
     * @return new BurstValue instance
     */
    public clone(): BurstValue {
        return BurstValue.fromPlanck(this.getPlanck());
    }
}
