import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Colors} from '../../theme/colors';

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: 0.5,
    borderColor: Colors.GREY,
  }
});

export const ListSeparator: React.FunctionComponent = () => <View style={styles.view} />;
