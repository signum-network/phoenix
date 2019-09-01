import { Account } from '@burstjs/core';
import React from 'react';
import { Button, View } from 'react-native';
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
import { Colors } from '../../../core/theme/colors';
import { core } from '../../../core/translations';
import { PriceInfoReduxState } from '../../cmc/store/reducer';
import { AccountsList } from '../components/AccountsList';
import { EnterPasscodeModal } from '../components/passcode/EnterPasscodeModal';
import { hydrateAccount, removeAccount } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { shouldEnterPIN } from '../store/utils';

interface CustomProps extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState,
  cmc: PriceInfoReduxState
}

type TProps = NavigationInjectedProps & CustomProps;

interface State {
  isPINModalVisible: boolean
}

class Home extends React.PureComponent<TProps, State> {

  _checkPinExpiryInterval: number | undefined;

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

    this._checkPinExpiryInterval = setInterval(() => {
      const { passcodeTime } = this.props.app.appSettings;
      const { passcodeEnteredTime } = this.props.auth;
      if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
        this.setModalVisible(true);
      }
    }, 1000);

    this.updateAllAccounts();
  }

  updateAllAccounts = () => {
    this.props.auth.accounts.forEach((account) => {
      this.props.dispatch(hydrateAccount(account));
    });
  }

  setModalVisible = (isPINModalVisible: boolean) => {
    this.setState({ isPINModalVisible });
  }

  handleAccountPress = (account: Account) => {
    this.props.navigation.navigate(routes.accountDetails, {
      accountRS: account.accountRS
    });
  }

  handleAddAccountPress = async () => {
    this.handleAddAccount();
  }

  handlePINEntered = () => {
    this.setModalVisible(false);
  }

  handleAddAccount = () => {
    this.props.navigation.navigate(routes.addAccount);
  }

  handlePINCancel = () => {
    this.setModalVisible(false);
  }

  handleDelete = (account: Account) => {
    this.props.dispatch(removeAccount(account));
  }

  componentWillUnmount () {
    clearInterval(this._checkPinExpiryInterval as number);
  }

  render () {
    const accounts: Account[] = this.props.auth.accounts || [];

    // TODO: remove when all screens will be with blue background
    return (
      <Screen style={{ backgroundColor: Colors.BLUE_DARKER }}>
        <FullHeightView withoutPaddings>
          <View>
            <AccountsList
              accounts={accounts}
              onAccountPress={this.handleAccountPress}
              onAddAccountPress={this.handleAddAccountPress}
              onDelete={this.handleDelete}
              cmc={this.props.cmc}
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
    auth: state.auth,
    cmc: state.cmc
  };
}

export const HomeScreen = connect(mapStateToProps)(withNavigation(Home));
