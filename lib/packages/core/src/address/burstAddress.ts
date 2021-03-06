/**
 * Original work Copyright (c) 2021 Burst Apps Team
 */
import {getAccountIdFromPublicKey} from '@burstjs/crypto';


/**
 * A Value Object to facilitate Address conversions.
 *
 * @module core
 */
export class BurstAddress {

    private readonly _publicKey: string;

    private constructor(publicKey: string) {
        this._publicKey = publicKey;
    }

    /**
     * Creates a Burst Address object from public key
     * @param publicKey The public key of that address (in hex format)
     */
    public static fromPublicKey(publicKey: string): BurstAddress {
        return new BurstAddress(publicKey);
    }

    /**
     * Creates a Burst Address object from public key
     * @param extendedRSAddress The Reed-Solomon address in extended format (with base36 suffix)
     */
    public static fromExtendedRSAddress(extendedRSAddress: string): BurstAddress {
        // FIXME
        return new BurstAddress('');
    }

    getPublicKey(): string {
        return this._publicKey;
    }

    /**
     * @return Gets numeric Account Id
     */
    getAccountId(): string {
        return getAccountIdFromPublicKey(this._publicKey);
    }

    /**
     * Gets as Reed Solomon representation
     * @param asExtended If `true`, the RS address will be in extended format,
     * carrying the public key as suffix in base36 encoding
     * @return Reed Solomon Address Format
     * @see [[]]
     */
    getReedSolomonAddress(asExtended: boolean = false): string {
        return '';
    }

    /**
     * Checks for equality
     * @param address The other address to be compared
     * @return true if equal, otherwise false
     */
    public equals(address: BurstAddress): boolean {
        return this._publicKey === address._publicKey;
    }

    // public isValid()

}
