/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Keys interface
 *
 * The Keys class is used to encompass keys associated to an account.
 *
 * @module crypto
 */
export interface Keys {
    /**
     * The private key used for P2P message encryption
     */
    agreementPrivateKey: string;
    /**
     * The public key
     */
    publicKey: string;
    /**
     * The private key used for transaction signing
     */
    signPrivateKey: string;
}
