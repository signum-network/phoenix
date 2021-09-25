import { Amount } from "@signumjs/util";

/**
 * Converts a string into valid positive amount/float string
 * @param amount
 * @return correctly formatted account
 */
export const stableAmountFormat = (amount: string): string => {
  return amount
    .replace(/,/gi, ".") // substitute all comma by dots
    .replace(/\.{2,}/gi, ".") // substitute all multiple consecutive dots
    .replace(/(.+\..+)\..*/gi, "$1") // remove multiple dots
    .replace(/[^0-9.]/gi, "") // remove all non-digits except dot
    .replace(/^0+([0-9.]+)/gi, "$1") // trim leading zeroes before digits
    .replace(/^\.(.*)/gi, "0.$1");
};

/**
 * Tries to parse a string into Amount, without throwing exception
 * @param amountSigna string representing Signa amount
 * @return Amount object, or Amount.Zero() in case of failure
 */
export const stableParseSignaAmount = (amountSigna: string = "0"): Amount => {
  try {
    return Amount.fromSigna(amountSigna);
  } catch (e) {
    return Amount.Zero();
  }
};

/**
 * Tries to parse a string into Amount, without throwing exception
 * @param amountPlanck string representing Planck amount
 * @return Amount object, or Amount.Zero() in case of failure
 */
export const stableParsePlanckAmount = (amountPlanck: string = "0"): Amount => {
  try {
    return Amount.fromPlanck(amountPlanck);
  } catch (e) {
    return Amount.Zero();
  }
};
