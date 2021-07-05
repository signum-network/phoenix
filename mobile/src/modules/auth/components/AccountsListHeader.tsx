import {Account} from '@signumjs/core';
import {convertNQTStringToNumber, Amount} from '@signumjs/util';
import {isEmpty, toNumber} from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {Text} from '../../../core/components/base/Text';
import {i18n} from '../../../core/i18n';
import {Colors} from '../../../core/theme/colors';
import {defaultSideOffset, FontSizes, Sizes} from '../../../core/theme/sizes';
import {core} from '../../../core/translations';
import {amountToString} from '../../../core/utils/numbers';
import {PriceInfoReduxState, PriceType} from '../../price-api/store/reducer';
import {AmountText} from '../../../core/components/base/Amount';

interface Props {
    accounts: Account[];
    priceApi?: PriceInfoReduxState;
}

const styles: any = {
    view: {
        paddingHorizontal: defaultSideOffset,
        marginBottom: Sizes.MEDIUM,
    }
};

export const AccountsListHeader: React.FC<Props> = (props) => {
    const {accounts, priceApi} = props;
    const hasAccounts = !isEmpty(accounts);
    const priceInBTC = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_btc;
    const priceInUSD = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_usd;

    const totalBalance = accounts.reduce((prev, curr) => {
        return prev.add(Amount.fromPlanck(curr.balanceNQT));
    }, Amount.Zero());

    const totalSigna = toNumber(totalBalance.getSigna());
    const totalBalanceBTC = priceInBTC
        ? toNumber(priceInBTC) * totalSigna
        : 0;
    const totalBalanceUSD = priceInBTC
        ? toNumber(priceInUSD) * totalSigna
        : 0;

    return (hasAccounts
            ? <View style={styles.view}>
                <AmountText amount={totalBalance} size={FontSizes.LARGE} color={Colors.WHITE} />
                <Text color={Colors.WHITE} bebasFont>
                    {priceApi && priceApi.selectedCurrency === PriceType.USD ?
                        i18n.t(core.currency.USD.value, {value: totalBalanceUSD.toFixed(2)}) :
                        i18n.t(core.currency.BTC.value, {value: amountToString(totalBalanceBTC)})}
                </Text>
            </View>
            : null
    );

};

