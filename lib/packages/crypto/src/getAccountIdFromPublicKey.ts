/** @module crypto */

import { Converter } from './converter';
import * as CryptoJS from 'crypto-js';

// TODO: reduce the bignumber stuff even more...just what we need!
import {BigNumber} from './bignumber';


/**
 * Convert hex string of the public key to the account id
 * @param publicKey The public key
 * @return The numeric account Id
 */
export const getAccountIdFromPublicKey = (publicKey: string): string => {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
    const bytes = Converter.convertWordArrayToByteArray(hash);
    const slice = bytes.slice(0, 8).reverse();
    const id = new BigNumber(slice, 256); // base 256 for byte
    return id.toString();
};
