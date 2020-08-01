import { Account } from '@burstjs/core';
import React from 'react';
import { Alert, Clipboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { PriceInfoReduxState } from '../../price-api/store/reducer';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
}

type TProps = NavigationInjectedProps & Props;

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
    <Text color={Colors.WHITE} bebasFont>{item.key}</Text>
    <Text color={Colors.WHITE} bold>{item.value.toString()}</Text>
  </TouchableOpacity>
);

class TransactionDetails extends React.PureComponent<TProps> {

  static navigationOptions = () => {
    return {
      headerTitle: (
        <HeaderTitle>
          {i18n.t(auth.transactionDetails.headerTitle)}
        </HeaderTitle>
      )
    };
  }

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
    const transaction = this.props.navigation.getParam('transaction');
    const data = Object.keys(transaction).map((key) => {
      return {
        key,
        value: transaction[key].toString()
      };
    });

    return (
      <Screen style={{ backgroundColor: Colors.BLUE_DARKER }}>
        <FullHeightView>
          <View>
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

export const TransactionDetailsScreen = connect(mapStateToProps)(withNavigation(TransactionDetails));
