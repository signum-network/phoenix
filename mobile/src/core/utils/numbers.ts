import { convertNQTStringToNumber } from '@burstjs/util';

export const NQTAmountToString = (amount: string): string => {
  return amountToString(convertNQTStringToNumber(amount));
};

/**
 * Replace scientific notation (if exists) to decimal and removes trailing zeros.
 * @param {number} amount
 */
export const amountToString = (amount: number): string => {
  return amount
    .toFixed(8)
    .replace(/\.?0+$/,'');
};
