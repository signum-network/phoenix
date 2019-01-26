/* tslint:disable:no-bitwise */
import * as BN from 'bn.js';

/*
* Copyright 2018 PoC-Consortium
*/

// TODO: Tests and maybe break up in exportable functions

/**
 * The BurstUtil class provides static methods for encoding and decoding numeric ids.
 * In addition, addresses can be checked for validity.
 */
export class BurstUtil {
    private static readonly initialCodeword = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // tslint:disable-next-line:max-line-length
    private static readonly gexp: number[] = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1];
    // tslint:disable-next-line:max-line-length
    private static readonly glog: number[] = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15];
    private static readonly cwmap: number[] = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11];
    private static readonly alphabet: string[] = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    private static readonly base32Length = 13;

    public static burstAddressPattern = {
        '_': {pattern: new RegExp('\[a-zA-Z0-9\]')}
    };

    private static ginv(a) {
        return BurstUtil.gexp[31 - BurstUtil.glog[a]];
    }

    private static gmult(a, b) {
        if (a === 0 || b === 0) {
            return 0;
        }

        const idx = (BurstUtil.glog[a] + BurstUtil.glog[b]) % 31;

        return BurstUtil.gexp[idx];
    }

    /**
     * Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX
     * @param numericId The numeric Id
     */
    public static encode(numericId: string): string {
        const plainString10 = [],
            codeword = BurstUtil.initialCodeword.slice();
        let pos = 0;

        const plainString = new BN(numericId).toString();
        let length = plainString.length;

        for (let i = 0; i < length; i++) {
            plainString10[i] = plainString.charCodeAt(i) - '0'.charCodeAt(0);
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

        for (let i = BurstUtil.base32Length - 1; i >= 0; i--) {
            const fb = codeword[i] ^ p[3];

            p[3] = p[2] ^ BurstUtil.gmult(30, fb);
            p[2] = p[1] ^ BurstUtil.gmult(6, fb);
            p[1] = p[0] ^ BurstUtil.gmult(9, fb);
            p[0] = BurstUtil.gmult(17, fb);
        }

        codeword[13] = p[0];
        codeword[14] = p[1];
        codeword[15] = p[2];
        codeword[16] = p[3];

        let out = 'BURST-';

        for (let i = 0; i < 17; i++) {
            out += BurstUtil.alphabet[codeword[BurstUtil.cwmap[i]]];

            if ((i & 3) === 3 && i < 13) {
                out += '-';
            }
        }

        return out;
    }

    /**
     * Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id
     * @param address The BURST address
     */
    public static decode(address: string): string {
        // remove Burst prefix
        if (address.indexOf('BURST-') === 0) {
            address = address.substr(6);
        } else {
            return undefined;
        }

        const codeword = BurstUtil.initialCodeword.slice();
        let codewordLength = 0;

        for (let i = 0; i < address.length; i++) {
            const pos = BurstUtil.alphabet.indexOf(address.charAt(i));

            if (pos <= -1 || pos > BurstUtil.alphabet.length) {
                continue;
            }

            if (codewordLength > 16) {
                return undefined;
            }

            const codeworkIndex = BurstUtil.cwmap[codewordLength];
            codeword[codeworkIndex] = pos;
            codewordLength++;
        }

        if (!BurstUtil.isValid(address)) {
            return undefined;
        }

        let length = BurstUtil.base32Length;
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

    /**
     * Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)
     * @param address The address
     */
    public static isValid(address: string) {
        if (address.indexOf('BURST-') === 0) {
            address = address.substr(6);
        }

        const codeword = BurstUtil.initialCodeword.slice();
        let codewordLength = 0;

        for (let i = 0; i < address.length; i++) {
            const pos = BurstUtil.alphabet.indexOf(address.charAt(i));

            if (pos <= -1 || pos > BurstUtil.alphabet.length) {
                continue;
            }

            if (codewordLength > 16) {
                return false;
            }

            const codeworkIndex = BurstUtil.cwmap[codewordLength];
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

                t ^= BurstUtil.gmult(codeword[pos], BurstUtil.gexp[(i * j) % 31]);
            }

            sum |= t;
        }

        return (sum === 0);
    }

    /**
     * Split the Burst address string into an array of 4 parts
     * @param address A valid Burst address
     */
    public static splitBurstAddress(address: string): string[] {
        const parts: string[] = address.split('-');
        parts.shift();
        if (parts.length === 4) {
            return parts;
        } else {
            return [];
        }
    }

    /**
     * Construct a Burst address from a string array
     * @param parts 4 parts string array
     */
    public static constructBurstAddress(parts: string[]): string {
        return 'BURST-' + parts[0] + '-' + parts[1] + '-' + parts[2] + '-' + parts[3];
    }

    /**
     * Validation Check. Quick validation of Burst addresses included
     * @param address Burst Address
     */
    public static isBurstcoinAddress(address: string): boolean {
        return /^BURST\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/i.test(address) && BurstUtil.isValid(address);
    }

    /**
     * Helper method to convert a String to number
     * @param amount The amount in NQT
     * @return A number expressed in Burst (not NQT)
     */
    public static convertStringToNumber(amount: string): number {
        return parseFloat(amount) / 100000000;
    }

    /**
     * Helper method to Number to String(8 decimals) representation
     * @param n the number
     * @return a NQT number string
     */
    public static convertNumberToString(n: number): string {
        return parseFloat(n.toString()).toFixed(8).replace('.', '');
    }


}
