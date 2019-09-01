import { Account } from '@burstjs/core';
import { toString } from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ListSeparator } from '../../../core/components/base/ListSeparator';
import { PriceInfoReduxState } from '../../cmc/store/reducer';
import { AccountListItem } from './AccountListItem';
import { AccountsListHeader } from './AccountsListHeader';
import { NoAccounts } from './NoAccounts';

interface Props {
  accounts: Account[];
  onAccountPress: (account: Account) => void;
  onAddAccountPress: () => void;
  onDelete: (account: Account) => void;
  cmc?: PriceInfoReduxState;
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

  renderHeader = () => {
    const { accounts, cmc } = this.props;
    return (
        <AccountsListHeader cmc={cmc} accounts={accounts}/>
    );
  }

  renderNoData = () => {
    return (
      <NoAccounts onPress={this.props.onAddAccountPress}/>
    );
  }

  renderAccountItem = ({ item }: ListRenderItemInfo<Account>) => {
    const { onDelete, onAccountPress, cmc } = this.props;

    return (
      <AccountListItem onDelete={onDelete} onPress={onAccountPress} account={item} cmc={cmc}/>
    );
  }

  render () {
    const { accounts } = this.props;
    return (
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderNoData}
        data={accounts}
        renderItem={this.renderAccountItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ListSeparator}
      />
    );
  }
}
