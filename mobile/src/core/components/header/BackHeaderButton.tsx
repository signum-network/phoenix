import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { FontSizes, Sizes } from '../../theme/sizes';
import { isIOS } from '../../utils/platform';
import { Text, TextAlign } from '../base/Text';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  view: {
    marginBottom: Sizes.SMALL,
    paddingLeft: Sizes.MEDIUM,
    paddingRight: Sizes.LARGE,
    paddingTop: isIOS ? 0 : Sizes.SMALL
  }
});

export const BackHeaderButton: React.FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.view} onPress={props.onPress}>
      <Text textAlign={TextAlign.LEFT} size={FontSizes.LARGE} color={Colors.WHITE}>Back</Text>
    </TouchableOpacity>
  );
};
