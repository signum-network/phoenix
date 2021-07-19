import {Amount, SignaSymbol} from '@signumjs/util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextAlign} from './Text';
import {FontSizes} from '../../theme/sizes';
import {Colors} from '../../theme/colors';

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 0,
        padding: 0,
    }
});

interface Props {
    amount?: Amount;
    size?: number;
    color?: string;
    style?: any;
}

export const AmountText: React.FC<Props> = ({
                                                amount = Amount.Zero(),
                                                size = FontSizes.MEDIUM,
                                                color = Colors.WHITE,
                                                style = {}
                                            }) => {

    const [integer = '0', fraction = '0'] = amount.getSigna().split('.');

    return (
        <View style={[styles.root, style]}>
            <View>
                <Text color={color} size={size}>{`${SignaSymbol} ${integer}.`}</Text>
            </View>
            <View style={{bottom: 4 * 0.6}}>
                <Text color={color} size={size * 0.6}>{fraction}</Text>
            </View>
        </View>
    );
};
