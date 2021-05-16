import { Account } from '@burstjs/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { loadHistoricalPriceApiData, selectCurrency } from '../../price-api/store/actions';
import { PriceInfoReduxState, PriceType, PriceTypeStrings } from '../../price-api/store/reducer';
import { AccountsList } from '../components/AccountsList';
import { AccountsListHeader } from '../components/AccountsListHeader';
import { EnterPasscodeModal } from '../components/passcode/EnterPasscodeModal';
import { TermsModal } from '../components/terms/TermsModal';
import { RootStackParamList } from '../navigation/mainStack';
import { hydrateAccount, removeAccount, resetAuthState, setAgreeToTerms } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { shouldEnterPIN } from '../store/utils';

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface IProps extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState,
  priceApi: PriceInfoReduxState,
  navigation: HomeNavProp
}

interface State {
  isPINModalVisible: boolean,
  isTermsModalVisible: boolean,
  selectedCurrency: PriceTypeStrings;
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    top: 'auto',
    height: '100%',
    flex: 1
  },
  addAccount: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    paddingLeft: 20,
    paddingRight: 20
  },
  addAccountText: {
    marginBottom: 20
  }
});

const priceTypes = [PriceType.BURST, PriceType.BTC, PriceType.USD];

class Home extends React.PureComponent<IProps, State> {

  _checkPinExpiryInterval?: any;

  state = {
    isPINModalVisible: false,
    isTermsModalVisible: false,
    selectedCurrency: priceTypes[0]
  };

  constructor (props: IProps) {
    super(props);
    setTimeout(() => {
      this.updateAllAccounts();
    }, 500);

    // this.props.navigation.setParams({
    //   handleAddAccountPress: this.handleAddAccountPress
    // });
  }

  handleChangeAccount = () => {
    this.props.navigation.navigate(routes.accounts);
  }

  componentDidUpdate () {
    if (this._checkPinExpiryInterval) {
      clearInterval(this._checkPinExpiryInterval);
    }
    const checkSessionExpiry = () => {
      const { passcodeTime } = this.props.app.appSettings;
      const { passcodeEnteredTime } = this.props.auth;
      if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
        this.setPINModalVisible(true);
      }
      this.checkTermsModal();
    };
    checkSessionExpiry();
    this._checkPinExpiryInterval = setInterval(checkSessionExpiry, 1000);

  }

  updateAllAccounts = () => {
    try {
      return Promise.all(this.props.auth.accounts.map((account) => {
        this.props.dispatch(hydrateAccount(account));
      }));
    // tslint:disable-next-line: no-empty
    } catch (e) { }
  }

  setPINModalVisible = (isPINModalVisible: boolean) => {
    this.setState({ isPINModalVisible });
  }

  checkTermsModal = () => {
    this.setTermsModalVisible(!this.props.auth.agreeToTerms);
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

  handleReset = () => {
    this.props.dispatch(resetAuthState());
    this.props.navigation.navigate(routes.home);
  }

  handleAccountsListRefresh = () => {
    this.props.dispatch(loadHistoricalPriceApiData());
    return this.updateAllAccounts();
  }

  componentWillUnmount () {
    if (this._checkPinExpiryInterval) {
      clearInterval(this._checkPinExpiryInterval);
    }
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
    const shouldShowChart = accounts.length && priceApi.priceInfo && priceApi.historicalPriceInfo;
    const { isTermsModalVisible } = this.state;
    return (
      <Screen>
        <FullHeightView withoutPaddings>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
              <HeaderTitle>
                {i18n.t(core.screens.home.title)}
              </HeaderTitle>
            </View>
            <View style={{ position: 'absolute',right: 10, top: 0 }}>
              <PlusHeaderButton onPress={this.handleAddAccountPress} />
            </View>
          </View>
          <AccountsListHeader priceApi={priceApi} accounts={accounts} />
          <View style={styles.wrapper}>
            {shouldShowChart && <HomeStackedAreaChart
              priceApi={priceApi}
              accounts={accounts}
              priceTypes={priceTypes}
              selectCurrency={this.selectCurrency.bind(this)}
            /> || null}

            <AccountsList
              accounts={accounts}
              onAccountPress={this.handleAccountPress}
              onAddAccountPress={this.handleAddAccountPress}
              onDelete={this.handleDelete}
              priceApi={this.props.priceApi}
              onRefresh={this.handleAccountsListRefresh}
            />
            <EnterPasscodeModal
              visible={this.state.isPINModalVisible}
              onSuccess={this.handlePINEntered}
              onCancel={this.handlePINCancel}
              onReset={this.handleReset}
            />
            {isTermsModalVisible && !this.state.isPINModalVisible && <TermsModal
              visible={isTermsModalVisible}
              onAgree={this.handleTermsAgreed}
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

export const HomeScreen = connect(mapStateToProps)(Home);
