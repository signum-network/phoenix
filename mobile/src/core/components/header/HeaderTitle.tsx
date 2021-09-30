import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/colors";
import { defaultSideOffset, FontSizes, Sizes } from "../../theme/sizes";
import { isIOS } from "../../utils/platform";
import { Text } from "../base/Text";

interface Props {
  children: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: isIOS ? Sizes.SMALL : 0,
    paddingLeft: isIOS ? 0 : defaultSideOffset * 1,
  },
});

export const HeaderTitle: React.FunctionComponent<Props> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.view}
      activeOpacity={onPress ? 0.2 : 1}
    >
      <Text bebasFont={true} color={Colors.WHITE} size={FontSizes.MEDIUM}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
