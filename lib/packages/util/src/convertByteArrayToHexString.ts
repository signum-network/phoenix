/** @module util */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts byte array to hexadecimal string
 * Inverse operation of [[convertHexStringToByteArray]]
 * @param bytes The (unsigned) byte array to be converted
 * @param uppercase If _true_, converts hex string with uppercase characters (Default: false)
 * @return {string} A hex string representing the byte array input
 */
export const convertByteArrayToHexString = (bytes: Uint8Array, uppercase = false): string => {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return uppercase ? hex.join('').toUpperCase() : hex.join('');
};
