import { Account } from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import { toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text, TextAlign } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../../core/theme/sizes';
import { core } from '../../../../core/translations';
import { amountToString } from '../../../../core/utils/numbers';
import { PriceInfoReduxState } from '../../../cmc/store/reducer';

interface Props {
  account: Account;
  cmc?: PriceInfoReduxState;
}

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    marginBottom: Sizes.MEDIUM
  }
};

export class AccountTransactionsHeader extends React.PureComponent<Props> {
  render () {
    const { account, cmc } = this.props;
    const cmcPrice = cmc && cmc.price_btc;

    const totalBalance = convertNQTStringToNumber(account.balanceNQT);
    const totalBalanceBTC = cmc
          ? toNumber(cmcPrice) * totalBalance
          : 0;

    return (
        <View style={styles.view}>
          <Text textAlign={TextAlign.CENTER} color={Colors.WHITE} size={FontSizes.LARGE} bold bebasFont>
            {i18n.t(core.currency.BURST.value, { value: amountToString(totalBalance) })}
          </Text>
          {cmcPrice ? (
              <Text textAlign={TextAlign.CENTER} color={Colors.WHITE} bebasFont>
                {i18n.t(core.currency.BTC.value, { value: amountToString(totalBalanceBTC) })}
              </Text>
          ) : null}
        </View>
    );
  }
}
