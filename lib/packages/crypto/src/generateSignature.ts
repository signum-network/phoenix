import {Converter} from './converter';
import {ECKCDSA} from './ec-kcdsa';
import * as CryptoJS from 'crypto-js';

/**
 * Generate a signature for a transaction
 *
 * Method:
 * ```
 *  s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
 *          sha256(sha256(transactionHex)_privateKey),
 *          privateKey)
 *  p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
 * ```
 * @param messageHex The data in hexadecimal representation
 * @param privateKey The private key for signing
 * @return The signature in hexadecimal format
 * @module crypto
 */
export const generateSignature = (messageHex: string, privateKey: string): string => {
    const s = Converter.convertHexStringToByteArray(privateKey);
    const m = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(messageHex)));
    const m_s = m.concat(s);
    const x = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_s)));
    const y = ECKCDSA.keygen(x).p;
    const m_y = m.concat(y);
    const h = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_y)));
    const v = ECKCDSA.sign(h, x, s);
    return Converter.convertByteArrayToHexString([].concat(v, h));
};
