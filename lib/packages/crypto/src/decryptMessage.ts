/** @module crypto */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Converter} from './converter';
import {decryptData} from './decryptData';
import {EncryptedMessage} from '../typings/encryptedMessage';

/**
 * Decrypts an encrypted Message
 * @param encryptedMessage The encrypted message
 * @param senderPublicKeyHex The senders public key in hex format
 * @param recipientPrivateKeyHex The recipients private (agreement) key in hex format
 * @return The original message
 */
export function decryptMessage(
    encryptedMessage: EncryptedMessage,
    senderPublicKeyHex: string,
    recipientPrivateKeyHex: string): string {

    if(!encryptedMessage.isText){
        throw new Error('Encrypted message is marked as non-text. Use decryptData instead');
    }

    const encryptedData = {
        data: new Uint8Array(Converter.convertHexStringToByteArray(encryptedMessage.data)),
        nonce: new Uint8Array(Converter.convertHexStringToByteArray(encryptedMessage.nonce))
    };

    const decryptedBytes = decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex);
    return Converter.convertByteArrayToString(decryptedBytes, 0, decryptedBytes.length);
}
