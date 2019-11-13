import { Account, Transaction } from '@burstjs/core';
import React from 'react';
import { View } from 'react-native';
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

interface Props extends InjectedReduxProps {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
}

type TProps = NavigationInjectedProps & Props;

class AccountDetails extends React.PureComponent<TProps> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: (
        <HeaderTitle>
          {params.accountRS}
        </HeaderTitle>
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
