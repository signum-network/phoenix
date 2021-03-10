import {Transaction} from '@burstjs/core';
import {BurstValue} from '@burstjs/util';

export interface BalanceHistoryItem {
  readonly timestamp: number;
  readonly transactionId: string;
  readonly balance: number;
  readonly transaction: Transaction;
}

export interface AccountBalances {
  readonly availableBalance: BurstValue;
  readonly lockedBalance: BurstValue;
  readonly committedBalance: BurstValue;
  readonly totalBalance: BurstValue;
}
