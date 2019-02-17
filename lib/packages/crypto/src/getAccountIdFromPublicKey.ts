/** @module crypto */

import { Converter } from './converter';
import * as CryptoJS from 'crypto-js';
import * as BN from 'bn.js';

/**
 * Convert hex string of the public key to the account id
 * @param publicKey The public key
 * @return The numeric account Id
 */
export const getAccountIdFromPublicKey = (publicKey: string): string => {
    // hash with SHA 256
    const hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
    const bytes = Converter.convertWordArrayToByteArray(hash);
    let slice = bytes.slice(0, 8);
    slice = slice.reverse();
    const numbers = slice.map((byte: Number) => byte.toString(10));
    const id = new BN(numbers, 256); // base 256 for byte
    return id.toString();
};
