import * as CryptoJS from 'crypto-js';

/**
 * Decrypt an encrypted message
 * @see [[encryptAES]]
 * @param encryptedBase64 encrypted data in base64 format
 * @param key The secret key
 * @return The decrypted content
 * @module crypto
 */
export const decryptAES = (encryptedBase64: string, key: string): string => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    return decrypted && decrypted.toString(CryptoJS.enc.Utf8);
};
