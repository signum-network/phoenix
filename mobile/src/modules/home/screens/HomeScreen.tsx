import React from 'react';
import { Button } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Screen } from '../../../core/layout/Screen';
import { i18n } from '../../../core/localization/i18n';
import { routes } from '../../../core/navigation/routes';
import { home } from '../translations';

class Home extends React.PureComponent<NavigationInjectedProps> {
  static navigationOptions = {
    title: i18n.t(home.home.title)
  };

  handleButtonPress = () => {
    this.props.navigation.navigate(routes.settings);
  }

  render () {
    return (
      <Screen>
        <Button title={'touch me'} onPress={this.handleButtonPress} />
      </Screen>
    );
  }
}

export const HomeScreen = withNavigation(Home);
