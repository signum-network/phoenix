import React from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

interface Props {
  children: JSX.Element | JSX.Element[]
  barStyle?: StatusBarStyle
  style?: any
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: Colors.BLUE_DARKER
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
