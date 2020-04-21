/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as CryptoJS from 'crypto-js';
import {gzip} from 'pako/lib/deflate';
import {ECKCDSA} from './ec-kcdsa';
import {Converter} from './converter';
import {EncryptedData} from './typings/encryptedData';

const IV_LENGTH = 16;
const SHARED_KEY_SIZE = 32;

function encrypt(plaintext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {

    const sharedKey = sharedKeyOrig.slice(0);

    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        // tslint:disable:no-bitwise
        sharedKey[i] ^= nonce[i];
    }

    const key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey));
    const data = Converter.convertByteArrayToWordArray(plaintext);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: CryptoJS.lib.WordArray.random(IV_LENGTH)
    });

    const ivOut = Converter.convertWordArrayToByteArray(encrypted.iv);
    const ciphertextOut = Converter.convertWordArrayToByteArray(encrypted.ciphertext);

    return ivOut.concat(ciphertextOut);
}


/**
 * Encrypts arbitrary data for P2P message/data exchange using asymmetric encryption
 *
 * @see [[decryptData]]
 * @param plaintext Data to be encrypted
 * @param recipientPublicKeyHex The recipients public key in hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Data
 * @module crypto
 */
export function encryptData(
    plaintext: Uint8Array,
    recipientPublicKeyHex: string,
    senderPrivateKeyHex: string): EncryptedData {

    const sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(senderPrivateKeyHex),
            Converter.convertHexStringToByteArray(recipientPublicKeyHex)
        );

    const compressedData = gzip(plaintext);
    const randomBytes = CryptoJS.lib.WordArray.random(SHARED_KEY_SIZE);
    const nonce = Converter.convertWordArrayToUint8Array(randomBytes);
    const data = Uint8Array.from(encrypt(compressedData, nonce, sharedKey));

    return {
        nonce,
        data
    };
}
