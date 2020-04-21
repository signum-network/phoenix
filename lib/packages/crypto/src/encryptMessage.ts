/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Converter} from './converter';
import {encryptData} from './encryptData';
import {EncryptedMessage} from './typings/encryptedMessage';

/**
 * Encrypts arbitrary message (UTF-8 compatible) for P2P message/data exchange using asymmetric encryption
 * @see [[decryptMessage]]
 * @param plaintext Message to be encrypted
 * @param recipientPublicKeyHex The recipients public key hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Message
 * @module crypto
 */
export function encryptMessage(plaintext: string, recipientPublicKeyHex: string, senderPrivateKeyHex: string): EncryptedMessage {

    const data = new Uint8Array(Converter.convertStringToByteArray(plaintext));
    const encryptedData = encryptData(data, recipientPublicKeyHex, senderPrivateKeyHex);

    return {
        data: Converter.convertByteArrayToHexString(encryptedData.data),
        nonce: Converter.convertByteArrayToHexString(encryptedData.nonce),
        isText: true,
    };
}

