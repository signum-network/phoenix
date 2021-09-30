import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextAlign } from "../../../../core/components/base/Text";
import { Colors } from "../../../../core/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../core/navigation/routes";
import { i18n } from "../../../../core/i18n";
import { FontSizes } from "../../../../core/theme/sizes";
import { transactions } from "../../translations";
import { Button, ButtonThemes } from "../../../../core/components/base/Button";

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
});

export const NoActiveAccount: React.FC = () => {
  const navigation = useNavigation();

  // @ts-ignore
  const t = (item: string): string =>
    i18n.t(transactions.screens.send.noActiveAccount[item]);

  const gotoAddAccountScreen = () => {
    navigation.navigate(routes.addAccount);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.view}
      onPress={gotoAddAccountScreen}
    >
      <Text
        color={Colors.WHITE}
        size={FontSizes.LARGE}
        textAlign={TextAlign.CENTER}
        bebasFont
      >
        {t("title")}
      </Text>
      <Text color={Colors.WHITE} textAlign={TextAlign.CENTER}>
        {t("hint")}
      </Text>
      <Button theme={ButtonThemes.ACCENT} onPress={gotoAddAccountScreen}>
        {t("button")}
      </Button>
    </TouchableOpacity>
  );
};
