/** @ignore */
/** @internal */
/** @module core */

// tslint:disable:max-line-length
// tslint:disable:no-bitwise
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */
export const initialCodeword = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const gexp: number[] = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1];
export const glog: number[] = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15];
export const cwmap: number[] = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11];
export const alphabet: string[] = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
export const base32Length = 13;

const ginv = (a) => {
    return gexp[31 - glog[a]];
};

export const gmult = (a, b) => {
    if (a === 0 || b === 0) {
        return 0;
    }

    const idx = (glog[a] + glog[b]) % 31;

    return gexp[idx];
};


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
