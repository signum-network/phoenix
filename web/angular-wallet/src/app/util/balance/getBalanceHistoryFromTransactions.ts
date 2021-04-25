import {getRecipientsAmount, Transaction} from '@burstjs/core';
import {BurstValue} from '@burstjs/util';
import {BalanceHistoryItem} from './typings';
import {TransactionType} from '@burstjs/core/src';
import {flow, map, filter} from 'lodash/fp';

const isOwnTransaction = (accountId: string, transaction: Transaction): boolean => transaction.sender === accountId;

function getRelativeTransactionAmount(accountId: string, transaction: Transaction): number {

  if (isOwnTransaction(accountId, transaction)) {
    const amount = BurstValue.fromPlanck(transaction.amountNQT)
      .add(BurstValue.fromPlanck(transaction.feeNQT))
      .getBurst()
    return -parseFloat(amount);
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

  return flow(
    filter((t: Transaction) => t.type === TransactionType.Payment),
    map((t: Transaction) => {
      const relativeAmount = getRelativeTransactionAmount(accountId, t);
      const deducedBalances = {
        timestamp: t.blockTimestamp,
        transactionId: t.transaction,
        balance,
        transaction: t
      };
      balance = balance - relativeAmount;
      return deducedBalances;
    }))(transactions);
}
