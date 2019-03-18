import {Transaction} from '@burstjs/core';

export interface BalanceHistoryItem {
  readonly transactionId: string;
  readonly balance: number;
  readonly transaction: Transaction;
}
