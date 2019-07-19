import { Account } from '@burstjs/core';
import React from 'react';
import { Text } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { AccountDetailsHeaderTitle } from '../../../core/components/header/AccountDetailsHeaderTitle';
import { BackHeaderButton } from '../../../core/components/header/BackHeaderButton';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  account: Account
}

type TProps = NavigationInjectedProps & Props;

class AccountDetails extends React.PureComponent<TProps> {
  state = {
  };

  static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const { params = {} } = navigation.state;

    return {
      headerLeft: <BackHeaderButton onPress={params.handleBackPress} />,
      headerTitle: (
        <AccountDetailsHeaderTitle>
          <Text>{i18n.t(auth.accounts.title)}</Text>
        </AccountDetailsHeaderTitle>
      )
    };
  }

  componentDidMount () {
    this.props.navigation.setParams({
      handleBackPress: this.handleBackPress
    });
  }

  handleBackPress = () => {
    this.props.navigation.navigate(routes.home);
  }

  render () {
    const account: Account = this.props.navigation.getParam('account');

    return (
      <Screen>
        <FullHeightView withoutPaddings>
          <Text>{account.accountRS}</Text>
          <Text>{account.balanceNQT}</Text>
          <Text>{account.transactions}</Text>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (_state: ApplicationState) {
  return {
  };
}

export const AccountDetailsScreen = connect(mapStateToProps)(withNavigation(AccountDetails));
