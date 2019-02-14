import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ESpaces } from '../../theme/sizes';

const styles = StyleSheet.create({
  view: {
    height: ESpaces.s
  }
});

export class ListSeparator extends React.PureComponent {
  render () {
    return (
      <View style={styles.view} />
    );
  }
}
