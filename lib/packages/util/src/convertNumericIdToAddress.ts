// tslint:disable:no-bitwise
/** @module util */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { initialCodeword, base32Length, gmult, alphabet, cwmap } from './internal';


/**
 * Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX
 * @param numericId The numeric Id
 * @return the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined
 */
export const convertNumericIdToAddress = (numericId: string): string => {

    if (numericId  === undefined ||
        numericId  === null ||
        numericId.trim().length === 0) {
        return undefined;
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

    let out = 'BURST-';

    for (let i = 0; i < 17; i++) {
        out += alphabet[codeword[cwmap[i]]];

        if ((i & 3) === 3 && i < 13) {
            out += '-';
        }
    }

    return out;
};
