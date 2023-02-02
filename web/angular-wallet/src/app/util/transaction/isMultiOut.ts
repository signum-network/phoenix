import { isMultiOutSameTransaction, isMultiOutTransaction, Transaction } from '@signumjs/core';
import { isTokenHolderDistribution } from './isTokenHolderDistribution';

export function isMultiOutPayment(transaction: Transaction): boolean {
  return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction) || isTokenHolderDistribution(transaction);
}
