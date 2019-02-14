import React from 'react';
import { SafeAreaView, StatusBar, StatusBarStyle } from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[]
  barStyle?: StatusBarStyle
  style?: any
}

export class Screen extends React.PureComponent<Props> {
  render () {
    const { barStyle = 'light-content', children, style } = this.props;

    return (
      <React.Fragment>
        <StatusBar barStyle={barStyle} />
        <SafeAreaView style={style}>{children}</SafeAreaView>
      </React.Fragment>
    );
  }
}
