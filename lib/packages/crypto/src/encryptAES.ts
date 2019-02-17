/** @module crypto */

import * as CryptoJS from 'crypto-js';

/*
* Encrypt a derived hd private key with a given pin and return it in Base64 form
*/
export const encryptAES = (text: string, key: string): string => {
    return CryptoJS.AES.encrypt(text, key).toString();
};
