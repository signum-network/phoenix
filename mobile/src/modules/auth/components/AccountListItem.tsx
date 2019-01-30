import { Account } from '@burstjs/core';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../core/components/base/Text';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset } from '../../../core/theme/sizes';

interface IProps {
  onPress: (account: Account) => void;
  account: Account;
}

type Props = IProps;

export class AccountListItem extends React.PureComponent<Props> {
  getStyles = () => {
    const styles = {
      view: {
        paddingHorizontal: defaultSideOffset,
        backgroundColor: Colors.greyLight
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
    const { address = '', balance = '', type = '' } = this.props.account;
    const styles = this.getStyles();

    return (
      <TouchableOpacity style={styles.view} onPress={this.handlePress}>
        <View style={styles.address}>
          <Text>{address}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.accountType}>
            <Text>{type}</Text>
          </View>
          <View style={styles.balance}>
            <Text textAlign={'right'}>{balance.toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
