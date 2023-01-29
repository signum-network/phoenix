import * as React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import { actionIcons } from "../../../assets/icons";
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {FontSizes, Sizes} from '../../theme/sizes';
import {Text as BText} from './Text';

interface Props {
  value: any;
  items: Array<SelectItem<any>>;
  title?: string;
  rightElement?: React.ReactNode;
  onChange: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectItem<T> {
  value: T;
  label: string;
}

const defaultStyles: any = {
  fontSize: FontSizes.LARGER,
  fontFamily: fonts.roboto,
  letterSpacing: -1,
  fontWeight: '500',
  color: Colors.WHITE,
  borderColor: Colors.BLUE,
  borderWidth: 1,
  backgroundColor: Colors.BLACK,
  padding: Sizes.MEDIUM,
  shadowColor: Colors.BLACK,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

const styles: any = {
  picker: {
    fontFamily: fonts.roboto,
    color: Colors.WHITE,
  },
  pickerItem: {
    fontSize: FontSizes.MEDIUM,
  },
};

export const BSelect: React.FC<Props> = props => {
  const {items, value, title, placeholder = '', disabled = false} = props;

  return (
    <View style={[styles.wrapper, disabled && styles.disabled]}>
      {title && (
        <BText size={FontSizes.SMALLER} color={Colors.WHITE}>
          {title}
        </BText>
      )}
      <Picker
        onValueChange={props.onChange}
        style={styles.picker}
        selectedValue={value}
        enabled={!disabled}
        prompt={placeholder}
        dropdownIconColor={Colors.WHITE}
        dropdownIconRippleColor={Colors.WHITE}>
        {items.map(i => (
          <Picker.Item
            key={i.value}
            fontFamily={fonts.roboto}
            style={styles.pickerItem}
            label={i.label}
            value={i.value}
          />
        ))}
      </Picker>
    </View>
  );
};
