import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { FontSizes } from '../../theme/sizes';
import { Text, TextThemes } from './Text';

// TODO: maybe add themes?

export enum KeyboardTypes {
  DEFAULT = 'default',
  EMAIL = 'email-address',
  NUMERIC = 'numeric',
  PHONE = 'phone-pad'
}

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  hint?: string;
  keyboardType?: KeyboardTypes;
  maxLength?: number;
  secure?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const color = Colors.BLUE;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.noto,
    fontSize: FontSizes.MEDIUM,
    color,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_DARKER
  }
});

export const Input: React.FunctionComponent<Props> = (props) => {
  const { keyboardType, maxLength, disabled, value, secure, placeholder, hint, onChangeText } = props;

  return (
    <View>
      {hint && <Text theme={TextThemes.HINT}>{hint}</Text>}
      <TextInput
        value={value}
        maxLength={maxLength}
        editable={!disabled}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={'done'}
        secureTextEntry={secure}
        style={styles.text}
        selectionColor={color}
        placeholder={placeholder}
        placeholderTextColor={Colors.GREY}
      />
    </View>
  );
};
