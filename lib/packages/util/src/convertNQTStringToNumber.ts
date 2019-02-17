/** @module util */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Helper method to convert a String to number
 * @param amount The amount in NQT
 * @return A number expressed in Burst (not NQT)
 * @throws exception if argument is invalid
 */
export const convertNQTStringToNumber = (amount: string): number => {

    if (amount === undefined ||
        amount === null ||
        amount === '') {
        throw new Error('Invalid argument');
    }

    return parseFloat(amount) / 100000000;
};
