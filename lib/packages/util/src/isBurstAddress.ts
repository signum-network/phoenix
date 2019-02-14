// tslint:disable:no-bitwise

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { initialCodeword, alphabet, cwmap, gexp, gmult } from './internal';


/**
 * Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)
 * @param {string} address The address
 * @return {boolean} true, if is a valid address, else false
 */
export const isValid = (address: string): boolean => {
    if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
    }

    const codeword = initialCodeword.slice();
    let codewordLength = 0;

    for (let i = 0; i < address.length; i++) {
        const pos = alphabet.indexOf(address.charAt(i));

        if (pos <= -1 || pos > alphabet.length) {
            continue;
        }

        if (codewordLength > 16) {
            return false;
        }

        const codeworkIndex = cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
    }

    if (codewordLength !== 17) {
        return false;
    }

    let sum = 0;

    for (let i = 1; i < 5; i++) {
        let t = 0;

        for (let j = 0; j < 31; j++) {
            if (j > 12 && j < 27) {
                continue;
            }

            let pos = j;
            if (j > 26) {
                pos -= 14;
            }

            t ^= gmult(codeword[pos], gexp[(i * j) % 31]);
        }

        sum |= t;
    }

    return (sum === 0);
};


/**
 * Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)
 * @note This is with prior quick check
 * @param {string} address The address
 * @return {boolean} true, if is a valid address, else false
 */
export const isBurstAddress = (address: string): boolean => {
    return /^BURST\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/i
        .test(address) && isValid(address);
};


