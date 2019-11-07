/** @module crypto */

import * as CryptoJS from 'crypto-js';

/**
 * Decrypt an encrypted message
 * @param encryptedBase64 encrypted data in base64 format
 * @param key The secret key
 * @return The decrypted content
 */
export const decryptAES = (encryptedBase64: string, key: string): string => {
    const encoded = encryptedBase64;

    // decrypt may throw an error occasionally...retrial may fix this
    let retrials = 0;
    while (retrials < 10) {
        try {
            const decrypted = CryptoJS.AES.decrypt(encoded, key);
            return decrypted && decrypted.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            retrials++;
        }
    }
    return '';
};
