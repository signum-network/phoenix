import { fonts } from "../../theme/fonts";
import { FontSizes } from "../../theme/sizes";
import { Colors } from "../../theme/colors";
import { StyleSheet, View, Text } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  label: {
    fontFamily: fonts.signum,
    fontSize: FontSizes.SMALLER,
    textAlign: "left",
    color: Colors.WHITE,
    top: 4,
    opacity: 0.7,
  },
  text: {
    fontFamily: fonts.signum,
    fontSize: FontSizes.SMALL,
    textAlign: "justify",
    color: Colors.WHITE,
  },
});

interface Props {
  label: string;
  text: string;
  color?: Colors;
}

export const LabeledTextField: React.FC<Props> = ({ text, label, color }) => {
  const computedStyle = {
    color,
  };

  return (
    <View style={[styles.root]}>
      <Text style={[styles.label, computedStyle]}>{label}</Text>
      <Text style={[styles.text, computedStyle]}>{text}</Text>
    </View>
  );
};
