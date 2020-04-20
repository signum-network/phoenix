/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * @deprecated
 *  * <div class="deprecated">
 *     Use [[BurstValue]] instead
 * </div>
 * Helper method to convert a Planck Value (BURST * 1E8) String to BURST number
 * @param amount The amount in Planck (aka NQT)
 * @return A number expressed in Burst (not NQT)
 * @throws exception if argument is invalid
 * @module util
 */
export const convertNQTStringToNumber = (amount: string): number => {

    if (amount === undefined ||
        amount === null ||
        amount === '') {
        throw new Error('Invalid argument');
    }

    return parseFloat(amount) / 100000000;
};
