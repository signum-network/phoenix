import {Transaction} from '../typings/transaction';
import {TransactionPaymentSubtype, TransactionType} from '../constants';

/**
 * Checks if a transaction is a multi out transaction (with different amounts)
 * @param transaction Transaction to be checked
 * @return true, if is a multi out transaction
 * @module core
 */
export const isMultiOutTransaction = (transaction: Transaction) =>
    transaction.type === TransactionType.Payment && transaction.subtype === TransactionPaymentSubtype.MultiOut;
