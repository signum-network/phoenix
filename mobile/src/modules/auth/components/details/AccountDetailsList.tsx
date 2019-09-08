import { Account } from '@burstjs/core';
import { Transaction } from '@burstjs/core/src/typings/transaction';
import { toString } from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ListSeparator } from '../../../../core/components/base/ListSeparator';
import { PriceInfoReduxState } from '../../../price-api/store/reducer';
import { AccountTransactionsHeader } from './AccountTransactionsHeader';
import { NoTransactions } from './NoTransactions';
import { TransactionListItem } from './TransactionListItem';

interface Props {
  account: Account;
  onTransactionPress: (transaction: Transaction) => void;
  priceApi?: PriceInfoReduxState;
}

const styles: any = {
  flatList: {
    height: '100%'
  }
};

export class AccountDetailsList extends React.PureComponent<Props> {
  keyExtractor = (item: Transaction, index: number) => {
    return toString(item.fullHash || index);
  }

  renderHeader = () => {
    const { account, priceApi } = this.props;
    return (
        <AccountTransactionsHeader priceApi={priceApi} account={account}/>
    );
  }

  renderNoData = () => {
    return (
      <NoTransactions/>
    );
  }

  renderTransactionItem = ({ item }: ListRenderItemInfo<Transaction>) => {
    const { onTransactionPress, account } = this.props;

    return (
      <TransactionListItem accountRS={account.accountRS} onPress={onTransactionPress} transaction={item}/>
    );
  }

  render () {
    const { account: { transactions = [] } } = this.props;
    // TODO: UI for another types.
    const availableTransactions = transactions.filter((item) => item.type === 0);

    return (
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderNoData}
        data={availableTransactions}
        renderItem={this.renderTransactionItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ListSeparator}
      />
    );
  }
}
