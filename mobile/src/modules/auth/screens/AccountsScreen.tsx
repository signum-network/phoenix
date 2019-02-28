import { Account } from '@burstjs/core';
import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { PlusHeaderButton } from '../../../core/components/header/PlusHeaderButton';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { AccountsList } from '../components/AccountsList';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  auth: AuthReduxState,
}

type TProps = NavigationInjectedProps & Props;

class Accounts extends React.PureComponent<TProps> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: <HeaderTitle>{i18n.t(auth.accounts.title)}</HeaderTitle>,
      headerRight: <PlusHeaderButton onPress={params.handleAddAccountPress} />
    };
  }

  componentDidMount () {
    this.props.navigation.setParams({
      handleAddAccountPress: this.handleAddAccountPress
    });
  }

  handleAccountPress = (_account: Account) => {
    // TODO: do smthng
  }

  handleAddAccountPress = () => {
    // TODO: check or set up global PIN here before navigating to the next screen
    this.props.navigation.navigate(routes.addAccount);
  }

  render () {
    const accounts: Account[] = this.props.auth.accounts || [];

    return (
      <Screen>
        <FullHeightView withoutPaddings>
          <AccountsList
            accounts={accounts}
            onAccountPress={this.handleAccountPress}
            onAddAccountPress={this.handleAddAccountPress}
          />
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const AccountsScreen = connect(mapStateToProps)(withNavigation(Accounts));
