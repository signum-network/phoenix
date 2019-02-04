/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as BN from 'bn.js';
import { base32Length, cwmap, alphabet, initialCodeword } from ".";
import { isValid } from "./isValid";

/**
 * Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id
 * @param address The BURST address
 */
export const decode = (address: string): string => {
    // remove Burst prefix
    if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
    } else {
        return undefined;
    }

    const codeword = initialCodeword.slice();
    let codewordLength = 0;

    for (let i = 0; i < address.length; i++) {
        const pos = alphabet.indexOf(address.charAt(i));

        if (pos <= -1 || pos > alphabet.length) {
            continue;
        }

        if (codewordLength > 16) {
            return undefined;
        }

        const codeworkIndex = cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
    }

    if (!isValid(address)) {
        return undefined;
    }

    let length = base32Length;
    const cypherString32 = [];
    for (let i = 0; i < length; i++) {
        cypherString32[i] = codeword[length - i - 1];
    }

    let out = '',
        newLength,
        digit10 = 0;
    do { // base 32 to base 10 conversion
        newLength = 0;
        digit10 = 0;

        for (let i = 0; i < length; i++) {
            digit10 = digit10 * 32 + cypherString32[i];

            if (digit10 >= 10) {
                cypherString32[newLength] = Math.floor(digit10 / 10);
                digit10 %= 10;
                newLength += 1;
            } else if (newLength > 0) {
                cypherString32[newLength] = 0;
                newLength += 1;
            }
        }
        length = newLength;
        out += digit10;
    } while (length > 0);

    return new BN(out.split('').reverse().join('')).toString();
}