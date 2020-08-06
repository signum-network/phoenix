import { Account, Transaction } from '@burstjs/core';
import React from 'react';
import { Alert, Clipboard, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actionIcons } from '../../../assets/icons';
import { Button as BButton, ButtonSizes, ButtonThemes } from '../../../core/components/base/Button';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { isIOS } from '../../../core/utils/platform';
import { PriceInfoReduxState } from '../../price-api/store/reducer';
import { AccountDetailsList } from '../components/details/AccountDetailsList';
import { updateAccountTransactions } from '../store/actions';
import { auth } from '../translations';
import { routes } from '../../../core/navigation/routes';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/mainStack';
import { Text } from '../../../core/components/base/Text';
import { core } from '../../../core/translations';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontSizes } from '../../../core/theme/sizes';

type AccountDetailsRouteProps = RouteProp<RootStackParamList, 'AccountDetails'>;
type AccountDetailsNavProp = StackNavigationProp<RootStackParamList, 'AccountDetails'>;

interface Props extends InjectedReduxProps {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
  route: AccountDetailsRouteProps;
  navigation: AccountDetailsNavProp;
}

const styles = StyleSheet.create({
  copyIcon: {
    margin: 5,
    width: 25,
    height: 25
  }
});

class AccountDetails extends React.PureComponent<Props> {

  constructor (props) {
    super(props);
    this.updateTransactions();
  }

  getAccount = () => {
    const accountRS = this.props.route.params.accountRS;
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
    this.props.navigation.navigate(routes.transactionDetails, {
      transaction
    })
  }

  handleCopy = () => {
    const { route } = this.props;
    if (route.params.accountRS) {
      Clipboard.setString(route.params.accountRS);
      Alert.alert(i18n.t(auth.accountDetails.copiedSuccessfully));
    }
  }

  render () {
    const { priceApi, route } = this.props;
    const account = this.getAccount();
    if (!account) {
      return null;
    }

    return (
      <Screen style={{ backgroundColor: Colors.BLUE_DARKER }}>
        <FullHeightView withoutPaddings>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', zIndex: 3, left: 10, top: 10 }}
              onPress={this.props.navigation.goBack}>
              <Image source={actionIcons.chevronLeft} style={{width:30, height:30}} />
              <Text color={Colors.WHITE}>{i18n.t(core.actions.back)}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
              <HeaderTitle>
                {route.params.accountRS || 'Account Details'}
              </HeaderTitle>
            </View>
            <View style={{ position: 'absolute',right: 10, top: 0 }}>
              {isIOS ?
                (
                  <TouchableOpacity onPress={this.handleCopy}>
                    <Image style={styles.copyIcon} source={actionIcons.copy} />
                  </TouchableOpacity>
                ) :
                (
                  <BButton theme={ButtonThemes.ACCENT} size={ButtonSizes.SMALL} onPress={this.handleCopy}>
                    <Image style={styles.copyIcon} source={actionIcons.copy} />
                  </BButton>
                )
              }
            </View>
          </View>
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

export const AccountDetailsScreen = connect(mapStateToProps)(AccountDetails);
