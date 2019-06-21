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
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { AccountsList } from '../components/AccountsList';
import { EnterPasscodeModal } from '../components/passcode/EnterPasscodeModal';
import { AuthReduxState } from '../store/reducer';
import { shouldEnterPIN } from '../store/utils';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState,
}

type TProps = NavigationInjectedProps & Props;

interface State {
  isPINModalVisible: boolean
}

class Accounts extends React.PureComponent<TProps, State> {
  state = {
    isPINModalVisible: false
  };

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

  setModalVisible = (isPINModalVisible: boolean) => {
    this.setState({ isPINModalVisible });
  }

  handleAccountPress = (_account: Account) => {
    this.props.navigation.navigate(routes.accountDetails, {
      account: _account
    });
  }

  handleAddAccountPress = async () => {
    const { passcodeEnteredTime } = this.props.auth;
    const { passcodeTime } = this.props.app.appSettings;

    if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
      this.setModalVisible(true);
    } else {
      this.handleAddAccount();
    }
  }

  handlePINEntered = () => {
    this.setModalVisible(false);
    this.handleAddAccount();
  }

  handleAddAccount = () => {
    this.props.navigation.navigate(routes.addAccount);
  }

  handlePINCancel = () => {
    this.setModalVisible(false);
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
          <EnterPasscodeModal
            visible={this.state.isPINModalVisible}
            onSuccess={this.handlePINEntered}
            onCancel={this.handlePINCancel}
          />
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    app: state.app,
    auth: state.auth
  };
}

export const AccountsScreen = connect(mapStateToProps)(withNavigation(Accounts));
