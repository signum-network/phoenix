/** @module crypto */

import * as CryptoJS from 'crypto-js';

/**
 * Decrypt an encrypted message
 * @param encryptedBase64 encryprts data in base64 format
 * @param key The secret key
 * @return The decrypted content
 */
export const decryptAES = (encryptedBase64: string, key: string): string => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
};
