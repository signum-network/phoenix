import * as CryptoJS from "crypto-js";

/*
* Encrypt a derived hd private key with a given pin and return it in Base64 form
*/
export const encryptAES = (text: string, key: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        let encrypted = CryptoJS.AES.encrypt(text, key);
        resolve(encrypted.toString()); // Base 64
    });
}