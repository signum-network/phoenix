import * as React from 'react';
import {Image, View} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {actionIcons} from '../../../assets/icons';
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

export interface SelectItem<T> extends Item {
    value: T;
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
        height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
};

const styles: any = {
    wrapper: {
        marginBottom: Sizes.SMALL,
    },
    inputIOS: {
        ...defaultStyles
    },
    inputAndroid: {
        ...defaultStyles
    },
    iconContainer: {
        top: 0,
        bottom: 0,
        right: Sizes.MEDIUM,
        height: '100%',
        paddingVertical: Sizes.MEDIUM
    },
    placeholder: {
        color: Colors.GREY_LIGHT
    },
    chevron: {
        width: 25,
        height: 25,
        marginTop: 3
    },
    disabled: {
        opacity: 0.5
    }
};

export const BSelect: React.FC<Props> = (props) => {
    const {rightElement, items, value, title, placeholder = '', disabled = false} = props;
    const placeholderObject = {
        value: null,
        label: placeholder
    };

    return (
        <View style={[styles.wrapper, disabled && styles.disabled]}>
            {title && <BText size={FontSizes.SMALLER} color={Colors.WHITE}>{title}</BText>}
            <RNPickerSelect
                onValueChange={props.onChange}
                items={items}
                value={value}
                style={styles}
                placeholder={placeholderObject}
                disabled={disabled}
                Icon={rightElement ? () => rightElement : () => {
                    return <Image source={actionIcons.chevronDown} style={styles.chevron}/>;
                }}
            />
        </View>
    );
};
