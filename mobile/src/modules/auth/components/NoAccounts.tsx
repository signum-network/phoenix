import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextAlign, TextThemes } from '../../../core/components/base/Text';
import { i18n } from '../../../core/i18n';
import { auth } from '../translations';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  view: {
    minHeight: '100%'
  }
});

export const NoAccounts: React.FunctionComponent<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.view} onPress={onPress}>
      <Text theme={TextThemes.HEADER}>
        {i18n.t(auth.accounts.noAccounts.title)}
      </Text>
      <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER}>
        {i18n.t(auth.accounts.noAccounts.hint)}
      </Text>
    </TouchableOpacity>

  );
};
