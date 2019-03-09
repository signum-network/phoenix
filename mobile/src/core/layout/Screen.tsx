import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet
} from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  children: JSX.Element | JSX.Element[]
  barStyle?: StatusBarStyle
  style?: any
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: Colors.GREY_LIGHT
  }
});

export class Screen extends React.PureComponent<Props> {

  render () {
    const { barStyle = 'light-content', children, style } = this.props;

    return (
      <React.Fragment>
        <StatusBar barStyle={barStyle} />
        <SafeAreaView style={[styles.area, style]}>
          {children}
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
