// tslint:disable:no-bitwise
/** @ignore */
/** @module crypto */

// FIXME: This implementation is not compatible with current BRS encryption

import * as CryptoJS from 'crypto-js';
import {ECKCDSA} from './ec-kcdsa';
import {Converter} from './converter';
import {EncryptedMessage} from '../typings/encryptedMessage';

/**
 * Encrypts a message
 * @param message Message to be encrypted
 * @param recipientPublicKey The recipients public key
 * @param senderPrivateKey The senders private (agreement) key
 * @return The encrypted Message
 */
export function encryptMessage(message: string, recipientPublicKey: string, senderPrivateKey: string): EncryptedMessage {

    const sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(senderPrivateKey),
            Converter.convertHexStringToByteArray(recipientPublicKey)
        );

    const SHARED_KEY_SIZE = sharedKey.length;
    const randomBytes = CryptoJS.lib.WordArray.random(SHARED_KEY_SIZE);
    const randomNonce = Converter.convertWordArrayToUint8Array(randomBytes);
    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        sharedKey[i] ^= randomNonce[i];
    }
    const nonceHex = randomBytes.toString();
    const aeskey = Converter.convertByteArrayToHexString(sharedKey);

    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedTextBase64 = CryptoJS.AES.encrypt(message, aeskey, {iv}).toString();

    return {
        // @ts-ignore
        data: `${iv.toString(CryptoJS.enc.Base64)}:${encryptedTextBase64}`,
        nonce: nonceHex,
        isText: true
    };
}
