import { Account } from '@burstjs/core';
import React from 'react';
import { ActionSheetIOS, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Text, TextAlign } from '../../../core/components/base/Text';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset } from '../../../core/theme/sizes';
import { actionTypes } from '../../transactions/store/actionTypes';

interface IProps {
  onPress: (account: Account) => void;
  onDelete: (account: Account) => void;
  account: Account;
}

type Props = IProps;

export class AccountListItem extends React.PureComponent<Props> {
  getStyles = () => {
    const styles = {
      view: {
        paddingHorizontal: defaultSideOffset,
        backgroundColor: Colors.WHITE
      },
      address: {

      },
      info: {
        flexDirection: 'row'
      },
      accountType: {
        alignSelf: 'flex-start',
        flexGrow: 1
      },
      balance: {
        alignSelf: 'flex-end'
      }
    };
    return StyleSheet.create(styles as any);
  }

  handlePress = () => {
    const { onPress, account } = this.props;
    onPress(account);
  }

  render () {
    const { accountRS = '', balanceNQT = '', type = '' } = this.props.account;
    const styles = this.getStyles();
    const swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => { this.props.onDelete(this.props.account); }
    }];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'
      >
        <TouchableOpacity style={styles.view} onPress={this.handlePress}>

          <View style={styles.address}>
            <Text>{accountRS}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.accountType}>
              <Text>{type}</Text>
            </View>
            <View style={styles.balance}>
              <Text textAlign={TextAlign.RIGHT}>{balanceNQT.toString()}</Text>
            </View>
          </View>
        </TouchableOpacity>

      </Swipeout>
    );
  }
}
