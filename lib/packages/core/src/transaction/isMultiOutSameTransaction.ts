import {Transaction} from '../typings/transaction';
import {TransactionPaymentSubtype, TransactionType} from '../constants';

/**
 * Checks if a transaction is a multi out transaction with same amounts for each recipient
 * @param transaction Transaction to be checked
 * @return true, if is a multi out transaction
 * @module core
 */
export const isMultiOutSameTransaction = (transaction: Transaction): boolean =>
    transaction.type === TransactionType.Payment && transaction.subtype === TransactionPaymentSubtype.MultiOutSameAmount;
