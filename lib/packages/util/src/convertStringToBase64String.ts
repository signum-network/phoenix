/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

// FIXME: This implementation has security warnings!
import {Base64} from 'js-base64';

/**
 * Converts/Encodes a String into Base64 (URI) encoded string. UTF-8 is supported.
 * Inverse function [[convertBase64StringToString]]
 * @param str The string to be converted
 * @param isURICompatible Determine whether the resulting string shall be URI compatible, or not. Default is `true`
 * @return {string} The Base64 String representing the input string. The string is already URI encoded, i.e. can be used directly in browsers
 * @module util
 */
export const convertStringToBase64String = (str: string, isURICompatible = true): string => {
    return isURICompatible ? Base64.encodeURI(str) : Base64.encode(str);
};
