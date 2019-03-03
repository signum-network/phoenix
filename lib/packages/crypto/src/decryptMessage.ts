/* tslint:disable */
/** @module crypto */

import {ECKCDSA} from "./ec-kcdsa";
import {Converter} from "./converter";
import * as CryptoJS from "crypto-js";
import {EncryptedMessage} from "../typings/encryptedMessage";
//
// /**
//  * Decrypt a message attached to transaction
//  * FIXME: Fix en/decryption!
//  */
// export const decryptMessage = (
//     encryptedMessage: string,
//     nonce: string,
//     encryptedPrivateKey: string,
//     pinHash: string,
//     senderPublicKey: string
// ): string => {
//     const privateKey = decryptAES(encryptedPrivateKey, pinHash);
//     // generate shared key
//     let sharedKey =
//         ECKCDSA.sharedkey(
//             Converter.convertHexStringToByteArray(privateKey),
//             Converter.convertHexStringToByteArray(senderPublicKey)
//         );
//     // convert nonce to uint8array
//     let nonce_array = Converter.convertWordArrayToUint8Array(CryptoJS.enc.Hex.parse(nonce));
//     // combine
//     for (let i = 0; i < 32; i++) {
//         sharedKey[i] ^= nonce_array[i];
//     }
//     // hash shared key
//     let key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey))
//     // convert message hex back to base 64 due to limitation of node
//     let messageB64 = CryptoJS.enc.Hex.parse(encryptedMessage).toString(CryptoJS.enc.Base64);
//     // decrypt it
//     let message = CryptoJS.AES.decrypt(messageB64, key.toString()).toString(CryptoJS.enc.Utf8);
//     // return decrypted message
//     return message;
// }


export function decryptMessage(encryptedMessage: EncryptedMessage, senderPublicKey: string, recipientPrivateKeyEncrypted: string, recipientPinHash: string): string {


    const recipientPrivateKey = CryptoJS.AES.decrypt(recipientPrivateKeyEncrypted, recipientPinHash).toString(CryptoJS.enc.Utf8);
    let sharedKey =
        ECKCDSA.sharedkey(
            Converter.convertHexStringToByteArray(recipientPrivateKey),
            Converter.convertHexStringToByteArray(senderPublicKey)
        );

    // Randomize shared key
    const SHARED_KEY_SIZE = sharedKey.length;
    let nonceArray = Converter.convertWordArrayToUint8Array(CryptoJS.enc.Hex.parse(encryptedMessage.nonce));
    for (let i = 0; i < SHARED_KEY_SIZE; i++) {
        sharedKey[i] ^= nonceArray[i];
    }

    const aeskey = Converter.convertByteArrayToHexString(sharedKey);
    const tokens = encryptedMessage.data.split(':');
    if (tokens.length !== 2) {
        throw new Error('Invalid message format');
    }
    const iv = tokens[0];
    return CryptoJS.AES.decrypt(
        tokens[1],
        aeskey,
        {iv: new Buffer(iv).toString('base64')}
    ).toString(CryptoJS.enc.Utf8)
}
