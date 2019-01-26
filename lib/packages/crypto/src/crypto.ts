/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { Converter } from "./converter";
import { ECKCDSA } from "./ec-kcdsa";
import { decryptAES } from "./decryptAES";
import * as CryptoJS from "crypto-js";

/*
* Crypto class
*
* The Crypto class takes care of everything cryptography related.
*/ 
export class Crypto {
    /*
    * Generate signature for transaction
    * s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
    *          sha256(sha256(transactionHex)_privateKey),
    *          privateKey)
    * p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
    */
    public generateSignature(transactionHex: string, encryptedPrivateKey: string, pinHash: string): string {
        const privateKey = decryptAES(encryptedPrivateKey, pinHash)
        let s = Converter.convertHexStringToByteArray(privateKey);
        let m = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(transactionHex)));
        let m_s = m.concat(s);
        let x = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_s)));
        let y = ECKCDSA.keygen(x).p;
        let m_y = m.concat(y);
        let h = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_y)));
        let v = ECKCDSA.sign(h, x, s);
        return Converter.convertByteArrayToHexString([].concat(v, h));
    }

    /*
    * Concat signature with transactionHex
    */
    public generateSignedTransactionBytes(unsignedTransactionHex: string, signature: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // TODO: verification - duplicate?
            resolve(unsignedTransactionHex.substr(0, 192) + signature + unsignedTransactionHex.substr(320))
        });
    }
}
