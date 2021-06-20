/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * @param n the number
 * @return a NQT number string
 * @deprecated
 * <div class="deprecated">
 *     Use [[Amount]] instead
 * </div>
 * Helper method to Number to String(8 decimals) representation
 * @module util
 */
export const convertNumberToNQTString = (n: number): string => {

    if (n === undefined || n === null) { throw new Error('Invalid argument'); }

    return parseFloat(n.toString())
        .toFixed(8)
        .replace('.', '');
};
