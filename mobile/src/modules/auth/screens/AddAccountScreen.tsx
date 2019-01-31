import { Account } from '@burstjs/core';
import React from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from '../../../core/components/base/Button';
import { Input } from '../../../core/components/base/Input';
import { SwitchItem } from '../../../core/components/base/SwitchItem';
import { Text } from '../../../core/components/base/Text';
import { InjectedReduxProps } from '../../../core/interfaces';
import { Screen } from '../../../core/layout/Screen';
import { i18n } from '../../../core/localization/i18n';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors, ColorThemeNames } from '../../../core/theme/colors';
import { defaultSideOffset, ESpaces, SizeNames } from '../../../core/theme/sizes';
import { createActiveAccount, createOfflineAccount } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';
import { BurstUtil } from '@burstjs/crypto';

interface Props extends InjectedReduxProps {
  auth: AuthReduxState,
}
type TProps = NavigationInjectedProps & Props;

interface State {
  isActive: boolean;
  passphrase: string;
  account: Account | null;
  pin: string;
  address: string;
  error: string;
}

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: defaultSideOffset
  },
  addAccountView: {
    paddingVertical: ESpaces.s
  }
});

class AddAccount extends React.PureComponent<TProps, State> {

  static navigationOptions = {
    title: i18n.t(auth.addAccount.title)
  };
  state: State = {
    address: 'BURST-',
    isActive: false,
    passphrase: '',
    account: null,
    pin: '',
    error: ''
  };

  accountCreatingError = (error: Error) => {
    this.setState({
      error: error.message
    });
  }

  addAccount = () => {
    if (this.state.isActive) {
      this.addActiveAccount();
    } else {
      this.addOfflineAccount();
    }
  }

  addActiveAccount = async () => {
    const { passphrase, pin } = this.state;
    try {
      await this.props.dispatch(createActiveAccount({ phrase: passphrase.split(' '), pin }));
      this.props.navigation.navigate(routes.accounts);
    } catch (error) {
      this.accountCreatingError(error);
    }
  }

  addOfflineAccount = async () => {
    const { address } = this.state;
    try {
      await this.props.dispatch(createOfflineAccount(address));
      this.props.navigation.navigate(routes.accounts);
    } catch (error) {
      this.accountCreatingError(error);
    }
  }

  handleChangePin = (pin: string) => {
    this.setState({ pin });
  }

  handleChangeAccountType = (isActive: boolean) => {
    this.setState({ isActive, error: '' });
  }

  handleChangePassphrase = (passphrase: string) => {
    this.setState({ passphrase, error: '' });
  }

  handleChangeAddress = (address: string) => {
    this.setState({ address });
  }

  renderActiveBlock = () => {
    const { passphrase, pin, error } = this.state;
    // TODO: add passphrase validation
    const isButtonDisabled = pin.length === 0 && passphrase.length === 0;

    return (
      <View>
        <Text paddingTop={ESpaces.xs}>{i18n.t(auth.models.account.passphrase)}</Text>
        <Input secureTextEntry={true} value={passphrase} onChangeText={this.handleChangePassphrase} />
        <Text paddingTop={ESpaces.xs}>{i18n.t(auth.models.account.pin)}</Text>
        <Input
          keyboardType={'numeric'}
          secureTextEntry={true}
          value={pin}
          onChangeText={this.handleChangePin}
        />
        <Button disabled={isButtonDisabled} onPress={this.addAccount}>{i18n.t(auth.addAccount.addAccount)}</Button>
        <Text textAlign={'center'} color={Colors.pink}>{error}</Text>
      </View>
    );
  }

  renderOfflineBlock = () => {
    const { address, error } = this.state;
    const isAddressCorrect = BurstUtil.isValid(address);

    return (
      <View>
        <Text paddingTop={ESpaces.xs}>{i18n.t(auth.models.account.address)}</Text>
        <Input value={address} onChangeText={this.handleChangeAddress} />
        <Text textAlign={'center'} color={Colors.pink}>{error}</Text>
        <Button disabled={!isAddressCorrect} onPress={this.addAccount}>{i18n.t(auth.addAccount.addAccount)}</Button>
      </View>
    );
  }

  render () {
    const { isActive } = this.state;
    const hint = i18n.t(isActive
      ? auth.addAccount.activeAccountHint
      : auth.addAccount.passiveAccountHint);

    return (
      <Screen>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.addAccountView}>
              <SwitchItem
                onChange={this.handleChangeAccountType}
                text={i18n.t(auth.addAccount.activeAccount)}
                value={this.state.isActive}
              />
              <Text sizeName={SizeNames.sm} colorTheme={ColorThemeNames.light}>{hint}</Text>
              {isActive ? this.renderActiveBlock() : this.renderOfflineBlock()}
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const AddAccountScreen = connect(mapStateToProps)(withNavigation(AddAccount));
