import * as CryptoJS from "crypto-js";

/*
* Decrypt a derived hd private key with a given pin
*/
export const decryptAES = (encryptedBase64: string, key: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        let decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
        resolve(decrypted.toString(CryptoJS.enc.Utf8));
    });
}
