import React from 'react';
import { Text } from '../../../core/components/base/Text';
import { Screen } from '../../../core/layout/Screen';

export class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings Screen'
  };

  render () {
    return (
      <Screen>
        <Text>Default text</Text>
        <Text isHeader>Header text</Text>
      </Screen>
    );
  }
}
