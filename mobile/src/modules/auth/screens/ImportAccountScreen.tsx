import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { SwitchItem } from '../../../core/components/base/SwitchItem';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { Sizes } from '../../../core/theme/sizes';
import { ImportActiveAccount } from '../components/import/ImportActiveAccount';
import { ImportOfflineAccount } from '../components/import/ImportOfflineAccount';
import { addAccount, createActiveAccount, createOfflineAccount, hydrateAccount } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState
}

type Props = NavigationInjectedProps & IProps;

interface State {
  isActive: boolean;
}

const styles = StyleSheet.create({
  switchView: {
    paddingBottom: Sizes.LARGE
  }
});

class ImportAccount extends React.PureComponent<Props, State> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(auth.importAccount.title)}</HeaderTitle>
  };
  state: State = {
    isActive: false
  };

  handleAddActiveAccount = async (passphrase: string) => {
    try {
      const account = await this.props.dispatch(createActiveAccount(passphrase.split(' ')));
      this.props.dispatch(addAccount(account));
      this.props.dispatch(hydrateAccount(account));
      this.props.navigation.navigate(routes.home);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  handleAddOfflineAccount = async (address: string) => {
    try {
      const account = await this.props.dispatch(createOfflineAccount(address));
      this.props.dispatch(addAccount(account));
      this.props.dispatch(hydrateAccount(account));
      this.props.navigation.navigate(routes.home);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  handleChangeAccountType = (isActive: boolean) => {
    this.setState({ isActive });
  }

  render () {
    const { isActive } = this.state;

    return (
      <Screen>
        <FullHeightView style={{ backgroundColor: Colors.WHITE }}>
          <HeaderTitle>{i18n.t(auth.importAccount.title)}</HeaderTitle>
          <View style={styles.switchView}>
            <SwitchItem
              onChange={this.handleChangeAccountType}
              text={i18n.t(auth.importAccount.activeAccount)}
              value={isActive}
            />
          </View>
          {isActive ? (
            <ImportActiveAccount onFinish={this.handleAddActiveAccount}/>
          ) : (
            <ImportOfflineAccount onFinish={this.handleAddOfflineAccount}/>
          )}
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

export const ImportAccountScreen = connect(mapStateToProps)(ImportAccount);
