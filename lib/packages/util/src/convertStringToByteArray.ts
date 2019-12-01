/** @module util */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts a string into byte array
 * Inverse function [[convertByteArrayToString]]
 * @param str The string  to be converted
 * @return {number[]} A byte array representing the string input
 */
export const convertStringToByteArray = (str: string): Uint8Array => {
    const s = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(s.length);
    for (let i = 0; i < s.length; ++i) {
        bytes[i] = s.charCodeAt(i);
    }

    return bytes;
};
