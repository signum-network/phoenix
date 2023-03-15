import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {SwitchItem} from '../../../core/components/base/SwitchItem';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ApplicationState} from '../../../core/store/initialState';
import {Colors} from '../../../core/theme/colors';
import {Sizes} from '../../../core/theme/sizes';
import {ImportActiveAccount} from '../components/import/ImportActiveAccount';
import {ImportOfflineAccount} from '../components/import/ImportOfflineAccount';
import {
  addAccount,
  createActiveAccount,
  createOfflineAccount,
  hydrateAccount,
} from '../store/actions';
import {AuthReduxState} from '../store/reducer';
import {auth} from '../translations';
import {HeaderWithBackButton} from '../../../core/layout/HeaderWithBackButton';
import {RootStackParamList} from '../navigation/mainStack';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type ImportAccountRouteProps = RouteProp<RootStackParamList, 'ImportAccount'>;
type ImportAccountNavProp = StackNavigationProp<
  RootStackParamList,
  'ImportAccount'
>;

type IProps = {
  auth: AuthReduxState;
  dispatch: any;
  route: ImportAccountRouteProps;
  navigation: ImportAccountNavProp;
};

interface State {
  isActive: boolean;
}

const styles = StyleSheet.create({
  switchView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: Sizes.LARGE,
    paddingTop: '30%',
  },
});

class ImportAccount extends React.PureComponent<IProps, State> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(auth.importAccount.title)}</HeaderTitle>,
  };
  state: State = {
    isActive: false,
  };

  addAccount = async (
    passphraseOrAddress: string,
    type: 'active' | 'offline',
  ) => {
    try {
      let account;
      if (type === 'active') {
        account = await this.props.dispatch(
          createActiveAccount(passphraseOrAddress),
        );
      } else if (type === 'offline') {
        account = await this.props.dispatch(
          createOfflineAccount(passphraseOrAddress),
        );
      }
      this.props.dispatch(addAccount(account));
      this.props.dispatch(hydrateAccount({account}));
      this.props.navigation.navigate('Accounts');
    } catch (error) {
      Alert.alert((error as any).message);
    }
  };

  handleAddActiveAccount = async (passphrase: string) =>
    this.addAccount(passphrase, 'active');
  handleAddOfflineAccount = async (address: string) =>
    this.addAccount(address, 'offline');

  handleChangeAccountType = (isActive: boolean) => {
    this.setState({isActive});
  };

  render() {
    const {isActive} = this.state;

    return (
      <Screen>
        <FullHeightView withoutPaddings style={{backgroundColor: Colors.WHITE}}>
          <HeaderWithBackButton title={i18n.t(auth.addAccount.title)} />
          <View style={styles.switchView}>
            <View>
              <SwitchItem
                onChange={this.handleChangeAccountType}
                text={i18n.t(auth.importAccount.activeAccount)}
                value={isActive}
              />
            </View>
            <View>
              {isActive ? (
                <ImportActiveAccount onFinish={this.handleAddActiveAccount} />
              ) : (
                <ImportOfflineAccount onFinish={this.handleAddOfflineAccount} />
              )}
            </View>
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    auth: state.auth,
  };
}

export const ImportAccountScreen = connect(mapStateToProps)(ImportAccount);
