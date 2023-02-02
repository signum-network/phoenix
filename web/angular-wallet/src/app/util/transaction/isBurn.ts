import { Transaction, TransactionAssetSubtype, TransactionPaymentSubtype, TransactionType } from '@signumjs/core';

export function  isBurn(transaction: Transaction): boolean {
  return !transaction.recipient && (
    (transaction.type === TransactionType.Asset && transaction.subtype === TransactionAssetSubtype.AssetTransfer) ||
    (transaction.type === TransactionType.Payment && transaction.subtype === TransactionPaymentSubtype.Ordinary)
  );
}
