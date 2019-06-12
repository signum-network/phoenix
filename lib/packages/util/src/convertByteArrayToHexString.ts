/** @module util */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts byte array to hexadecimal string
 * Inverse operation of [[convertHexStringToByteArray]]
 * @param bytes The byte array to be converted
 * @param uppercase If _true_, converts hex string with uppercase characters (Default: false)
 * @return {number[]} An byte array representing the hexadecimal input
 */
export const convertByteArrayToHexString = (bytes: number[], uppercase = false): string => {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return uppercase ? hex.join('').toUpperCase() : hex.join('');
};
