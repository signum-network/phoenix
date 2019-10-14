import * as React from 'react';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { FontSizes, Sizes } from '../../theme/sizes';
// TODO: create BText component
import { Text as BText } from './Text';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboard?: KeyboardTypes;
  title?: string;
  placeholder?: string;
  rightIcons?: React.ReactElement;
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
    marginBottom: Sizes.MEDIUM,
    flexDirection: 'row',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  input: {
    fontFamily: fonts.noto,
    letterSpacing: -1,
    fontSize: FontSizes.MEDIUM,
    fontWeight: '500',
    color: Colors.WHITE,
    backgroundColor: Colors.TRANSPARENT,
    height: 25,
    width: '100%',
    flex: 1
  },
  end: {
    marginLeft: 'auto'
  }
};

export class BInput extends React.PureComponent<Props> {
  render () {
    const { title, value, onChange, placeholder, keyboard, onBlur, rightIcons } = this.props;

    return (
      <View>
        {title ? (
          <BText color={Colors.WHITE} size={FontSizes.SMALL}>{title}</BText>
        ) : null}
        <View style={styles.wrapper}>
          <TextInput
            onBlur={onBlur}
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
          <View style={styles.end}>
            {rightIcons}
          </View>
        </View>
      </View>
    );
  }
}
