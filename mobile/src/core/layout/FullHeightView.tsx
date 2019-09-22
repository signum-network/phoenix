import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { defaultSideOffset, Sizes } from '../theme/sizes';
import { Colors } from '../theme/colors';

interface Props extends ViewProps {
  withoutPaddings?: boolean;
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    paddingVertical: Sizes.MEDIUM,
    paddingHorizontal: defaultSideOffset,
    backgroundColor: Colors.BLUE_DARKER
  },
  withoutPaddings: {
    paddingVertical: 0,
    paddingHorizontal: 0
  }
});

export class FullHeightView extends React.PureComponent<Props> {
  render () {
    const { style, withoutPaddings, children, ...rest } = this.props;

    return (
      <View style={[styles.view, withoutPaddings && styles.withoutPaddings, style]} {...rest}>
        {children}
      </View>
    );
  }
}
