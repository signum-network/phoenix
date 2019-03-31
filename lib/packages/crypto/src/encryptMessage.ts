// tslint:disable:no-bitwise
/** @ignore */
/** @module crypto */

import {Converter} from './converter';
import {encryptData} from './encryptData';
import {EncryptedMessage} from '../typings/encryptedMessage';

/**
 * Encrypts a message
 * @param plaintext Message to be encrypted
 * @param recipientPublicKey The recipients public key
 * @param senderPrivateKey The senders private (agreement) key
 * @return The encrypted Message
 */
export function encryptMessage(plaintext: string, recipientPublicKey: string, senderPrivateKey: string): EncryptedMessage {

    const data = new Uint8Array(Converter.convertStringToByteArray(plaintext));
    const encryptedData = encryptData(data, recipientPublicKey, senderPrivateKey);

    return {
        data: Converter.convertByteArrayToHexString(encryptedData.data),
        nonce: Converter.convertByteArrayToHexString(encryptedData.nonce),
        isText: true,
    };
}

