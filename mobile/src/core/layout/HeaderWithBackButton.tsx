import {Colors} from '../theme/colors';
import {actionIcons} from '../../assets/icons';
import {Text} from '../components/base/Text';
import {i18n} from '../i18n';
import {core} from '../translations';
import {HeaderTitle} from '../components/header/HeaderTitle';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


interface Props {
    title: string;
}

export const HeaderWithBackButton: React.FC<Props> = ({title}) => {
    const navigation = useNavigation();

    return (
        <View style={{backgroundColor: Colors.BLUE_DARKER, flexDirection: 'row'}}>
            <TouchableOpacity
                style={{flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10}}
                onPress={() => navigation.goBack()}>
                <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                <HeaderTitle>
                    {title}
                </HeaderTitle>
            </View>
        </View>
    );
};
