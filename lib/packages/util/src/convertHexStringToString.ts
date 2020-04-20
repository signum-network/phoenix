/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import {convertByteArrayToString} from './convertByteArrayToString';
import {convertHexStringToByteArray} from './convertHexStringToByteArray';

/**
 * Converts a Hexadecimally encoded string into String
 * Inverse function [[convertStringToHexString]]
 * @param hex The Hex string to be converted
 * @return {string} The string represented by the Hex String
 * @module util
 */
export const convertHexStringToString = (hex: string): string => {
    return convertByteArrayToString(convertHexStringToByteArray(hex));
};
