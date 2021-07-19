import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Sizes } from '../../../theme/sizes';
import { Text, TextThemes } from '../../base/Text';

interface Props {
  value?: number;
  onPress: (value: any) => void;
  children: string;
  disabled?: boolean;
}

const BUTTON_SIZE = 64;

const styles = StyleSheet.create({
  touchable: {
    width: '30%',
    paddingVertical: Sizes.MEDIUM,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderColor: Colors.WHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0
  },
  disabled: {
    opacity: 0
  }
});

export class RoundButton extends React.PureComponent<Props> {
  handlePress = () => {
    const { disabled, value, onPress } = this.props;
    if (!disabled) {
      onPress(value);
    }
  }

  render () {
    const { children, disabled } = this.props;

    return (
      <TouchableOpacity disabled={disabled} style={styles.touchable} onPress={this.handlePress}>
        <View style={[styles.view, disabled && styles.disabled]}>
          <Text color={Colors.WHITE} theme={TextThemes.HEADER}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
