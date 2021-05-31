// tslint:disable:no-bitwise

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */

import {initialCodeword, base32Length, gmult, alphabet, cwmap} from './internal';

/**
 * @internal
 * Encode a numeric id into Reed-Solomon address <Prefix>-XXXX-XXXX-XXXX-XXXXX
 * @param numericId The numeric Id
 * @param prefix The prefix for the address
 * @return the Reed-Solomon address encoding, or undefined if passed null, undefined
 * @module core
 */
export const convertNumericIdToReedSolomonAddress = (numericId: string, prefix: string): string => {

    if (!(numericId && prefix)) {
        throw new Error('Invalid arguments');
    }

    if (!/^\d+$/.test(numericId)) {
        throw new Error(`Invalid numeric id: ${numericId}`);
    }

    const plainString10 = [],
        codeword = initialCodeword.slice();
    let pos = 0;

    let length = numericId.length;

    for (let i = 0; i < length; i++) {
        plainString10[i] = numericId.charCodeAt(i) - '0'.charCodeAt(0);
    }

    let digit32 = 0,
        newLength = 0;
    do {
        digit32 = 0;
        newLength = 0;
        for (let i = 0; i < length; i++) {
            digit32 = digit32 * 10 + plainString10[i];
            if (digit32 >= 32) {
                plainString10[newLength] = digit32 >> 5;
                digit32 &= 31;
                newLength++;
            } else if (newLength > 0) {
                plainString10[newLength] = 0;
                newLength++;
            }
        }

        length = newLength;
        codeword[pos] = digit32;
        pos++;
    }
    while (length > 0);

    const p = [0, 0, 0, 0];

    for (let i = base32Length - 1; i >= 0; i--) {
        const fb = codeword[i] ^ p[3];

        p[3] = p[2] ^ gmult(30, fb);
        p[2] = p[1] ^ gmult(6, fb);
        p[1] = p[0] ^ gmult(9, fb);
        p[0] = gmult(17, fb);
    }

    codeword[13] = p[0];
    codeword[14] = p[1];
    codeword[15] = p[2];
    codeword[16] = p[3];

    let out = prefix + '-';

    for (let i = 0; i < 17; i++) {
        out += alphabet[codeword[cwmap[i]]];

        if ((i & 3) === 3 && i < 13) {
            out += '-';
        }
    }

    return out;
};
