/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts an hexadecimal string to byte array
 * @param hex The hexadecimal string to be converted
 * @return {number[]} An byte array representing the hexadecimal input
 * @module util
 */
export const convertHexStringToByteArray = (hex: string): Uint8Array => {
    if (hex.length % 2) {
        throw new Error(`Invalid Hex String: ${hex}`);
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let c = 0; c < hex.length; c += 2) {
        const byte = parseInt(hex.substr(c, 2), 16);
        if (Number.isNaN(byte)) {
            throw new Error(`Invalid Hex String: ${hex}`);
        }
        bytes[c / 2] = byte;
    }

    return bytes;
};
