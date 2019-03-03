// tslint:disable:no-bitwise

/** @module crypto */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import {ECKCDSA} from './ec-kcdsa';
import {Converter} from './converter';
import * as CryptoJS from 'crypto-js';
import {EncryptedMessage} from '../typings/encryptedMessage';

/**
 * Decrypts an encrypted Message
 * @param encryptedMessage The encrypted message
 * @param senderPublicKey The senders public key
 * @param recipientPrivateKey The recipients private (agreement) key
 * @return The original message
 */
export function decryptMessage(encryptedMessage: EncryptedMessage, senderPublicKey: string, recipientPrivateKey: string): string {

    const sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(recipientPrivateKey),
            Converter.convertHexStringToByteArray(senderPublicKey)
        );

    const SHARED_KEY_SIZE = sharedKey.length;
    const nonceArray = Converter.convertWordArrayToUint8Array(CryptoJS.enc.Hex.parse(encryptedMessage.nonce));
    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        sharedKey[i] ^= nonceArray[i];
    }

    const aeskey = Converter.convertByteArrayToHexString(sharedKey);
    const tokens = encryptedMessage.data.split(':');
    if (tokens.length !== 2) {
        throw new Error('Invalid message format');
    }
    return CryptoJS.AES.decrypt(
        tokens[1],
        aeskey,
        {iv: Converter.convertBase64ToString(tokens[0])}
    ).toString(CryptoJS.enc.Utf8);
}
