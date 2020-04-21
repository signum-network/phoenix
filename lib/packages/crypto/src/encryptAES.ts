import * as CryptoJS from 'crypto-js';

/**
 * Symmetrically encrypts a text using an arbitrary key
 * @see [[decryptAES]]
 * @param text The message/text to be encrypted
 * @param key The key used
 * @return The encrypted message as Base64 string
 * @module crypto
 */
export const encryptAES = (text: string, key: string): string => {
    return CryptoJS.AES.encrypt(text, key).toString();
};
