import { Account } from '@burstjs/core';
import { toString } from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ListSeparator } from '../../../core/components/base/ListSeparator';
import { AccountListItem } from './AccountListItem';
import { NoAccounts } from './NoAccounts';

interface Props {
  accounts: Account[];
  onAccountPress: (account: Account) => void;
  onAddAccountPress: () => void;
}

const styles = StyleSheet.create({
  flatList: {
    height: '100%'
  }
});

export class AccountsList extends React.PureComponent<Props> {
  keyExtractor = (item: Account, index: number) => {
    return toString(item.account || index);
  }

  renderNoData = () => {
    return (
      <NoAccounts onPress={this.props.onAddAccountPress}/>
    );
  }

  renderAccountItem = ({ item }: ListRenderItemInfo<Account>) => {
    return (
      <AccountListItem onPress={this.props.onAccountPress} account={item}/>
    );
  }

  render () {
    const { accounts } = this.props;
    return (
      <FlatList
        style={styles.flatList}
        ListEmptyComponent={this.renderNoData}
        data={accounts}
        renderItem={this.renderAccountItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ListSeparator}
      />
    );
  }
}
