import { AccountBalances } from './typings';
import { Amount } from '@signumjs/util';
import { WalletAccount } from '../WalletAccount';

export function getBalancesFromAccount(account: WalletAccount): AccountBalances {
  const totalBalance = Amount.fromPlanck(account.balanceNQT || '0');
  const availableBalance = Amount.fromPlanck(account.unconfirmedBalanceNQT || '0');
  const lockedBalance = totalBalance.clone().subtract(availableBalance);
  const committedBalance = Amount.fromPlanck(account.committedBalanceNQT || '0');
  const reservedBalance = lockedBalance.clone().subtract(committedBalance);
  return {
    availableBalance,
    committedBalance,
    lockedBalance,
    reservedBalance,
    totalBalance
  };
}
