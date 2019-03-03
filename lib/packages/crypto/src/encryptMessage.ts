/* tslint:disable */
/** @module crypto */
// TODO: remove ignore whene fixed
/** @ignore */

import {decryptAES} from "./decryptAES";
import * as CryptoJS from "crypto-js";
import {ECKCDSA} from "./ec-kcdsa";
import {Converter} from "./converter";
import {EncryptedMessage} from "../typings/encryptedMessage";

/*
* Encrypt a message attached to a transaction
* FIXME: Fix en/decryption!
*/
// export const encryptMessage = (message: string, encryptedPrivateKey: string, pinHash: string, recipientPublicKey: string): string => {
//     const privateKey = decryptAES(encryptedPrivateKey, pinHash);
//     // generate shared key
//     let sharedKey =
//         ECKCDSA.sharedkey(
//             Converter.convertHexStringToByteArray(privateKey),
//             Converter.convertHexStringToByteArray(recipientPublicKey)
//         );
//
//
//     // Create random nonce
//     let random_bytes = CryptoJS.lib.WordArray.random(32);
//     let r_nonce = Converter.convertWordArrayToUint8Array(random_bytes);
//     // combine
//     for (let i = 0; i < 32; i++) {
//         sharedKey[i] ^= r_nonce[i];
//     }
//     // hash shared key
//     let key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey));
//     // ENCRYPT
//     let iv = CryptoJS.lib.WordArray.random(16);
//     let messageB64 = CryptoJS.AES.encrypt(message, key.toString(), {iv: iv}).toString();
//
//     const encryptedMessage = new EncryptedMessage();
// // @ts-ignore
//     encryptedMessage.data = `${iv.toString(CryptoJS.enc.Base64)}:${encryptedTextBase64}`;
//     encryptedMessage.nonce = nonceHex;
//     encryptedMessage.isText = true;
//
//     return encryptedMessage;
//     // convert base 64 to hex due to node limitation
//     // todo: ohagers fix
//     // let messageHex = iv.toString(CryptoJS.enc.Hex) + CryptoJS.enc.Base64.parse(messageB64).toString(CryptoJS.enc.Hex);
//     // Uint 8 to hex
//     // let nonce = random_bytes.toString(CryptoJS.enc.Hex);
//     // return encrypted pair
//     // resolve({ m: messageHex, n: nonce })
//     return "ohagers fix needed here";
// };


export function encryptMessage(text: string, recipientPublicKey: string, senderPrivateKey: string): EncryptedMessage {

    const sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(senderPrivateKey),
            Converter.convertHexStringToByteArray(recipientPublicKey)
        );

// Randomize shared key
    const SHARED_KEY_SIZE = sharedKey.length;
    const randomBytes = CryptoJS.lib.WordArray.random(SHARED_KEY_SIZE);
    const randomNonce = Converter.convertWordArrayToUint8Array(randomBytes);
    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        sharedKey[i] ^= randomNonce[i];
    }
    const nonceHex = randomBytes.toString();
    const aeskey = Converter.convertByteArrayToHexString(sharedKey);

    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedTextBase64 = CryptoJS.AES.encrypt(text, aeskey, {iv}).toString();

    return {
        // @ts-ignore
        data: `${iv.toString(CryptoJS.enc.Base64)}:${encryptedTextBase64}`,
        nonce: nonceHex,
        isText: true
    }
}
