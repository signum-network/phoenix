import {Account} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import {isEmpty, toNumber} from 'lodash';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../../core/components/base/Text';
import {i18n} from '../../../core/i18n';
import {Colors} from '../../../core/theme/colors';
import {defaultSideOffset, FontSizes, Sizes} from '../../../core/theme/sizes';
import {core} from '../../../core/translations';
import {amountToString} from '../../../core/utils/numbers';
import {PriceInfoReduxState, PriceType} from '../../price-api/store/reducer';
import {AmountText} from '../../../core/components/base/Amount';
import {
  AccountBalances,
  getBalancesFromAccount,
} from '../../../core/utils/balance/getBalancesFromAccount';

interface Props {
  accounts: Account[];
  priceApi?: PriceInfoReduxState;
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: defaultSideOffset,
    marginBottom: Sizes.MEDIUM,
  },
  centered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const subBalanceStyles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
});

const SubBalance: React.FC<{amount: Amount; text: string}> = ({
  amount,
  text,
}) => (
  <View style={subBalanceStyles.root}>
    <View style={subBalanceStyles.content}>
      <Text color={Colors.GREY} size={FontSizes.SMALL}>
        {text}:
      </Text>
      <AmountText
        color={Colors.GREY}
        size={FontSizes.SMALL}
        amount={amount}
        style={{marginLeft: Sizes.MEDIUM}}
      />
    </View>
  </View>
);

export const AccountsListHeader: React.FC<Props> = props => {
  const {accounts, priceApi} = props;
  const hasAccounts = !isEmpty(accounts);
  const priceInBTC =
    priceApi && priceApi.priceInfo && priceApi.priceInfo.price_btc;
  const priceInUSD =
    priceApi && priceApi.priceInfo && priceApi.priceInfo.price_usd;

  const initialBalances: AccountBalances = {
    totalBalance: Amount.Zero(),
    lockedBalance: Amount.Zero(),
    committedBalance: Amount.Zero(),
    availableBalance: Amount.Zero(),
  };

  const totalBalances = accounts.reduce((totals, account) => {
    const balances = getBalancesFromAccount(account);
    totals.totalBalance.add(balances.totalBalance);
    totals.lockedBalance.add(balances.lockedBalance);
    totals.availableBalance.add(balances.availableBalance);
    totals.committedBalance.add(balances.committedBalance);
    return totals;
  }, initialBalances);

  // const totalSigna = toNumber(totalBalances.totalBalance.getSigna());
  // const totalBalanceBTC = priceInBTC
  //     ? toNumber(priceInBTC) * totalSigna
  //     : 0;
  // const totalBalanceUSD = priceInBTC
  //     ? toNumber(priceInUSD) * totalSigna
  //     : 0;

  const hasLockedAmount = totalBalances.lockedBalance.greater(Amount.Zero());
  const hasCommittedAmount = totalBalances.committedBalance.greater(
    Amount.Zero(),
  );

  return (
    hasAccounts && (
      <View style={styles.view}>
        <View style={styles.centered}>
          <AmountText
            amount={totalBalances.totalBalance}
            size={FontSizes.LARGE}
            color={Colors.WHITE}
          />
        </View>
        <View>
          {(hasLockedAmount || hasCommittedAmount) && (
            <SubBalance
              text={i18n.t(core.balances.available)}
              amount={totalBalances.availableBalance}
            />
          )}
          {hasLockedAmount && (
            <SubBalance
              text={i18n.t(core.balances.locked)}
              amount={totalBalances.lockedBalance}
            />
          )}
          {hasCommittedAmount && (
            <SubBalance
              text={i18n.t(core.balances.committed)}
              amount={totalBalances.committedBalance}
            />
          )}
        </View>
      </View>
    )
  );
};
