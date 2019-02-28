import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextThemes } from '../../../../core/components/base/Text';

interface Props {
  children: string;
}

const styles = StyleSheet.create({
  hintView: {
    alignContent: 'flex-end'
  }
});

export const AccountTypeHint: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <View style={styles.hintView}>
      <Text theme={TextThemes.HINT}>
        {children}
      </Text>
    </View>
  );
};
