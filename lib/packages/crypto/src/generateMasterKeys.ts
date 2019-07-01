/** @module crypto */

import * as CryptoJS from 'crypto-js';
import { Keys } from './typings/keys';
import { ECKCDSA } from './ec-kcdsa';
import { Converter } from './converter';

/**
 * Generate the Master Public Key and Master Private Key for a new passphrase
 * @param passPhrase The passphrase
 * @return EC-KCDSA sign key pair + agreement key
 */
export const generateMasterKeys = (passPhrase: string): Keys => {
    const hashedPassPhrase = CryptoJS.SHA256(passPhrase);
    const keys = ECKCDSA.keygen(Converter.convertWordArrayToByteArray(hashedPassPhrase));
    return {
        publicKey: Converter.convertByteArrayToHexString(keys.p),
        signPrivateKey: Converter.convertByteArrayToHexString(keys.s),
        agreementPrivateKey: Converter.convertByteArrayToHexString(keys.k)
    };
};
