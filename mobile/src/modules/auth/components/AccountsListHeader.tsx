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
import { amountToString } from '../../../core/utils/numbers';
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
    const cmcPrice = cmc && cmc.price_btc;

    const totalBalance = accounts.reduce((prev, curr) => {
      return prev + convertNQTStringToNumber(curr.balanceNQT);
    }, 0);
    const totalBalanceBTC = cmcPrice
      ? toNumber(cmcPrice) * totalBalance
      : 0;

    return hasAccounts ? (
      <View style={styles.view}>
        <Text color={Colors.WHITE} size={FontSizes.LARGE} bold bebasFont>
          {i18n.t(core.currency.BURST.value, { value: amountToString(totalBalance) })}
        </Text>
        {cmcPrice ? (
          <Text color={Colors.WHITE} bebasFont>
            {i18n.t(core.currency.BTC.value, { value: amountToString(totalBalanceBTC) })}
          </Text>
        ) : null}
      </View>
    ) : null;
  }
}
