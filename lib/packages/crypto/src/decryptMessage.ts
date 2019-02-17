import { decryptAES } from "./decryptAES";
import { ECKCDSA } from "./ec-kcdsa";
import { Converter } from "./converter";
import * as CryptoJS from "crypto-js";

/*
* Decrypt a message attached to transaction
*/
export const decryptMessage = (encryptedMessage: string, nonce: string, encryptedPrivateKey: string, pinHash: string, senderPublicKey: string): string => {
    const privateKey = decryptAES(encryptedPrivateKey, pinHash);
    // generate shared key
    let sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(privateKey),
            Converter.convertHexStringToByteArray(senderPublicKey)
        );
    // convert nonce to uint8array
    let nonce_array = Converter.convertWordArrayToUint8Array(CryptoJS.enc.Hex.parse(nonce));
    // combine
    for (let i = 0; i < 32; i++) {
        sharedKey[i] ^= nonce_array[i];
    }
    // hash shared key
    let key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey))
    // convert message hex back to base 64 due to limitation of node
    let messageB64 = CryptoJS.enc.Hex.parse(encryptedMessage).toString(CryptoJS.enc.Base64);
    // decrypt it
    let message = CryptoJS.AES.decrypt(messageB64, key.toString()).toString(CryptoJS.enc.Utf8);
    // return decrypted message
    return message;
}