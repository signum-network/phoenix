import {Account} from '@signumjs/core';
import {Amount} from '@signumjs/util';

export interface AccountBalances {
    readonly availableBalance: Amount;
    readonly lockedBalance: Amount;
    readonly committedBalance: Amount;
    readonly totalBalance: Amount;
}

export const ZeroAcountBalances: AccountBalances = {
    availableBalance: Amount.Zero(),
    committedBalance: Amount.Zero(),
    lockedBalance: Amount.Zero(),
    totalBalance: Amount.Zero(),
};

export function getBalancesFromAccount(account?: Account|null): AccountBalances {

    if (!account) {
        return ZeroAcountBalances;
    }

    const totalBalance = Amount.fromPlanck(account.balanceNQT || '0');
    const availableBalance = Amount.fromPlanck(account.unconfirmedBalanceNQT || '0');
    const committedBalance = Amount.fromPlanck(account.committedBalanceNQT || '0');
    // other locked balances
    const lockedBalance = totalBalance.clone().subtract(availableBalance).subtract(committedBalance);
    return {
        availableBalance,
        committedBalance,
        lockedBalance,
        totalBalance
    };
}
