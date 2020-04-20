import { Converter } from './converter';
import { ECKCDSA } from './ec-kcdsa';
import * as CryptoJS from 'crypto-js';

/**
 * Verify a signature for given message
 *
 *  * Method:
 * ```
 * * h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
 * ==
 * sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
 * ```
 * @see [[generateSignature]]
 * @param signature The signature to be verified
 * @param messageHex The message data in hexadecimal representation
 * @param publicKey The public key
 * @return _true_, if signature is valid, otherwise _false_
 * @module crypto
 */
export const verifySignature = (signature: string, messageHex: string, publicKey: string): boolean => {
    // get bytes
    const signatureBytes = Converter.convertHexStringToByteArray(signature);
    const publicKeyBytes = Converter.convertHexStringToByteArray(publicKey);
    const v = signatureBytes.slice(0, 32);
    const h1 = signatureBytes.slice(32);
    const y = ECKCDSA.verify(v, h1, publicKeyBytes);
    const m = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(messageHex)));
    const m_y = m.concat(y);
    const h2 = Converter.convertWordArrayToByteArray(CryptoJS.SHA256(Converter.convertByteArrayToWordArray(m_y)));
    // Convert to hex
    const h1hex = Converter.convertByteArrayToHexString(h1);
    const h2hex = Converter.convertByteArrayToHexString(h2);
    // compare
    return h1hex === h2hex;
};
