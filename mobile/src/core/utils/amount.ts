import { Amount } from "@signumjs/util";

/**
 * Converts a string into valid positive amount/float string
 * @param amount
 * @return correctly formatted account
 */
export const stableAmountFormat = (amount: string): string => {

    return amount
        .replace(/,/ig, '.') // substitute all comma by dots
        .replace(/\.{2,}/ig, '.') // substitute all multiple consecutive dots
        .replace(/(.+\..+)\..*/ig, '$1') // remove multiple dots
        .replace(/[^0-9.]/ig, '') // remove all non-digits except dot
        .replace(/^0+([0-9.]+)/ig, '$1') // trim leading zeroes before digits
        .replace(/^\.(.*)/ig, '0.$1');

};

/**
 * Tries to parse a string into Amount, without throwing exception
 * @param amountSigna string representing Signa amount
 * @return Amount object, or Amount.Zero() in case of failure
 */
export const stableParseSignaAmount = (amountSigna: string = '0'): Amount => {
    try {
        return Amount.fromSigna(amountSigna);
    } catch (e) {
        return Amount.Zero();
    }
};
