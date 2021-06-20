import {getRecipientsAmount, isMultiOutSameTransaction, isMultiOutTransaction, Transaction} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {actionIcons, transactionIcons} from '../../../../assets/icons';
import {Text, TextAlign} from '../../../../core/components/base/Text';
import {Colors} from '../../../../core/theme/colors';
import {defaultSideOffset, FontSizes, Sizes} from '../../../../core/theme/sizes';
import {getShortDateFromTimestamp} from '../../../../core/utils/date';
import {trimAddressPrefix} from '../../../../core/utils/account';
import {AmountPrefix} from '../../../../core/utils/numbers';

interface Props {
    transaction: Transaction;
    account: string;
    onPress: (transaction: Transaction) => void;
}

const styles: any = {
    bordered: {
        borderWidth: 0.5,
        borderColor: Colors.WHITE,
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        paddingVertical: Sizes.SMALL
    },
    iconView: {
        width: 40,
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        marginRight: 0,
        paddingRight: defaultSideOffset,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexGrow: 1
    },
    hintView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%'
    },
    icon: {
        width: 24,
        height: 24,
    },
    incomingAmount: {
        marginRight: Sizes.MEDIUM,
        flexDirection: 'row'
    },
    outcomingAmount: {
        marginRight: Sizes.MEDIUM,
        flexDirection: 'row'
    },
    account: {
        flexWrap: 'wrap',
        right: 0,
    }
};

export class TransactionListItem extends React.PureComponent<Props> {

    isMultiOutPayment(transaction: Transaction): boolean {
        return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction);
    }

    isOwnAccount(accountId: string | undefined): boolean {
        return !!(accountId && accountId === this.props.account);
    }

    getAmount = (transaction: Transaction): string => {
        let result: number;
        if (this.isOwnAccount(transaction.sender)) {
            result = -convertNQTStringToNumber(transaction.amountNQT || '0');
        } else {

            result = this.isMultiOutPayment(transaction)
                ? getRecipientsAmount(this.props.account, transaction)
                : convertNQTStringToNumber(transaction.amountNQT || '0');
        }
        return `${AmountPrefix} ${result.toString(10)}`;
    };

    isAmountNegative = (transaction: Transaction): boolean => {
        return this.isOwnAccount(transaction.sender);
    };

    handlePress = () => {
        const {onPress, transaction} = this.props;
        onPress(transaction);
    };

    renderIcon = () => {
        const {confirmations = 0} = this.props.transaction;

        const icon = confirmations > 0
            ? transactionIcons.done
            : transactionIcons.waiting;

        return (
            <Image source={icon} style={styles.icon}/>
        );
    };

    getOpacity = () => {
        const {confirmations = 0} = this.props.transaction;

        const opacity = confirmations > 0 ? 1 : .75;

        return {
            opacity
        };
    };

    render() {
        const {
            transaction = '',
            timestamp = 0,
            recipientRS = '',
            senderRS = ''
        } = this.props.transaction;
        const isNegative = this.isAmountNegative(this.props.transaction);
        const amount = this.getAmount(this.props.transaction);
        let accountRS = trimAddressPrefix(isNegative ? recipientRS : senderRS);

        if (this.isMultiOutPayment(this.props.transaction)) {
            accountRS = 'Multi-out Payment';
        }

        const date = getShortDateFromTimestamp(timestamp);

        return (
            <TouchableOpacity style={[styles.view, this.getOpacity(), styles.bordered]} onPress={this.handlePress}>
                <View style={styles.iconView}>
                    {this.renderIcon()}
                </View>
                <View style={styles.mainView}>
                    <View style={styles.hintView}>
                        <View>
                            <Text color={Colors.WHITE} size={FontSizes.SMALL}>{transaction}</Text>
                        </View>
                        <View>
                            <Text color={Colors.WHITE} size={FontSizes.SMALL} textAlign={TextAlign.RIGHT}>{date}</Text>
                        </View>
                    </View>
                    <View style={styles.dataView}>
                        <View style={styles.view}>
                            <Text color={isNegative ? Colors.RED : Colors.GREEN} size={FontSizes.MEDIUM} bebasFont >{amount}</Text>
                        </View>
                        <View style={styles.account}>
                            <Text color={Colors.WHITE} bebasFont>{accountRS}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
