import {Account} from '@signumjs/core';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {actionIcons} from '../../../assets/icons';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {Colors} from '../../../core/theme/colors';
import {PriceInfoReduxState} from '../../price-api/store/reducer';
import {RootStackParamList} from '../navigation/mainStack';
import {auth} from '../translations';
import {TransactionDetails} from '../components/details/transactions/TransactionDetails';

type TransactionDetailsRouteProps = RouteProp<RootStackParamList, 'TransactionDetails'>;
type TransactionDetailsNavProp = StackNavigationProp<RootStackParamList, 'TransactionDetails'>;

interface Props extends InjectedReduxProps {
    accounts: Account[];
    priceApi: PriceInfoReduxState;
    route: TransactionDetailsRouteProps;
    navigation: TransactionDetailsNavProp;
}

export const TransactionDetailsScreen: React.FC<Props> = () => {
    const navigation = useNavigation();
    const route = useRoute<TransactionDetailsRouteProps>();

    const goBack = () => {
        // @ts-ignore
        navigation.goBack();
    };

    return (
        <Screen style={{backgroundColor: Colors.BLUE}}>
            <FullHeightView withoutPaddings>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10}}
                        onPress={goBack}>
                        <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                        <HeaderTitle>
                            {i18n.t(auth.transactionDetails.headerTitle)}
                        </HeaderTitle>
                    </View>
                </View>
                <View>
                    <TransactionDetails transaction={route.params.transaction}/>
                </View>
            </FullHeightView>
        </Screen>
    );
};
