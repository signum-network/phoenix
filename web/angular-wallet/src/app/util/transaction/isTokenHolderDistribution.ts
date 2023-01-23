import { Transaction, TransactionAssetSubtype, TransactionType } from "@signumjs/core";

export function isTokenHolderDistribution(transaction: Transaction): boolean {
  return transaction.type === TransactionType.Asset && transaction.subtype === TransactionAssetSubtype.AssetDistributeToHolders;
}
