import { Keys } from "@burst/core";
import * as CryptoJS from "crypto-js";
import { ECKCDSA } from "./ec-kcdsa";
import { Converter } from "./converter";

/*
* Generate the Master Public Key and Master Private Key for a new passphrase
* EC-KCDSA sign key pair + agreement key.
*/
export const generateMasterKeys = (passPhrase: string): Promise<Keys> => {
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