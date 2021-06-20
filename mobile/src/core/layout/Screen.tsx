import React from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { isIOS } from '../utils/platform';

interface Props {
  children: JSX.Element | JSX.Element[];
  barStyle?: StatusBarStyle;
  style?: any;
}

const area: any = {
  backgroundColor: Colors.BLUE
};

if (!isIOS) {
  area.paddingBottom = 40;
}

const styles = StyleSheet.create({
  area
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
