import {
  Transaction,
  TransactionArbitrarySubtype, TransactionAssetSubtype, TransactionEscrowSubtype,
  TransactionSmartContractSubtype,
  TransactionType
} from "@signumjs/core";
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

  if (transaction.type === TransactionType.Asset) {
    return transaction.subtype !== TransactionAssetSubtype.AssetTransfer
     && transaction.subtype !== TransactionAssetSubtype.AssetMultiTransfer
  }

  return transaction.type === TransactionType.Mining;
}
