import { getRecipientsAmount, Transaction, TransactionAssetSubtype, TransactionType } from "@signumjs/core";
import {Amount} from '@signumjs/util';
import {BalanceHistoryItem} from './typings';
import {flow, map, filter} from 'lodash/fp';

const isOwnTransaction = (accountId: string, transaction: Transaction): boolean => transaction.sender === accountId;

const isDistribution = (t: Transaction): boolean => t.type === TransactionType.Asset && t.subtype === TransactionAssetSubtype.AssetDistributeToHolders;

/**
 * distribution
 * :
 * account
 * :
 * "16107620026796983538"
 * amountNQT
 * :
 * "205479452"
 * assetId
 * :
 * "7884873558753153777"
 * confirmations
 * :
 * 33
 * distributedAssetId
 * :
 * null
 * height
 * :
 * 1108969
 * quantityQNT
 * :
 * "0"
 * requestProcessingTime
 * :
 * 1
 * transaction
 * :
 * "6124309833838609292"
 * @param accountId
 * @param transaction
 */

function getRelativeTransactionAmount(accountId: string, transaction: Transaction): number {

  // outgoing
  if (isOwnTransaction(accountId, transaction)) {
    const amount = Amount.fromPlanck(transaction.amountNQT || '0')
      .add(Amount.fromPlanck(transaction.feeNQT))
      .getSigna();
    return -parseFloat(amount);
  }

  // incoming
  if(isDistribution(transaction)){
    const amount = Amount.fromPlanck(transaction.distribution.amountNQT || '0');
    return parseFloat(amount.getSigna());
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
    map((t: Transaction) => {
      const relativeAmount = getRelativeTransactionAmount(accountId, t);
      const deducedBalances = {
        timestamp: t.blockTimestamp,
        transactionId: t.transaction,
        balance,
        relativeAmount,
        transaction: t
      } as BalanceHistoryItem;
      balance = balance - relativeAmount;
      return deducedBalances;
    }))(transactions);
}
