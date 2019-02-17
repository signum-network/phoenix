import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    flexGrow: 1
  }
});

export class FullHeightView extends React.PureComponent<ViewProps> {
  render () {
    return (
      <View style={styles.view} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}
