import React from 'react';
import {View} from 'react-native';
import {Text} from '../../../../core/components/base/Text';
import {Transaction} from '@signumjs/core';

interface Props {
    transaction: Transaction;
}

export const TransactionDetails: React.FC<Props> = ({transaction}) => {

    return (
        <View>
            <Text>Transaction Details</Text>
        </View>
    );
};
