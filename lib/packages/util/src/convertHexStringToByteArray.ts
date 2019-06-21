/** @module util */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts an hexadecimal string to byte array
 * @param hex The hexadecimal string to be converted
 * @return {number[]} An byte array representing the hexadecimal input
 */
export const convertHexStringToByteArray = (hex: string): number[] => {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        const byte = parseInt(hex.substr(c, 2), 16);
        if (Number.isNaN(byte)) {
            throw new Error(`Invalid Hex String: ${hex}`);
        }
        bytes.push(byte);
    }

    return bytes;
};
