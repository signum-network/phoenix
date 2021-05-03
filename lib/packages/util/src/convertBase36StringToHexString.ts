/**
 * Original work Copyright (c) 2021 Burst Apps Team
 */

import BigNumber from 'bignumber.js';

/**
 * Converts/Decodes a Base36 encoded string into hex string. UTF-8 is supported
 * Inverse function [[convertHexStringToBase36String]]
 * @param b36 The string to be decoded (either URI encoded or not)
 * @return {string} The hex representation of input string
 * @module util
 */
export const convertBase36StringToHexString = (b36: string): string => {
    return new BigNumber(b36, 36).toString(16);
};
