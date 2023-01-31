import {Account} from '@signumjs/core';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {actionIcons} from '../../../assets/icons';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {Colors} from '../../../core/theme/colors';
import {PriceInfoReduxState} from '../../price-api/store/reducer';
import {RootStackParamList} from '../navigation/mainStack';
import {auth} from '../translations';
import {TransactionDetails} from '../components/details/transactions/TransactionDetails';
import {ApplicationState} from '../../../core/store/initialState';
import {connect} from 'react-redux';

type TransactionDetailsRouteProps = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;
type TransactionDetailsNavProp = StackNavigationProp<
  RootStackParamList,
  'TransactionDetails'
>;

interface Props {
  priceApi: PriceInfoReduxState;
  route: TransactionDetailsRouteProps;
  navigation: TransactionDetailsNavProp;
}

export const TransactionDetailsPage = ({}: Props) => {
  const navigation = useNavigation();
  const route = useRoute<TransactionDetailsRouteProps>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Screen style={{backgroundColor: Colors.BLUE}}>
      <FullHeightView withoutPaddings>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              left: 10,
              top: 10,
            }}
            onPress={goBack}>
            <Image
              source={actionIcons.chevronLeft}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center', margin: 10}}>
            <HeaderTitle>
              {i18n.t(auth.transactionDetails.headerTitle)}
            </HeaderTitle>
          </View>
        </View>
        <View>
          <TransactionDetails transaction={route.params.transaction} />
        </View>
      </FullHeightView>
    </Screen>
  );
};

function mapStateToProps(state: ApplicationState) {
  return {
    priceApi: state.priceApi,
  };
}

export const TransactionDetailsScreen = connect(mapStateToProps)(
  TransactionDetailsPage,
);
