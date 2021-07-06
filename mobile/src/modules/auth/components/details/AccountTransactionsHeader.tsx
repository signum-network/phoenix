import { Account } from '@signumjs/core';
import { convertNQTStringToNumber } from '@signumjs/util';
import { toNumber } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Text, TextAlign } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../../core/theme/sizes';
import { core } from '../../../../core/translations';
import { amountToString } from '../../../../core/utils/numbers';
import { PriceInfoReduxState } from '../../../price-api/store/reducer';

interface Props {
  account: Account;
  priceApi?: PriceInfoReduxState;
}

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    marginBottom: Sizes.MEDIUM,
  }
};

export const AccountTransactionsHeader: React.FC<Props> = (props) => {
    const { account, priceApi } = props;
    const priceInBTC = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_btc;

    const totalBalance = convertNQTStringToNumber(account.balanceNQT);
    const totalBalanceBTC = priceApi && priceApi.priceInfo
        ? toNumber(priceInBTC) * totalBalance
        : 0;

    return (
        <View style={styles.view}>
          <Text textAlign={TextAlign.CENTER} color={Colors.WHITE} size={FontSizes.LARGE} bold bebasFont>
            {i18n.t(core.currency.SIGNA.value, { value: amountToString(totalBalance) })}
          </Text>
          {priceInBTC ? (
              <Text textAlign={TextAlign.CENTER} color={Colors.WHITE} bebasFont>
                {i18n.t(core.currency.BTC.value, { value: amountToString(totalBalanceBTC) })}
              </Text>
          ) : null}
        </View>
    );
  };
