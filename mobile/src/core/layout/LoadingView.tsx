import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Screen } from './Screen';

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.blue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    marginTop: 100,
    marginBottom: 20
  },
  loaderText: {
    color: colors.white,
    fontFamily: fonts.noto
  }
});

export class LoadingView extends React.PureComponent {
  render () {

    return (
      <Screen style={styles.view}>
        <ActivityIndicator
          style={styles.loader}
          size={'large'}
          color={colors.white}
        />
        <Text style={styles.loaderText}>
          Loading application (i'm joking, just show you a loader screen)
        </Text>
      </Screen>
    );
  }
}
