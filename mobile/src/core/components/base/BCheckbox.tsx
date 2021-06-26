import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../theme/colors';
import {Text as BText} from './Text';
import CheckBox from '@react-native-community/checkbox';

interface Props {
    label: string;
    value: boolean;
    onCheck: (value: boolean) => void;
    disabled?: boolean;
}

export const BCheckbox: React.FunctionComponent<Props> = (props) => {
    const {onCheck, label, value, disabled = false} = props;

    return (
        <View style={{flexDirection: 'row'}}>
            <CheckBox
                disabled={disabled}
                value={value}
                onValueChange={onCheck}
                tintColors={{true: Colors.WHITE, false: Colors.WHITE}}
            />
            <View style={{marginTop: 2, marginLeft: 8}}>
                <TouchableOpacity onPress={() => onCheck(value)}>
                    <BText bebasFont color={Colors.WHITE}>
                        {label}
                    </BText>
                </TouchableOpacity>
            </View>
        </View>
    );
};
