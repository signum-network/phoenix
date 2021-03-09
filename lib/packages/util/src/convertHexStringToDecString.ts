/**
 Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Arbitrary length hexadecimal to decimal conversion
 * https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string
 * @param hexStr A hexadecimal string
 * @return A decimal string
 * @module util
 */
export const convertHexStringToDecString = (hexStr: string): string => {
    const digits = [0];
    let i, j, carry;
    for (i = 0; i < hexStr.length; i += 1) {
        carry = parseInt(hexStr.charAt(i), 16);
        for (j = 0; j < digits.length; j += 1) {
            digits[j] = digits[j] * 16 + carry;
            // tslint:disable-next-line:no-bitwise
            carry = digits[j] / 10 | 0;
            digits[j] %= 10;
        }
        while (carry > 0) {
            digits.push(carry % 10);
            // tslint:disable-next-line:no-bitwise
            carry = carry / 10 | 0;
        }
    }
    return digits.reverse().join('');
};
