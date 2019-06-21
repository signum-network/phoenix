import React, { ReactChild } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { defaultSideOffset, Sizes } from '../../theme/sizes';
import { isIOS } from '../../utils/platform';

interface Props {
  children: ReactChild;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: isIOS ? Sizes.SMALL : 0,
    paddingLeft: isIOS ? 0 : defaultSideOffset * 1
  }
});

export const AccountDetailsHeaderTitle: React.FunctionComponent<Props> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.view} activeOpacity={onPress ? 0.2 : 1}>
      {children}
    </TouchableOpacity>
  );
};
