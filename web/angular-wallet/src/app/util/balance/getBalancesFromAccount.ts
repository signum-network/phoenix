import {Account} from '@burstjs/core';
import {AccountBalances} from './typings';
import {BurstValue} from '@burstjs/util';

export function getBalancesFromAccount(account: Account): AccountBalances {
  const totalBalance = BurstValue.fromPlanck(account.balanceNQT);
  const availableBalance = BurstValue.fromPlanck(account.unconfirmedBalanceNQT);
  const lockedBalance = totalBalance.clone().subtract(availableBalance);
  const committedBalance = BurstValue.fromPlanck('0');
  return {
    availableBalance,
    committedBalance,
    lockedBalance,
    totalBalance
  };
}
