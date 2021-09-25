import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Account, Address, Transaction } from "@signumjs/core";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Clipboard,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actionIcons } from "../../../assets/icons";
import { HeaderTitle } from "../../../core/components/header/HeaderTitle";
import { i18n } from "../../../core/i18n";
import { FullHeightView } from "../../../core/layout/FullHeightView";
import { Screen } from "../../../core/layout/Screen";
import { routes } from "../../../core/navigation/routes";
import { PriceInfoReduxState } from "../../price-api/store/reducer";
import { AccountDetailsList } from "../components/details/AccountDetailsList";
import { RootStackParamList } from "../navigation/mainStack";
import { updateAccountTransactions } from "../store/actions";
import { selectAccount } from "../store/selectors";
import { auth } from "../translations";

type AccountDetailsRouteProps = RouteProp<RootStackParamList, "AccountDetails">;
type AccountDetailsNavProp = StackNavigationProp<
  RootStackParamList,
  "AccountDetails"
>;

interface Props {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
  route: AccountDetailsRouteProps;
  navigation: AccountDetailsNavProp;
}

const styles = StyleSheet.create({
  copyIcon: {
    margin: 5,
    width: 25,
    height: 25,
  },
});

export const AccountDetailsScreen: React.FC<Props> = (props) => {
  const timeoutHandle = useRef<number>();
  const dispatch = useDispatch();
  const route = useRoute<AccountDetailsRouteProps>();
  const account = useSelector(selectAccount(route.params.account || ""));
  const { priceApi, navigation } = props;

  useEffect(() => {
    const updateAccounts = () => {
      if (account) {
        dispatch(updateAccountTransactions(account));
      }
    };
    updateAccounts();
    timeoutHandle.current = setInterval(updateAccounts, 30 * 1000);
    return () => {
      clearAccountInterval();
    };
  }, []);

  const clearAccountInterval = () => {
    if (timeoutHandle.current) {
      clearInterval(timeoutHandle.current);
    }
  };

  const handleTransactionPress = (transaction: Transaction) => {
    // @ts-ignore
    navigation.navigate(routes.transactionDetails, { transaction });
  };

  const handleCopy = () => {
    if (!route.params.account) {
      return;
    }

    const address = Address.fromNumericId(route.params.account);
    const value = address.getReedSolomonAddress();
    Clipboard.setString(value);
    Alert.alert(i18n.t(auth.accountDetails.copiedSuccessfully, { value }));
  };

  if (!account) {
    return null;
  }

  return (
    <Screen>
      <FullHeightView withoutPaddings>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              position: "absolute",
              zIndex: 3,
              left: 10,
              top: 10,
            }}
            onPress={navigation.goBack}
          >
            <Image
              source={actionIcons.chevronLeft}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
            <HeaderTitle>{account.accountRS || "Account Details"}</HeaderTitle>
          </View>
          <TouchableOpacity onPress={handleCopy}>
            <Image style={styles.copyIcon} source={actionIcons.copy} />
          </TouchableOpacity>
        </View>
        <View>
          <AccountDetailsList
            account={account}
            onTransactionPress={handleTransactionPress}
            priceApi={priceApi}
          />
        </View>
      </FullHeightView>
    </Screen>
  );
};
