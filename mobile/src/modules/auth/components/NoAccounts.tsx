import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextAlign } from "../../../core/components/base/Text";
import { i18n } from "../../../core/i18n";
import { Colors } from "../../../core/theme/colors";
import { FontSizes } from "../../../core/theme/sizes";
import { auth } from "../translations";
import { logos } from "../../../assets/icons";
import { Button, ButtonThemes } from "../../../core/components/base/Button";

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export const NoAccounts: React.FunctionComponent<Props> = ({ onPress }) => (
  <TouchableOpacity activeOpacity={1} style={styles.view} onPress={onPress}>
    <Image source={logos.icon} style={styles.logo} />
    <Text
      color={Colors.WHITE}
      size={FontSizes.LARGE}
      textAlign={TextAlign.CENTER}
      bebasFont
    >
      {i18n.t(auth.accounts.noAccounts.title)}
    </Text>
    <Text color={Colors.WHITE} textAlign={TextAlign.CENTER}>
      {i18n.t(auth.accounts.noAccounts.hint)}
    </Text>
    <Button theme={ButtonThemes.ACCENT} onPress={onPress}>
      {i18n.t(auth.accounts.addAccount)}
    </Button>
  </TouchableOpacity>
);
