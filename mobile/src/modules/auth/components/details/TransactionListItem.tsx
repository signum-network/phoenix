import { getRecipientsAmount, isMultiOutSameTransaction, isMultiOutTransaction, Transaction } from '@burstjs/core';
import { convertNQTStringToNumber, convertBurstTimeToDate, convertAddressToNumericId } from '@burstjs/util';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { transactionIcons, actionIcons } from '../../../../assets/icons';
import { Text, TextAlign } from '../../../../core/components/base/Text';
import { Colors } from '../../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../../core/theme/sizes';
import { getShortDateFromTimestamp } from '../../../../core/utils/date';

interface Props {
  transaction: Transaction;
  accountRS: string;
  onPress: (transaction: Transaction) => void;
}

const styles: any = {
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingVertical: Sizes.MEDIUM
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
    marginBottom: Sizes.MEDIUM
  },
  dataView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  icon: {
    width: 20,
    height: 20
  },
  incomingAmount: {
    marginRight: Sizes.MEDIUM,
    flexDirection: 'row'
  },
  outcomingAmount: {
    marginLeft: Sizes.MEDIUM,
    flexDirection: 'row'
  }
};

export class TransactionListItem extends React.PureComponent<Props> {

  account: any;

  isMultiOutPayment (transaction: Transaction): boolean {
    return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction);
  }

  isOwnAccount (address: string | undefined): boolean {
    return address && address === this.props.accountRS ? true : false;
  }

  getAmount = (transaction: Transaction): number => {

    if (this.isOwnAccount(transaction.senderRS)) {
      return -convertNQTStringToNumber(transaction.amountNQT || '0');
    }

    return this.isMultiOutPayment(transaction)
      ? getRecipientsAmount(convertAddressToNumericId(this.props.accountRS), transaction)
      : convertNQTStringToNumber(transaction.amountNQT || '0');
  }

  isAmountNegative = (transaction: Transaction): boolean => {
    return this.isOwnAccount(transaction.senderRS);
  }

  handlePress = () => {
    const { onPress, transaction } = this.props;
    onPress(transaction);
  }

  renderIcon = () => {
    const { confirmations = 0 } = this.props.transaction;

    const icon = confirmations > 0
      ? transactionIcons.done
      : transactionIcons.waiting;

    return (
      <Image source={icon} style={styles.icon} />
    );
  }

  getOpacity = () => {
    const { confirmations = 0 } = this.props.transaction;

    const opacity = confirmations > 0
      ? 1
      : .75;

    return {
      opacity
    };
  }

  render () {
    const {
      transaction = '',
      timestamp = 0,
      recipientRS = '',
      senderRS = ''
    } = this.props.transaction;
    const isNegative = this.isAmountNegative(this.props.transaction);
    const amount = this.getAmount(this.props.transaction);
    let accountRS = isNegative ? recipientRS : senderRS;

    if (this.isMultiOutPayment(this.props.transaction)) {
      accountRS = 'Multi-out Payment';
    }

    const date = getShortDateFromTimestamp(timestamp);

    return (
      <TouchableOpacity style={[styles.view, this.getOpacity()]} onPress={this.handlePress}>
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
            {isNegative ? (
                <View style={styles.outcomingAmount}>
                  <View style={styles.flex}>
                    <Text color={Colors.RED} bebasFont>{amount}</Text>
                  </View>
                  <View style={styles.flex}>
                    <Image source={actionIcons.chevronRight} style={styles.icon} />
                  </View>
                </View>
            ) : null}
            <View style={styles.account}>
              <Text color={Colors.WHITE} bebasFont>{accountRS}</Text>
            </View>
            {!isNegative ? (
                <View style={styles.incomingAmount}>
                  <View style={styles.flex}>
                    <Image source={actionIcons.chevronRight} style={styles.icon} />
                  </View>
                  <View style={styles.flex}>
                    <Text color={Colors.GREEN} bebasFont>{amount}</Text>
                  </View>
                </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
