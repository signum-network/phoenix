import {Account, Transaction, Address} from '@signumjs/core';
import React, { useEffect } from 'react';
import {Alert, Clipboard, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actionIcons} from '../../../assets/icons';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {Colors} from '../../../core/theme/colors';
import {PriceInfoReduxState} from '../../price-api/store/reducer';
import {AccountDetailsList} from '../components/details/AccountDetailsList';
import {updateAccountTransactions} from '../store/actions';
import {auth} from '../translations';
import {routes} from '../../../core/navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/mainStack';
import {Text} from '../../../core/components/base/Text';
import {core} from '../../../core/translations';
import {StackNavigationProp} from '@react-navigation/stack';
import {shortenRSAddress} from '../../../core/utils/account';
import {selectAccounts} from '../store/selectors';

type AccountDetailsRouteProps = RouteProp<RootStackParamList, 'AccountDetails'>;
type AccountDetailsNavProp = StackNavigationProp<RootStackParamList, 'AccountDetails'>;

interface Props {
    accounts: Account[];
    priceApi: PriceInfoReduxState;
    route: AccountDetailsRouteProps;
    navigation: AccountDetailsNavProp;
}

const styles = StyleSheet.create({
    copyIcon: {
        margin: 5,
        width: 25,
        height: 25,
    }
});

export const AccountDetailsScreen: React.FC<Props> = (props) => {

    const dispatch = useDispatch();
    const accounts = useSelector(selectAccounts);
    const {route, priceApi, navigation} = props;

    useEffect(() => {
        const account = getAccount();
        if (account) {
            dispatch(updateAccountTransactions(account));
        }
    }, []);

    const getAccount = () => {
        const accountId = route.params.account;
        return accounts.find((a) => a.account === accountId);
    };

    const handleTransactionPress = (transaction: Transaction) => {
        // tslint:disable-next-line
        navigation.navigate(routes.transactionDetails, {transaction});
    };

    const handleCopy = () => {
        if (!route.params.account) {
            return;
        }

        const address = Address.fromNumericId(route.params.account);
        Clipboard.setString(address.getReedSolomonAddress());
        Alert.alert(i18n.t(auth.accountDetails.copiedSuccessfully));
    };

    const account = getAccount();
    if (!account) {
        return null;
    }

    return (
        <Screen>
            <FullHeightView withoutPaddings>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', position: 'absolute', zIndex: 3, left: 10, top: 10}}
                        onPress={navigation.goBack}>
                        <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                        <HeaderTitle>
                            {account.accountRS || 'Account Details'}
                        </HeaderTitle>
                    </View>
                    <TouchableOpacity onPress={handleCopy}>
                        <Image style={styles.copyIcon} source={actionIcons.copy}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <AccountDetailsList
                        account={account}
                        onTransactionPress={handleTransactionPress}
                        priceApi={priceApi}
                    />
                </View>
            </FullHeightView>
        </Screen>
    );
};
