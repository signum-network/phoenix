/**
 * Original work Copyright (c) 2021 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */
import {getAccountIdFromPublicKey} from '@burstjs/crypto';
import {
    convertNumericIdToAddress,
    convertBase36StringToHexString,
    convertHexStringToBase36String,
    isBurstAddress,
    convertAddressToNumericId,
} from '@burstjs/util';
import {ensureReedSolomonAddress} from './ensureReedSolomonAddress';
import {tokenizeReedSolomonAddress} from './tokenizeReedSolomonAddress';
import {convertReedSolomonAddressToNumericId} from './convertReedSolomonAddressToNumericId';

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

    private _publicKey: string;
    private _accountId: string;
    private _rs: string;

    private constructor(args: { publicKey?: string, address?: string }) {
        if (args.publicKey) {
            this.constructFromPublicKey(args.publicKey);
        } else if (args.address) {
            this.constructFromAddress(args.address);
        } else {
            throw new Error('Invalid arguments');
        }
    }

    /**
     * Creates an Account Address object from public key
     * @param publicKey The public key of that address (in hex format)
     */
    public static fromPublicKey(publicKey: string): Address {
        return new Address({publicKey: publicKey.toUpperCase()});
    }

    /**
     * Creates an Account Address object from extended Reed-Solomon address
     * @param address The Reed-Solomon address in extended format (with base36 suffix)
     * @throws Error if the passed address is invalid, i.e. not extended format , or extension aka base36 encoded public key does not match address
     */
    public static fromReedSolomonAddress(address: string): Address {

        ensureReedSolomonAddress(address);

        const {extension} = tokenizeReedSolomonAddress(address);

        if (extension) {
            const publicKey = convertBase36StringToHexString(extension);

            if (convertReedSolomonAddressToNumericId(address) !== getAccountIdFromPublicKey(publicKey)) {
                throw Error('Address and Public Key do not match');
            }
            return new Address({publicKey});
        }

        return new Address({address});
    }

    /**
     * @return Gets public key
     */
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
        return this._accountId === address._accountId;
    }

    private constructFromPublicKey(publicKey: string): void {
        assertValidPublicKey(publicKey);
        this._publicKey = publicKey;
        this._accountId = getAccountIdFromPublicKey(publicKey);
        this._rs = convertNumericIdToAddress(this._accountId);
    }

    private constructFromAddress(address: string): void {
        this._publicKey = '';
        this._rs = address;
        this._accountId = convertAddressToNumericId(address);
    }

}
