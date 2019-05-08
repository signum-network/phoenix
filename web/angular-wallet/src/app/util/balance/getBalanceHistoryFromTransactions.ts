import {
  Transaction,
  getRecipientsAmount
} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {BalanceHistoryItem} from './typings';

const isOwnTransaction = (accountId: string, transaction: Transaction): boolean => transaction.sender === accountId;

function getRelativeTransactionAmount(accountId: string, transaction: Transaction): number {

  if (isOwnTransaction(accountId, transaction)) {
    const amountBurst = convertNQTStringToNumber(transaction.amountNQT);
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
export function getBalanceHistoryFromTransactions(
  accountId: string,
  currentBalance: number,
  transactions: Transaction[]): Array<BalanceHistoryItem> {

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
