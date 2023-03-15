import {Sizes} from '../../../../core/theme/sizes';
import {Colors} from '../../../../core/theme/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: Sizes.MEDIUM,
    backgroundColor: Colors.RED,
    padding: Sizes.MEDIUM,
    borderRadius: 4,
    borderColor: Colors.WHITE,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  row: {
    width: '90%',
  },
});

export const DangerBox: React.FC = ({children}) => (
  <View style={styles.root}>
    <View style={styles.content}>{children}</View>
  </View>
);
