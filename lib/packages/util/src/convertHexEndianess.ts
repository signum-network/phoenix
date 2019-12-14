/** @module util */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts the endianess of a hex string.
 * If string is little Endianess it turns into Big Endianess, and vice versa
 * @param hexString The hex string to be converted
 * @return The converted string as hex string
 */
export const convertHexEndianess = (hexString) : string => {
    let result = '';
    const rawData = hexString;
    for (let i = rawData.length - 1; i >= 0; i -= 2) {
        result += rawData[i - 1] + rawData[i];
    }
    return result;
};
