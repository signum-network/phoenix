/** @module crypto */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as CryptoJS from 'crypto-js';
import {inflate} from 'pako/lib/inflate';
import {ECKCDSA} from './ec-kcdsa';
import {Converter} from './converter';
import {EncryptedData} from './typings/encryptedData';

const IV_LENGTH = 16;
const SHARED_KEY_SIZE = 32;

function decrypt(ivCiphertext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]): Uint8Array {

    if (ivCiphertext.length < IV_LENGTH ||
        ivCiphertext.length % IV_LENGTH !== 0) {
        throw new Error('Invalid Ciphertext');
    }

    const sharedKey = sharedKeyOrig.slice(0);

    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        // tslint:disable:no-bitwise
        sharedKey[i] ^= nonce[i];
    }

    const key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey));
    const iv = Converter.convertByteArrayToWordArray(ivCiphertext.slice(0, IV_LENGTH));
    const ciphertext = Converter.convertByteArrayToWordArray(ivCiphertext.slice(IV_LENGTH));

    // @ts-ignore
    const encrypted = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
        iv: iv,
        key: key
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv});

    return Converter.convertWordArrayToUint8Array(decrypted);
}

/**
 * Decrypts an encrypted cipher text
 * @param encryptedData The encrypted data
 * @param senderPublicKeyHex The senders public key in hex format
 * @param recipientPrivateKeyHex The recipients private (agreement) key in hex format
 * @return The original plain text
 */
export function decryptData(
    encryptedData: EncryptedData,
    senderPublicKeyHex: string,
    recipientPrivateKeyHex: string): Uint8Array {

    const sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(recipientPrivateKeyHex),
            Converter.convertHexStringToByteArray(senderPublicKeyHex)
        );

    const compressedPlaintext = decrypt(encryptedData.data, encryptedData.nonce, sharedKey);
    return inflate(compressedPlaintext);
}
