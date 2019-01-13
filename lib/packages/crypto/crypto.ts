/*
* Copyright 2018 PoC-Consortium
*/

import { Converter } from "./converter";
import { PassPhraseGenerator } from "./passPhraseGenerator";
import { ECKCDSA } from "./ec-kcdsa";
import { Keys } from "../../model";
import { BurstUtil } from "./burst";

let CryptoJS = require("crypto-js");
let BN = require('bn.js');
let pako = require('pako');

/*
* Crypto class
*
* The Crypto class takes care of everything cryptography related.
*/
export class Crypto {
    private passPhraseGenerator: PassPhraseGenerator;

    constructor() {
        this.passPhraseGenerator = new PassPhraseGenerator();
    }

    /*
    * Generate a passphrase with the help of the PassPhraseGenerator
    * pass optional seed for seeding generation
    */
    public generatePassPhrase(seed: any[] = []): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.passPhraseGenerator.reSeed(seed);
            resolve(this.passPhraseGenerator.generatePassPhrase());
        });
    }

    /*
    * Generate the Master Public Key and Master Private Key for a new passphrase
    * EC-KCDSA sign key pair + agreement key.
    */
    public generateMasterKeys(passPhrase: string): Promise<Keys> {
        return new Promise((resolve, reject) => {
            // hash passphrase with sha256
            let hashedPassPhrase = CryptoJS.SHA256(passPhrase);
            // use ec-kcdsa to generate keys from passphrase
            let keys = ECKCDSA.keygen(Converter.convertWordArrayToByteArray(hashedPassPhrase));
            let keyObject: Keys = new Keys({
                "publicKey": Converter.convertByteArrayToHexString(keys.p),
                "signPrivateKey": Converter.convertByteArrayToHexString(keys.s),
                "agreementPrivateKey": Converter.convertByteArrayToHexString(keys.k)
            });
            resolve(keyObject);
        });
    }

    /*
    * Convert hex string of the public key to the account id
    */
    public getAccountIdFromPublicKey(publicKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // hash with SHA 256
            let hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
            let bytes = Converter.convertWordArrayToByteArray(hash);
            // slice away first 8 bytes of SHA256 string
            let slice = bytes.slice(0, 8);
            // order it from lowest bit to highest / little-endian first / reverse
            slice = slice.reverse();
            // convert each byte into a number with radix 10
            let numbers = slice.map(byte => byte.toString(10));
            // create a biginteger based on the reversed byte/number array
            let id = new BN(numbers, 256); // base 256 for byte
            resolve(id.toString()); // return big integer in string
        });
    }

    /*
    * Convert the account id to the appropriate Burst address
    */
    public getBurstAddressFromAccountId(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // TODO: refactor shitty nxt address resolution
            resolve(BurstUtil.encode(id));
        });
    }

    /*
    * Convert Burst Address back to account id
    */
    public getAccountIdFromBurstAddress(address: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // TODO: refactor shitty nxt address resolution
            resolve(BurstUtil.decode(address));
        });
    }

    /*
    * Encrypt a derived hd private key with a given pin and return it in Base64 form
    */
    public encryptAES(text: string, key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let encrypted = CryptoJS.AES.encrypt(text, key);
            resolve(encrypted.toString()); // Base 64
        });
    }
    /*
    * Decrypt a derived hd private key with a given pin
    */
    public decryptAES(encryptedBase64: string, key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
            resolve(decrypted.toString(CryptoJS.enc.Utf8));
        });
    }

    /*
    * Encrypt a message attached to a transaction
    */
    public encryptMessage(message: string, encryptedPrivateKey: string, pinHash: string, recipientPublicKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.decryptAES(encryptedPrivateKey, pinHash)
                .then(privateKey => {
                    // generate shared key
                    let sharedKey =
                        ECKCDSA.sharedkey(
                            Converter.convertHexStringToByteArray(privateKey),
                            Converter.convertHexStringToByteArray(recipientPublicKey)
                        );
                    // Create random nonce
                    let random_bytes = CryptoJS.lib.WordArray.random(32);
                    let r_nonce = Converter.convertWordArrayToUint8Array(random_bytes);
                    // combine
                    for (let i = 0; i < 32; i++) {
                        sharedKey[i] ^= r_nonce[i];
                    }
                    // hash shared key
                    let key = CryptoJS.SHA256(Converter.convertByteArrayToWordArray(sharedKey));
                    // ENCRYPT
                    let iv = CryptoJS.lib.WordArray.random(16);
                    let messageB64 = CryptoJS.AES.encrypt(message, key.toString(), {iv: iv}).toString();
                    // convert base 64 to hex due to node limitation
                    let messageHex = iv.toString(CryptoJS.enc.Hex) + CryptoJS.enc.Base64.parse(messageB64).toString(CryptoJS.enc.Hex);
                    // Uint 8 to hex
                    let nonce = random_bytes.toString(CryptoJS.enc.Hex);
                    // return encrypted pair
                    resolve({ m: messageHex, n: nonce })
                })
        })
    }

    /*
    * Decrypt a message attached to transaction
    */
    public decryptMessage(encryptedMessage: string, nonce: string, encryptedPrivateKey: string, pinHash: string, senderPublicKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.decryptAES(encryptedPrivateKey, pinHash)
                .then(privateKey => {
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
                    // DECRYPT
                    let message = CryptoJS.AES.decrypt(messageB64, key.toString()).toString(CryptoJS.enc.Utf8);
                    // return decrypted message
                    resolve(message);
                })
        })
    }

    /*
    * Hash string into hex string
    */
    public hashSHA256(input: string): string {
        return CryptoJS.SHA256(input).toString();
    }

    /*
    * Generate signature for transaction
    * s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
    *          sha256(sha256(transactionHex)_privateKey),
    *          privateKey)
    * p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
    */
    public generateSignature(transactionHex: string, encryptedPrivateKey: string, pinHash: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.decryptAES(encryptedPrivateKey, pinHash)
                .then(privateKey => {
                    let s = Converter.convertHexStringToByteArray(privateKey);
                    let m = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(transactionHex)));
                    let m_s = m.concat(s);
                    let x = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_s)));
                    let y = ECKCDSA.keygen(x).p;
                    let m_y = m.concat(y);
                    let h = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_y)));
                    let v = ECKCDSA.sign(h, x, s);
                    resolve(Converter.convertByteArrayToHexString([].concat(v, h)));
                })
        });
    }


    /*
    * Verify signature for transaction
    * h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
    * ==
    * sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
    */
    public verifySignature(signature: string, transactionHex: string, publicKey: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // get bytes
            let signatureBytes = Converter.convertHexStringToByteArray(signature);
            let publicKeyBytes = Converter.convertHexStringToByteArray(publicKey);
            let v = signatureBytes.slice(0, 32);
            let h1 = signatureBytes.slice(32);
            let y = ECKCDSA.verify(v, h1, publicKeyBytes);
            let m = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(transactionHex)));
            let m_y = m.concat(y);
            let h2 = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_y)));
            // Convert to hex
            let h1hex = Converter.convertByteArrayToHexString(h1);
            let h2hex = Converter.convertByteArrayToHexString(h2);
            // compare
            resolve(h1hex == h2hex);
        });
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
