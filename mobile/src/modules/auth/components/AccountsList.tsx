import { Account } from "@signumjs/core";
import { toString } from "lodash";
import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { ListSeparator } from "../../../core/components/base/ListSeparator";
import { AccountColors, Colors } from "../../../core/theme/colors";
import { PriceInfoReduxState } from "../../price-api/store/reducer";
import { AccountListItem } from "./AccountListItem";
import { NoAccounts } from "./NoAccounts";

interface Props {
  accounts: Account[];
  onAccountPress: (account: Account) => void;
  onAddAccountPress: () => void;
  onDelete: (account: Account) => void;
  priceApi?: PriceInfoReduxState;
  onRefresh: () => Promise<void> | undefined;
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  container: {
    height: "auto",
  },
  emptyContainer: {
    height: "100%",
  },
});

export const AccountsList: React.FC<Props> = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    priceApi,
    accounts,
    onAccountPress,
    onAddAccountPress,
    onDelete,
    onRefresh,
  } = props;

  const keyExtractor = (item: Account, index: number) => {
    return toString(item.account || index);
  };

  const renderNoData = () => {
    return <NoAccounts onPress={onAddAccountPress} />;
  };

  const getContainerStyle = () => {
    return accounts.length ? styles.container : styles.emptyContainer;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const renderAccountItem = ({ item }: ListRenderItemInfo<Account>) => {
    const accountIndex =
      accounts.findIndex(({ account }) => account === item.account) %
      AccountColors.length;
    return (
      <AccountListItem
        onDelete={onDelete}
        onPress={onAccountPress}
        account={item}
        accountIndex={accountIndex}
        priceApi={priceApi}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={getContainerStyle()}
      style={styles.flatList}
      ListEmptyComponent={renderNoData}
      data={accounts}
      renderItem={renderAccountItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ListSeparator}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={[Colors.WHITE]}
          tintColor={Colors.WHITE}
        />
      }
    />
  );
};
