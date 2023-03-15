import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Colors} from '../theme/colors';
import {defaultSideOffset, Sizes} from '../theme/sizes';
import {LogoWatermark} from '../components/base/LogoWatermark';

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
    backgroundColor: Colors.BLUE,
  },
  withoutPaddings: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export const FullHeightView: React.FC<Props> = (props: Props) => {
  const {style, withoutPaddings, children, ...rest} = props;

  return (
    <View
      style={[styles.view, withoutPaddings && styles.withoutPaddings, style]}
      {...rest}>
      <LogoWatermark />
      {children}
    </View>
  );
};
