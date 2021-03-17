/**
 Original work Copyright (c) 2021 Burst Apps Team
 */

import BigNumber from 'bignumber.js';

/**
 * Converts/Decodes a Hex encoded string into Base36 string. UTF-8 is supported
 * Inverse function [[convertBase36StringToHexString]]
 * @param hex The string to be decoded (either URI encoded or not)
 * @return {string} The hex representation of input string
 * @module util
 */
export  const convertHexStringToBase36String = (hex: string): string => {
    return new BigNumber(hex, 16).toString(36);
};
