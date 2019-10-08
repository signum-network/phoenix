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
import { core } from '../../../core/translations';
import { HomeStackedAreaChart } from '../../home/components/HomeStackedAreaChart';
import { selectCurrency } from '../../price-api/store/actions';
import { PriceInfoReduxState, PriceType, PriceTypeStrings } from '../../price-api/store/reducer';
import { AccountsList } from '../components/AccountsList';
import { AccountsListHeader } from '../components/AccountsListHeader';
import { EnterPasscodeModal } from '../components/passcode/EnterPasscodeModal';
import { TermsModal } from '../components/terms/TermsModal';
import { hydrateAccount, removeAccount, setAgreeToTerms } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { shouldEnterPIN } from '../store/utils';

interface CustomProps extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState,
  priceApi: PriceInfoReduxState
}

type TProps = NavigationInjectedProps & CustomProps;

interface State {
  isPINModalVisible: boolean,
  isTermsModalVisible: boolean,
  selectedCurrency: PriceTypeStrings;
}

const priceTypes = [PriceType.BURST, PriceType.BTC, PriceType.USD];

class Home extends React.PureComponent<TProps, State> {

  _checkPinExpiryInterval: number | undefined;

  state = {
    isPINModalVisible: false,
    isTermsModalVisible: this.props.auth.agreeToTerms,
    selectedCurrency: priceTypes[0]
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
    this.selectCurrency = this.selectCurrency.bind(this);

    this.props.navigation.setParams({
      handleAddAccountPress: this.handleAddAccountPress
    });

    this._checkPinExpiryInterval = setInterval(() => {
      const { passcodeTime } = this.props.app.appSettings;
      const { passcodeEnteredTime } = this.props.auth;
      if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
        this.setPINModalVisible(true);
      }
    }, 1000);

    this.updateAllAccounts();
  }

  updateAllAccounts = () => {
    this.props.auth.accounts.forEach((account) => {
      this.props.dispatch(hydrateAccount(account));
    });
  }

  setPINModalVisible = (isPINModalVisible: boolean) => {
    this.setState({ isPINModalVisible });
  }

  setTermsModalVisible = (isTermsModalVisible: boolean) => {
    this.setState({ isTermsModalVisible });
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
    this.setPINModalVisible(false);
  }

  handleTermsAgreed = () => {
    this.props.dispatch(setAgreeToTerms(true));
    this.setTermsModalVisible(false);
  }

  handleAddAccount = () => {
    this.props.navigation.navigate(routes.addAccount);
  }

  handlePINCancel = () => {
    this.setPINModalVisible(false);
  }

  handleDelete = (account: Account) => {
    this.props.dispatch(removeAccount(account));
  }

  componentWillUnmount () {
    clearInterval(this._checkPinExpiryInterval as number);
  }

  selectCurrency () {
    this.props.dispatch(
      selectCurrency(priceTypes[priceTypes.findIndex(
        (val) => val === this.props.priceApi.selectedCurrency
      ) + 1] || priceTypes[0]
      )
    );
  }

  render () {
    const accounts: Account[] = this.props.auth.accounts || [];
    const priceApi = this.props.priceApi;

    return (
      <Screen>
        <FullHeightView withoutPaddings>
          <AccountsListHeader priceApi={priceApi} accounts={accounts} />
          <View>
            {accounts.length && <HomeStackedAreaChart
              priceApi={priceApi}
              accounts={accounts}
              priceTypes={priceTypes}
              selectCurrency={this.selectCurrency}
            /> || null}

            <AccountsList
              accounts={accounts}
              onAccountPress={this.handleAccountPress}
              onAddAccountPress={this.handleAddAccountPress}
              onDelete={this.handleDelete}
              priceApi={this.props.priceApi}
            />
            <EnterPasscodeModal
              visible={this.state.isPINModalVisible}
              onSuccess={this.handlePINEntered}
              onCancel={this.handlePINCancel}
            />
            <TermsModal
              visible={this.state.isTermsModalVisible}
              onAgree={this.handleTermsAgreed}
            />

            {!accounts.length &&
              <Button
                onPress={this.handleChangeAccount}
                title={i18n.t(core.screens.home.accountsList)}
              />}
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
    priceApi: state.priceApi
  };
}

export const HomeScreen = connect(mapStateToProps)(withNavigation(Home));
