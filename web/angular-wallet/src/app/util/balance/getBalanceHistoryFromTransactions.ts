import {
  Transaction,
  getRecipientsAmount
} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {BalanceHistoryItem} from './typings';

const isOwnTransaction = (accountId: string, transaction: Transaction): boolean => transaction.sender === accountId;

function getRelativeTransactionCosts(accountId: string, transaction: Transaction): number {
  const amountBurst = getRecipientsAmount(accountId, transaction);
  if (isOwnTransaction(accountId, transaction)) {
    const feeBurst = convertNQTStringToNumber(transaction.feeNQT);
    return -(amountBurst + feeBurst);
  }
  return amountBurst;
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
    const deducedBalances = {
      transactionId: t.transaction,
      balance,
      transaction: t
    };
    balance = balance - getRelativeTransactionCosts(accountId, t);
    return deducedBalances;
  });
}
