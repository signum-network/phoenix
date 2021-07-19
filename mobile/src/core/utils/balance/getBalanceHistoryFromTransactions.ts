import {
  getRecipientsAmount,
  Transaction,
  TransactionType,
  TransactionAssetSubtype
} from '@signumjs/core';
import { convertNQTStringToNumber } from '@signumjs/util';
import { BalanceHistoryItem } from './typings';

const isOwnTransaction = (accountId: string, transaction: Transaction): boolean => transaction.sender === accountId;

function getRelativeTransactionAmount (accountId: string, transaction: Transaction): number {

  if (isOwnTransaction(accountId, transaction)) {
    // type 2, subtype 3 = BidOrderPlacement
    // Todo: support Ask Order Placement?
    // This logic is flawed/imperfect, but seems to work well enough
    const amountBurst = transaction.type === TransactionType.Asset &&
      transaction.subtype === TransactionAssetSubtype.BidOrderPlacement ?
      convertNQTStringToNumber((transaction.attachment.quantityQNT * transaction.attachment.priceNQT).toString()) :
      convertNQTStringToNumber(transaction.amountNQT);
    const feeBurst = convertNQTStringToNumber(transaction.feeNQT);
    return -(amountBurst + feeBurst);
  }

  return getRecipientsAmount(accountId, transaction);
}

/**
 * Creates a (reversed) history of balances, i.e. deducing an ordered transaction list from current balance
 * @param accountId The accountId of the related Account
 * @param currentBalance The current balance value in BURST
 * @param transactions The transaction array (assuming most recent transaction on head of list)
 * @return A list with balances per transaction
 */
export function getBalanceHistoryFromTransactions (
  accountId: string,
  currentBalance: number,
  transactions: Transaction[]): BalanceHistoryItem[] {

  let balance = currentBalance;

  return transactions.map((t: Transaction) => {
    const relativeAmount = getRelativeTransactionAmount(accountId, t);
    const deducedBalances = {
      timestamp: t.blockTimestamp,
      transactionId: t.transaction,
      balance,
      transaction: t
    };
    balance = balance - relativeAmount;
    return deducedBalances;
  });
}
