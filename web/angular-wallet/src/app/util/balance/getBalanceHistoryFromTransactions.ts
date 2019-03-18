import {Transaction} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {BalanceHistoryItem} from './typings';


function getTransactionValue(accountId: string, transaction: Transaction): number {
  const isNegative = transaction.sender === accountId;
  const amountBurst = convertNQTStringToNumber(transaction.amountNQT);
  return isNegative ? -amountBurst : amountBurst;
}

/**
 * Creates a history of balances, deduced from a transaction list
 * @param accountId The accountId of the related Account
 * @param initialBalance The initial balance value in BURST
 * @param transactions The transaction array (assuming most recent transaction on head of list)
 * @return A list with balances per transaction
 */
export function getBalanceHistoryFromTransactions(
  accountId: string,
  initialBalance: number,
  transactions: Transaction[]): Array<BalanceHistoryItem> {

  let balance = initialBalance;

  return transactions.map((t: Transaction) => {
    const deducedBalances = {
      transactionId: t.transaction,
      balance,
      transaction: t
    };
    balance = balance - getTransactionValue(accountId, t) + convertNQTStringToNumber(t.feeNQT);
    return deducedBalances;
  });
}
