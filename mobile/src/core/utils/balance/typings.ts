import { Transaction } from '@signumjs/core';

export interface BalanceHistoryItem {
  readonly timestamp: number;
  readonly transactionId: string;
  readonly balance: number;
  readonly transaction: Transaction;
}
