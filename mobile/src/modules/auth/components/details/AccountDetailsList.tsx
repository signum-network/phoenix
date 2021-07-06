import {Account, Transaction} from '@signumjs/core';
import {toString} from 'lodash';
import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {ListSeparator} from '../../../../core/components/base/ListSeparator';
import {PriceInfoReduxState} from '../../../price-api/store/reducer';
import {AccountTransactionsHeader} from './AccountTransactionsHeader';
import {NoTransactions} from './NoTransactions';
import {TransactionListItem} from './TransactionListItem';

interface Props {
    account: Account;
    onTransactionPress: (transaction: Transaction) => void;
    priceApi?: PriceInfoReduxState;
}

const styles: any = {
    flatList: {
        height: '100%',
        padding: 0,
    }
};

export const AccountDetailsList: React.FC<Props> = (props) => {

    const {account, priceApi, onTransactionPress} = props;
    const keyExtractor = (item: Transaction, index: number) => toString(item.fullHash || index);
    const renderHeader = () => <AccountTransactionsHeader priceApi={priceApi} account={account}/>;
    const renderNoData = () => <NoTransactions/>;
    const renderTransactionItem = ({item}: ListRenderItemInfo<Transaction>) =>
        <TransactionListItem account={account.account} onPress={onTransactionPress} transaction={item}/>;

    return (
        <FlatList
            style={styles.flatList}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderNoData}
            data={account.transactions}
            renderItem={renderTransactionItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ListSeparator}
        />
    );
};
