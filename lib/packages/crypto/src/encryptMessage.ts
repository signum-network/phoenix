/** @module crypto */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Converter} from './converter';
import {encryptData} from './encryptData';
import {EncryptedMessage} from './typings/encryptedMessage';

/**
 * Encrypts a message (UTF-8 compatible)
 * @param plaintext Message to be encrypted
 * @param recipientPublicKeyHex The recipients public key hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Message
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

