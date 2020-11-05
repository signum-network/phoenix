import { Account } from '@burstjs/core';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Alert, Clipboard, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { actionIcons } from '../../../assets/icons';
import { Text } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { core } from '../../../core/translations';
import { PriceInfoReduxState } from '../../price-api/store/reducer';
import { RootStackParamList } from '../navigation/mainStack';
import { auth } from '../translations';

type TransactionDetailsRouteProps = RouteProp<RootStackParamList, 'TransactionDetails'>;
type TransactionDetailsNavProp = StackNavigationProp<RootStackParamList, 'TransactionDetails'>;

interface Props extends InjectedReduxProps {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
  route: TransactionDetailsRouteProps;
  navigation: TransactionDetailsNavProp;
}

const styles = StyleSheet.create({
  copyIcon: {
    margin: 5,
    width: 25,
    height: 25
  },
  listItem: {
    paddingVertical: 10
  },
  list: {
  }
});

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.listItem}>
    <Text color={Colors.WHITE} bold bebasFont>{item.key}</Text>
    <Text color={Colors.WHITE}>{item.value.toString()}</Text>
  </TouchableOpacity>
);

class TransactionDetails extends React.PureComponent<Props> {

  copyItem = (val) => {
    Clipboard.setString(val);
    Alert.alert(i18n.t(auth.transactionDetails.copiedSuccessfully));
  }

  renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        // tslint:disable-next-line: jsx-no-lambda
        onPress={() => this.copyItem(item.value)}
      />
    );
  }

  render () {
    const transaction = this.props.route.params.transaction;
    const data = Object.keys(transaction)
      .filter((key) => {
        return typeof transaction[key] !== 'object'
      })
      .map((key) => {
        return {
          key,
          value: transaction[key].toString()
        };
      });

    return (
      <Screen style={{ backgroundColor: Colors.BLUE_DARKER }}>
        <FullHeightView withoutPaddings>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10 }}
              onPress={this.props.navigation.goBack}>
              <Image source={actionIcons.chevronLeft} style={{ width: 30, height: 30 }} />
              <Text color={Colors.WHITE}>{i18n.t(core.actions.back)}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
              <HeaderTitle>
                {i18n.t(auth.transactionDetails.headerTitle)}
              </HeaderTitle>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <FlatList
              data={data}
              renderItem={this.renderItem}
            />
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    accounts: state.auth.accounts,
    priceApi: state.priceApi
  };
}

export const TransactionDetailsScreen = connect(mapStateToProps)(TransactionDetails);
