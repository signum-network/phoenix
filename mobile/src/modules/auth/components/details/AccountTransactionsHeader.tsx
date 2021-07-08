import {Account} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import {toNumber} from 'lodash';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextAlign} from '../../../../core/components/base/Text';
import {i18n} from '../../../../core/i18n';
import {Colors} from '../../../../core/theme/colors';
import {defaultSideOffset, FontSizes, Sizes} from '../../../../core/theme/sizes';
import {core} from '../../../../core/translations';
import {amountToString} from '../../../../core/utils/numbers';
import {PriceInfoReduxState} from '../../../price-api/store/reducer';
import {AmountText} from '../../../../core/components/base/Amount';
import {getBalancesFromAccount} from '../../../../core/utils/balance/getBalancesFromAccount';

interface Props {
    account: Account;
    priceApi?: PriceInfoReduxState;
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: defaultSideOffset,
        marginBottom: Sizes.MEDIUM,
    },
    centered: {
        justifyContent: 'center'
    },
});

const subBalanceStyles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    }
});

const SubBalance: React.FC<{ amount: Amount, text: string }> = ({amount, text}) => (
    <View style={subBalanceStyles.root}>
        <View style={subBalanceStyles.content}>
            <Text color={Colors.GREY} size={FontSizes.SMALL}>{text}:</Text>
            <AmountText color={Colors.GREY} size={FontSizes.SMALL} amount={amount}/>
        </View>
    </View>
);

export const AccountTransactionsHeader: React.FC<Props> = (props) => {
    const {account, priceApi} = props;
    const priceInBTC = priceApi && priceApi.priceInfo && priceApi.priceInfo.price_btc;

    const balances = getBalancesFromAccount(account);

    // const totalBalance = Amount.fromPlanck(account.balanceNQT);
    const totalBalanceBTC = priceApi && priceApi.priceInfo
        ? toNumber(priceInBTC) * toNumber(balances.totalBalance.getSigna())
        : 0;

    return (
        <View style={styles.view}>
            <AmountText amount={balances.totalBalance} size={FontSizes.LARGE} style={styles.centered}/>
            <View>
                <SubBalance text='Available' amount={balances.availableBalance}/>
                <SubBalance text='Locked' amount={balances.lockedBalance}/>
                <SubBalance text='Committed' amount={balances.committedBalance}/>
            </View>
            {priceInBTC ? (
                <Text textAlign={TextAlign.CENTER} color={Colors.WHITE} bebasFont>
                    {i18n.t(core.currency.BTC.value, {value: amountToString(totalBalanceBTC)})}
                </Text>
            ) : null}
        </View>
    );
};
