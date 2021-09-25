import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { HeaderTitle } from "../../../core/components/header/HeaderTitle";
import { i18n } from "../../../core/i18n";
import { FullHeightView } from "../../../core/layout/FullHeightView";
import { Screen } from "../../../core/layout/Screen";
import { routes } from "../../../core/navigation/routes";
import { ReceiveAmountForm } from "../components/receive/ReceiveAmountForm";
import { ReceiveAmountPayload } from "../store/actions";
import { transactions } from "../translations";
import { useNavigation } from "@react-navigation/native";
import { selectAccounts } from "../../auth/store/selectors";
import { selectSuggestedFees } from "../../network/store/selectors";
import { NoAccount } from "../components/receive/NoAccount";

export const ReceiveScreen: React.FC = () => {
  const navigation = useNavigation();
  const accounts = useSelector(selectAccounts);
  const suggestedFees = useSelector(selectSuggestedFees);

  const handleSubmit = (form: ReceiveAmountPayload) => {
    // @ts-ignore
    navigation.navigate(routes.viewQRCode, { form });
  };

  return (
    <Screen>
      <FullHeightView>
        <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
        <View>
          {accounts.length > 0 ? (
            <ReceiveAmountForm
              accounts={accounts}
              onSubmit={handleSubmit}
              suggestedFees={suggestedFees}
            />
          ) : (
            <NoAccount />
          )}
        </View>
      </FullHeightView>
    </Screen>
  );
};
