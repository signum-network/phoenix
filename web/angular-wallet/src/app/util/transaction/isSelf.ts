import {
  Transaction,
  TransactionArbitrarySubtype, TransactionEscrowSubtype,
  TransactionSmartContractSubtype,
  TransactionType
} from '@signumjs/core';
import { isMultiOutPayment } from './isMultiOut';

export function isSelf(transaction: Transaction): boolean {

  if (isMultiOutPayment(transaction)) {
    return false;
  }

  if (transaction.sender === transaction.recipient) {
    return true;
  }

  if (transaction.type === TransactionType.Arbitrary) {
    return transaction.subtype === TransactionArbitrarySubtype.AccountInfo
      || transaction.subtype === TransactionArbitrarySubtype.AliasAssignment;
  }

  if (transaction.type === TransactionType.AT) {
    return transaction.subtype === TransactionSmartContractSubtype.SmartContractCreation;
  }

  if (transaction.type === TransactionType.Escrow) {
    return transaction.subtype === TransactionEscrowSubtype.SubscriptionCancel;
  }

  return transaction.type === TransactionType.Mining;
}
