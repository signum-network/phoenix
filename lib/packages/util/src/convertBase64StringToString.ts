/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import {Base64} from 'js-base64';

/**
 * Converts/Decodes a Base64 encoded string to string. UTF-8 is supported
 * Inverse function [[convertStringToBase64String]]
 * @param b64 The string to be decoded (either URI encoded or not)
 * @return {string} The orginal string
 * @module util
 */
export const convertBase64StringToString = (b64: string): string => {
    return Base64.decode(b64);
};
