import * as CryptoJS from "crypto-js";

/*
* Decrypt a derived hd private key with a given pin
*/
export const decryptAES = (encryptedBase64: string, key: string): string => {
    let decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
