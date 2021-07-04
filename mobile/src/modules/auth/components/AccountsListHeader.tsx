import { Account } from '@signumjs/core';
import { convertNQTStringToNumber } from '@signumjs/util';
import { isEmpty, toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../core/components/base/Text';
import { i18n } from '../../../core/i18n';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../core/theme/sizes';
import { core } from '../../../core/translations';
import { amountToString } from '../../../core/utils/numbers';
import { PriceInfoReduxState, PriceType } from '../../price-api/store/reducer';

interface Props {
  accounts: Account[];
  priceApi?: PriceInfoReduxState
}

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    marginBottom: Sizes.MEDIUM
  }
};

export class AccountsListHeader extends React.PureComponent<Props> {
  render () {
    const { accounts, priceApi } = this.props;
    const hasAccounts = !isEmpty(accounts);
    const priceInBTC = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_btc;
    const priceInUSD = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_usd;

    const totalBalance = accounts.reduce((prev, curr) => {
      return prev + convertNQTStringToNumber(curr.balanceNQT);
    }, 0);
    const totalBalanceBTC = priceInBTC
      ? toNumber(priceInBTC) * totalBalance
      : 0;
    const totalBalanceUSD = priceInBTC
      ? toNumber(priceInUSD) * totalBalance
      : 0;

    return hasAccounts ? (
      <View style={styles.view}>
        <Text color={Colors.WHITE} size={FontSizes.LARGE} bold bebasFont>
          {i18n.t(core.currency.SIGNA.value, { value: amountToString(totalBalance) })}
        </Text>
        {priceInBTC ? (
          <Text color={Colors.WHITE} bebasFont>
            {priceApi && priceApi.selectedCurrency === PriceType.USD ?
              i18n.t(core.currency.USD.value, { value: totalBalanceUSD.toFixed(2) }) :
              i18n.t(core.currency.BTC.value, { value: amountToString(totalBalanceBTC) })}
          </Text>
        ) : null}
      </View>
    ) : null;
  }
}
