import React, { Props } from 'react';

import { Button, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { AuthReduxState } from '../store/reducer';

import { Text } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { core } from '../../../core/translations';
import { AccountsList } from '../components/AccountsList';
import { EnterPasscodeModal } from '../components/passcode/EnterPasscodeModal';
import { Account } from '@burstjs/core';
import { PlusHeaderButton } from '../../../core/components/header/PlusHeaderButton';
import { AppReduxState } from '../../../core/store/app/reducer';
import { shouldEnterPIN } from '../store/utils';

interface Props extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState,
}

type TProps = NavigationInjectedProps & Props;

interface State {
  isPINModalVisible: boolean
}

class Home extends React.PureComponent<TProps, State> {

  state = {
    isPINModalVisible: false
  };

  static navigationOptions = ({ navigation }: NavigationInjectedProps) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: <HeaderTitle>{i18n.t(core.screens.home.title)}</HeaderTitle>,
      headerRight: <PlusHeaderButton onPress={params.handleAddAccountPress} />
    };
  }

  handleChangeAccount = () => {
    this.props.navigation.navigate(routes.accounts);
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
    // TODO: do smthng
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
    const selectedAccount = this.props.auth.accounts.length &&
      this.props.auth.accounts[0] || { accountRS: '', balanceNQT: '' };
    return (
      <Screen>
        <FullHeightView>
          <View>
            <Text>
              {selectedAccount.accountRS}
            </Text>
            <Text>
              {selectedAccount.balanceNQT || '0'} BURST
            </Text>
            <Text>
              {selectedAccount.balanceNQT || '0'} USD
            </Text>
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
            <Button onPress={this.handleChangeAccount} title={i18n.t(core.screens.home.accountsList)} />
          </View>
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

export const HomeScreen = connect(mapStateToProps)(withNavigation(Home));
