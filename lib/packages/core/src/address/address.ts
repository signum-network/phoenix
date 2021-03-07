/**
 * Original work Copyright (c) 2021 Burst Apps Team
 */
import {getAccountIdFromPublicKey} from '@burstjs/crypto';
import {
    convertNumericIdToAddress,
    convertBase36StringToHexString,
    convertHexStringToBase36String, isBurstAddress, convertAddressToNumericId,
} from '@burstjs/util';

function assertValidPublicKey(publicKey: string): void {
    if (!(publicKey && /^[a-fA-F0-9]{64}/.test(publicKey))) {
        throw new Error('Invalid Public Key Format');
    }
}

/**
 * A Value Object to facilitate Address conversions.
 *
 * @module core
 */
export class Address {

    private readonly _publicKey: string;
    private readonly _accountId: string;
    private readonly _rs: string;

    private constructor(publicKey: string) {
        assertValidPublicKey(publicKey);
        this._publicKey = publicKey;
        this._accountId = getAccountIdFromPublicKey(publicKey);
        this._rs = convertNumericIdToAddress(this._accountId);
    }

    /**
     * Creates a Burst Address object from public key
     * @param publicKey The public key of that address (in hex format)
     */
    public static fromPublicKey(publicKey: string): Address {
        return new Address(publicKey.toUpperCase());
    }

    /**
     * Creates a Burst Address object from public key
     * @param extendedRSAddress The Reed-Solomon address in extended format (with base36 suffix)
     * @throws Error if the passed address is invalid, i.e. not extended format , or extension aka base36 encoded public key does not match address
     */
    public static fromExtendedRSAddress(extendedRSAddress: string): Address {

        if (!isBurstAddress(extendedRSAddress)) {
            throw new Error('Not a valid RS address');
        }

        const index = extendedRSAddress.lastIndexOf('-');
        const extension = extendedRSAddress.substr(index + 1);
        const hasExtension = extension.length > 5;
        if (!hasExtension) {
            throw Error('Address is not an extended address');
        }
        const rsAddress = extendedRSAddress.substr(0, index );
        const publicKey = convertBase36StringToHexString(extension);

        if (convertAddressToNumericId(rsAddress) !== getAccountIdFromPublicKey(publicKey)) {
            throw Error('Address and Public Key do not match');
        }

        return Address.fromPublicKey(publicKey);
    }

    getPublicKey(): string {
        return this._publicKey;
    }

    /**
     * @return Gets numeric Account Id
     */
    getAccountId(): string {
        return this._accountId;
    }

    /**
     * Gets as Reed Solomon representation
     * @return Reed Solomon Address Format
     * @see [[Address.getReedSolomonAddressExtended]]
     */
    getReedSolomonAddress(): string {
        return this._rs;
    }

    /**
     * Gets as extended Reed Solomon representation carrying the public key as suffix in base36 encoding
     * @return Extended Reed Solomon Address Format
     * @see [[Address.getReedSolomonAddress]]
     */
    getReedSolomonAddressExtended(): string {
        return `${this._rs}-${convertHexStringToBase36String(this._publicKey)}`.toUpperCase();
    }


    /**
     * Checks for equality
     * @param address The other address to be compared
     * @return true if equal, otherwise false
     */
    public equals(address: Address): boolean {
        return this._publicKey === address._publicKey;
    }
}
