/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * The interface for encrypted message
 * @see [[encryptMessage]]
 * @module crypto
 */
export interface EncryptedMessage {
    data: string;
    nonce: string;
    isText: boolean;
}
