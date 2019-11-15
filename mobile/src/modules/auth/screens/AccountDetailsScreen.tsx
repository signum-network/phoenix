import { Account, Transaction } from '@burstjs/core';
import React from 'react';
import { View, Image, StyleSheet, Alert, Clipboard } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { PriceInfoReduxState } from '../../price-api/store/reducer';
import { AccountDetailsList } from '../components/details/AccountDetailsList';
import { updateAccountTransactions } from '../store/actions';
import { actionIcons } from '../../../assets/icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { i18n } from '../../../core/i18n';
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
  }
});

class AccountDetails extends React.PureComponent<TProps> {

  static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const { params = {} } = navigation.state;

    const handleCopy = () => {
      Clipboard.setString(params.accountRS);
      Alert.alert(i18n.t(auth.accountDetails.copiedSuccessfully));
    };

    return {
      headerTitle: (
        <HeaderTitle>
          {params.accountRS}
        </HeaderTitle>
      ),
      headerRight: (
        <TouchableOpacity onPress={handleCopy}>
          <Image style={styles.copyIcon} source={actionIcons.copy} />
        </TouchableOpacity>
      )
    };
  }

  componentDidMount () {
    this.updateTransactions();
  }

  getAccount = () => {
    const accountRS = this.props.navigation.getParam('accountRS');
    return this.props.accounts.find((acc) => acc.accountRS === accountRS);
  }

  updateTransactions = () => {
    const account = this.getAccount();
    if (account) {
      this.props.dispatch(updateAccountTransactions(account));
    }
  }

  handleTransactionPress = (transaction: Transaction) => {
    // TODO: do something?
    // tslint:disable-next-line
    console.log(transaction);
  }

  render () {
    const { priceApi } = this.props;
    const account = this.getAccount();
    if (!account) {
      return null;
    }

    return (
      <Screen style={{ backgroundColor: Colors.BLUE_DARKER }}>
        <FullHeightView withoutPaddings>
          <View>
            <AccountDetailsList
                account={account}
                onTransactionPress={this.handleTransactionPress}
                priceApi={priceApi}
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

export const AccountDetailsScreen = connect(mapStateToProps)(withNavigation(AccountDetails));
