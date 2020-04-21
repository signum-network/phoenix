import * as CryptoJS from 'crypto-js';

/**
 * Hash string into hex string
 * @param input An arbitrary text
 * @return the hash for that string in hex format
 * @module crypto
 */
export const hashSHA256 = (input: string): string => {
    return CryptoJS.SHA256(input).toString();
};
