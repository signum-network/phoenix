/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import {convertStringToByteArray} from './convertStringToByteArray';
import {convertByteArrayToHexString} from './convertByteArrayToHexString';

/**
 * Converts/Encode a String into Hexadecimally encoded
 * Inverse function [[convertHexStringToString]]
 * @param str The Hex string to be converted
 * @return {string} The Hex String representing the input string
 * @module util
 */
export const convertStringToHexString = (str: string): string => {
    return convertByteArrayToHexString(convertStringToByteArray(str));
};
