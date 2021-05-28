/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */

import {base32Length, cwmap, alphabet, initialCodeword} from './internal';
import {ensureReedSolomonAddress} from './ensureReedSolomonAddress';
import {tokenizeReedSolomonAddress} from './tokenizeReedSolomonAddress';

/**
 * @internal
 * Converts <Prefix>-XXXX-XXXX-XXXX-XXXXX into numeric Id
 * @param address The Reed-Solomon address
 * @return The numeric id, or undefined if address is invalid
 * @module core
 */
export const convertReedSolomonAddressToNumericId = (address: string): string => {

    ensureReedSolomonAddress(address);
    const {rs} = tokenizeReedSolomonAddress(address);

    const codeword = initialCodeword.slice();
    let codewordLength = 0;

    for (let i = 0; i < rs.length; i++) {
        const pos = alphabet.indexOf(rs.charAt(i));

        if (pos <= -1 || pos > alphabet.length) {
            continue;
        }

        if (codewordLength > 16) {
            throw new Error('Invalid codeword length');
        }

        const codeworkIndex = cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
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

    return out.split('').reverse().join('');
};
