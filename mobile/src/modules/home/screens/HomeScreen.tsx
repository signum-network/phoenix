import React from 'react';
import { Button } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';

class Home extends React.PureComponent<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Home'
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
