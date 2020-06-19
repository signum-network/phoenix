/**
 Original work Copyright (c) 2020 Burst Apps Team
 */
import BigNumber from 'bignumber.js';


/**
 * @internal
 * @param bn
 */
const twosComplementBinary = (bn: BigNumber) => {
    // we manually implement our own two's complement (flip bits, add one)
    let bin = bn.multipliedBy(-1).toString(2);
    while (bin.length % 8) {
        bin = '0' + bin;
    }
    const prefix = ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) ? '11111111' : '';
    bin = bin.split('').map(i => '0' === i ? '1' : '0').join('');
    return new BigNumber(prefix + bin, 2).plus(1);
};

/**
 * Arbitrary length decimal to hexadecimal conversion
 *
 * @note: Negative numbers are expressed as Two's Complement (https://en.wikipedia.org/wiki/Two%27s_complement)
 * Credits to AJ ONeal for the two's complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 *
 * @param decimal A decimal string or BigNumber representation
 * @return A hexadecimal string
 * @module util
 */
export const convertDecStringToHexString = (decimal: BigNumber | string): string => {
    let bn = typeof decimal === 'string' ? new BigNumber(decimal) : decimal;

    if (bn.isNaN()) {
        throw new Error(`Invalid argument: [${decimal}] - Expected a valid decimal value`);
    }

    if (bn.lt(0)) {
        bn = twosComplementBinary(bn);
    }
    const hex = bn.toString(16);
    return hex.length % 2 ? '0' + hex : hex;
};
