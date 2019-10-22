import { Account } from '@burstjs/core';
import { toString } from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ListSeparator } from '../../../core/components/base/ListSeparator';
import { AccountColors, Colors } from '../../../core/theme/colors';
import { PriceInfoReduxState } from '../../price-api/store/reducer';
import { AccountListItem } from './AccountListItem';
import { NoAccounts } from './NoAccounts';

interface Props {
  accounts: Account[];
  onAccountPress: (account: Account) => void;
  onAddAccountPress: () => void;
  onDelete: (account: Account) => void;
  priceApi?: PriceInfoReduxState;
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1
  },
  container: {
    height: 'auto'
  },
  emptyContainer: {
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

  getContainerStyle = () => {
    return this.props.accounts.length ? styles.container : styles.emptyContainer;
  }

  renderAccountItem = ({ item }: ListRenderItemInfo<Account>) => {
    const { onDelete, onAccountPress, priceApi, accounts } = this.props;
    const accountIndex = accounts.findIndex(({ account }) => account === item.account) % AccountColors.length;

    return (
      <AccountListItem
        onDelete={onDelete}
        onPress={onAccountPress}
        account={item}
        accountIndex={accountIndex}
        priceApi={priceApi}
      />
    );
  }

  render () {
    const { accounts } = this.props;
    return (
      <FlatList
        contentContainerStyle={this.getContainerStyle()}
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
