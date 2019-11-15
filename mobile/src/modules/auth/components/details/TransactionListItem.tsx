import { Transaction } from '@burstjs/core';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { transactionIcons } from '../../../../assets/icons';
import { Text, TextAlign } from '../../../../core/components/base/Text';
import { Colors } from '../../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../../core/theme/sizes';
import { getShortDateFromTimestamp } from '../../../../core/utils/date';
import { NQTAmountToString } from '../../../../core/utils/numbers';

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
    marginRight: Sizes.MEDIUM
  },
  outcomingAmount: {
    marginLeft: Sizes.MEDIUM
  }
};

export class TransactionListItem extends React.PureComponent<Props> {
  isIncomingTransaction = () => {
    const { accountRS, transaction } = this.props;
    return accountRS === transaction.recipientRS;
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
      amountNQT = '0',
      transaction = '',
      timestamp = 0,
      recipientRS = '',
      senderRS = ''
    } = this.props.transaction;
    const isIncoming = this.isIncomingTransaction();
    const amount = NQTAmountToString(amountNQT);
    const accountRS = isIncoming ? senderRS : recipientRS;
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
            {isIncoming ? (
                <View style={styles.incomingAmount}>
                  <Text color={Colors.GREEN} bebasFont>+{amount}</Text>
                </View>
            ) : null}
            <View>
              <Text color={Colors.WHITE} bebasFont>{accountRS}</Text>
            </View>
            {!isIncoming ? (
                <View style={styles.outcomingAmount}>
                  <Text color={Colors.RED} bebasFont>-{amount}</Text>
                </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
