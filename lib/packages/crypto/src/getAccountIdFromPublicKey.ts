import {Converter} from './converter';
import * as CryptoJS from 'crypto-js';

/**
 * Convert hex string of the public key to the account id
 * @param publicKey The public key
 * @return The numeric account Id
 * @module crypto
 */
export const getAccountIdFromPublicKey = (publicKey: string): string => {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
    const bytes = Converter.convertWordArrayToByteArray(hash);
    let result = '';
    for (let i = 0; i < 8; i++) {
        let byte = bytes[i].toString(16);
        if (byte.length < 2) {
            byte = '0' + byte;
        }
        result = byte + result;
    }
    return hexToDec(result);
};

/**
 * @internal
 * Arbitrary length hexadecimal to decimal conversion
 * https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string
 * @param s A hexadecimal string
 * @return A decimal string
 * @module crypto
 */
function hexToDec(s) {
    const digits = [0];
    let i, j, carry;
    for (i = 0; i < s.length; i += 1) {
        carry = parseInt(s.charAt(i), 16);
        for (j = 0; j < digits.length; j += 1) {
            digits[j] = digits[j] * 16 + carry;
            carry = digits[j] / 10 | 0;
            digits[j] %= 10;
        }
        while (carry > 0) {
            digits.push(carry % 10);
            carry = carry / 10 | 0;
        }
    }
    return digits.reverse().join('');
}
