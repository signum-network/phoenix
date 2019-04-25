import React from 'react';
import { core } from '../translations';

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

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState,
}
type Props = IProps & NavigationInjectedProps;

class Home extends React.PureComponent<Props> {

  constructor (props: Props) {
    super(props);
    this.changeAccount = this.changeAccount.bind(this);
  }
  
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(core.screens.home.title)}</HeaderTitle>
  };

  changeAccount () {
    this.props.navigation.navigate(routes.accounts);
  }

  render () {
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
              {this.props.auth.accounts[0].balanceNQT || '0'} BURST
            </Text>
            <Text>
              {this.props.auth.accounts[0].balanceNQT || '0'} USD
            </Text>
            <Text>{i18n.t(core.screens.home.recentTransactions)}</Text>
            <Button onPress={this.changeAccount} title={i18n.t(core.screens.home.accountsList)} />
          </View>
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

export const HomeScreen = connect(mapStateToProps)(withNavigation(Home));
