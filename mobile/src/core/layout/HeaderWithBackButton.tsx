import {Colors} from '../theme/colors';
import {actionIcons} from '../../assets/icons';
import {HeaderTitle} from '../components/header/HeaderTitle';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
    title: string;
    backgroundColor?: string;
    noMargin?: boolean;
}

export const HeaderWithBackButton: React.FC<Props> = ({title, backgroundColor =  Colors.BLUE_DARKER, noMargin = false}) => {
    const navigation = useNavigation();

    const margin =  noMargin ? 0 : 10;
    return (
        <View style={{backgroundColor, flexDirection: 'row'}}>
            <TouchableOpacity
                style={{flexDirection: 'row', position: 'absolute', zIndex: 1, top: margin, left: margin}}
                onPress={() => navigation.goBack()}>
                <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', margin}}>
                <HeaderTitle>
                    {title}
                </HeaderTitle>
            </View>
        </View>
    );
};
