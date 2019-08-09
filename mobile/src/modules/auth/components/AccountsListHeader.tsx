import { Account } from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import { isEmpty, toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../core/components/base/Text';
import { i18n } from '../../../core/i18n';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../core/theme/sizes';
import { core } from '../../../core/translations';
import { PriceInfoReduxState } from '../../cmc/store/reducer';

interface Props {
  accounts: Account[];
  cmc?: PriceInfoReduxState
}

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    marginBottom: Sizes.MEDIUM
  }
};

export class AccountsListHeader extends React.PureComponent<Props> {
  render () {
    const { accounts, cmc } = this.props;
    const hasAccounts = !isEmpty(accounts);
    const hasCMCData = !isEmpty(cmc);

    const totalBalance = accounts.reduce((prev, curr) => {
      return prev + convertNQTStringToNumber(curr.balanceNQT);
    }, 0);
    const totalBalanceBTC = cmc
      ? toNumber(cmc.price_btc) * totalBalance
      : 0;

    return hasAccounts ? (
      <View style={styles.view}>
        <Text color={Colors.WHITE} size={FontSizes.LARGE} bold bebasFont>
          {i18n.t(core.currency.BURST.value, { value: totalBalance })}
        </Text>
        {hasCMCData && (
          <Text color={Colors.WHITE} bebasFont>
            {i18n.t(core.currency.BTC.value, { value: totalBalanceBTC })}
          </Text>
        )}
      </View>
    ) : null;
  }
}
