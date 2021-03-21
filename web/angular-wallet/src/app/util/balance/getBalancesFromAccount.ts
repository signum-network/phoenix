import {Account} from '@burstjs/core';
import {AccountBalances} from './typings';
import {BurstValue} from '@burstjs/util';

export function getBalancesFromAccount(account: Account): AccountBalances {
  const totalBalance = BurstValue.fromPlanck(account.balanceNQT || '0');
  const availableBalance = BurstValue.fromPlanck(account.unconfirmedBalanceNQT || '0');
  const lockedBalance = totalBalance.clone().subtract(availableBalance);
  const committedBalance = BurstValue.fromPlanck(account.committedBalanceNQT || '0');
    return {
    availableBalance,
    committedBalance,
    lockedBalance,
    totalBalance
  };
}
