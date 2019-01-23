import { Converter } from "./converter";
import { ECKCDSA } from "./ec-kcdsa";
import * as CryptoJS from "crypto-js";

/*
* Verify signature for transaction
* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
* ==
* sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
*/
export const verifySignature = (signature: string, transactionHex: string, publicKey: string): boolean => {
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
    return h1hex == h2hex;
}