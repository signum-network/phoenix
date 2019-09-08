import * as React from 'react';
import { TextInput, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { FontSizes, Sizes } from '../../theme/sizes';
// TODO: create BText component
import { Text as BText } from './Text';

interface Props {
  value: string;
  onChange: (value: string) => void;
  keyboard?: KeyboardTypes;
  title?: string;
  placeholder?: string;
}

export enum KeyboardTypes {
  DEFAULT = 'default',
  EMAIL = 'email-address',
  NUMERIC = 'numeric',
  PHONE = 'phone-pad'
}

const styles: any = {
  wrapper: {
    borderColor: Colors.BLUE,
    borderWidth: 1,
    padding: Sizes.MEDIUM,
    backgroundColor: Colors.BLACK,
    marginBottom: Sizes.MEDIUM
  },
  input: {
    fontFamily: fonts.noto,
    fontSize: FontSizes.MEDIUM,
    fontWeight: '500',
    color: Colors.WHITE,
    backgroundColor: Colors.TRANSPARENT
  }
};

export class BInput extends React.PureComponent<Props> {
  render () {
    const { title, value, onChange, placeholder, keyboard } = this.props;

    return (
      <View>
        {title ? (
          <BText color={Colors.WHITE} size={FontSizes.SMALL}>{title}</BText>
        ) : null}
        <View style={styles.wrapper}>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={keyboard}
            returnKeyType={'done'}
            placeholder={placeholder}
            placeholderTextColor={Colors.GREY_LIGHT}
          />
        </View>
      </View>
    );
  }
}
