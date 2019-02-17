/** @module crypto */

import * as CryptoJS from 'crypto-js';

/*
* Hash string into hex string
*/
export const hashSHA256 = (input: string): string => {
    return CryptoJS.SHA256(input).toString();
};
