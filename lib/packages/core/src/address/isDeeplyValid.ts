// tslint:disable:no-bitwise

import {alphabet, cwmap, gexp, gmult, initialCodeword} from './internal';

export const isDeeplyValidAddress = (address: string): boolean => {

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
