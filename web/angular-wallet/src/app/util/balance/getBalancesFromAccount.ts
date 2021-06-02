import {Account} from '@signumjs/core';
import {AccountBalances} from './typings';
import {Amount} from '@signumjs/util';

export function getBalancesFromAccount(account: Account): AccountBalances {
  const totalBalance = Amount.fromPlanck(account.balanceNQT || '0');
  const availableBalance = Amount.fromPlanck(account.unconfirmedBalanceNQT || '0');
  const lockedBalance = totalBalance.clone().subtract(availableBalance);
  const committedBalance = Amount.fromPlanck(account.committedBalanceNQT || '0');
    return {
    availableBalance,
    committedBalance,
    lockedBalance,
    totalBalance
  };
}
