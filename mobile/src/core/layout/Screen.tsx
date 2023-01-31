import React from 'react';
import {StatusBar, StatusBarStyle, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../theme/colors';

interface Props {
  children: JSX.Element | JSX.Element[];
  barStyle?: StatusBarStyle;
  style?: any;
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: Colors.BLUE,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export const Screen = (props: Props) => {
  const {barStyle = 'light-content', children, style} = props;

  return (
    <React.Fragment>
      <StatusBar barStyle={barStyle} />
      <SafeAreaView style={[styles.area, style]}>{children}</SafeAreaView>
    </React.Fragment>
  );
};
