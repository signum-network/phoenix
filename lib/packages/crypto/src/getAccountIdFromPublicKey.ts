/** @module crypto */

import {Converter} from './converter';
import * as CryptoJS from 'crypto-js';
import {Big} from 'big.js';

/**
 * Convert hex string of the public key to the account id
 * @param publicKey The public key
 * @return The numeric account Id
 */
export const getAccountIdFromPublicKey = (publicKey: string): string => {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
    const bytes = Converter.convertWordArrayToByteArray(hash);
    const slice = bytes.slice(0, 8);

    const result = slice.reduce(
        (acc, num, index) => acc.add(Big(num).mul(Big(2).pow(index * 8))),
        Big(0)
    );
    return result.toFixed();
};
