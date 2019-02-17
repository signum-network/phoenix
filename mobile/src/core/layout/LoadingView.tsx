import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { i18n } from '../localization/i18n';
import { Colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { core } from '../translations';
import { Screen } from './Screen';

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.blue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    marginTop: 100,
    marginBottom: 20
  },
  loaderText: {
    color: Colors.white,
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
          color={Colors.white}
        />
        <Text style={styles.loaderText}>
          {i18n.t(core.loading.text)}
        </Text>
      </Screen>
    );
  }
}
