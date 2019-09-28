import { Transaction } from '@burstjs/core';

export interface BalanceHistoryItem {
  readonly timestamp: number;
  readonly transactionId: string;
  readonly balance: number;
  readonly transaction: Transaction;
}
