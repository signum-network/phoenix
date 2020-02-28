/** @module util */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * @deprecated This method will be substituted in favor of [[BurstValue]]
 * Helper method to Number to String(8 decimals) representation
 * @param n the number
 * @return a NQT number string
 */
export const convertNumberToNQTString = (n: number): string => {

    if (n === undefined || n === null) { throw new Error('Invalid argument'); }

    return parseFloat(n.toString())
        .toFixed(8)
        .replace('.', '');
};
