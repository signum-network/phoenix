import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Sizes } from '../../theme/sizes';

const styles = StyleSheet.create({
  view: {
    height: Sizes.SMALL
  }
});

export const ListSeparator: React.FunctionComponent = () => <View style={styles.view} />;
