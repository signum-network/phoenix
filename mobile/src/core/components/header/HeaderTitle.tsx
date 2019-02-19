import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { FontSizes, Sizes } from '../../theme/sizes';
import { Text } from '../base/Text';

interface Props {
  children: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Sizes.SMALL
  }
});

export const HeaderTitle: React.FunctionComponent<Props> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.view} activeOpacity={onPress ? 0.2 : 1}>
      <Text bebasFont={true} bold={true} color={Colors.WHITE} size={FontSizes.MEDIUM}>{children}</Text>
    </TouchableOpacity>
  );
};
