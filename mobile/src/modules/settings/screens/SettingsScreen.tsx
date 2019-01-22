import React from 'react';
import { Text } from '../../../core/components/base/Text';
import { Screen } from '../../../core/layout/Screen';
import { i18n } from '../../../core/localization/i18n';
import { settings } from '../translations';

export class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: i18n.t(settings.settings.title)
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
