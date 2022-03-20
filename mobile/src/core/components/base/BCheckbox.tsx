import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../theme/colors";
import { Text as BText } from "./Text";
import CheckBox from "@react-native-community/checkbox";
import { FontSizes } from "../../theme/sizes";

interface Props {
  label: string;
  value: boolean;
  onCheck: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  labelFontSize?: number;
}

export const BCheckbox: React.FunctionComponent<Props> = (props) => {
  const {
    onCheck,
    label,
    value,
    disabled = false,
    color = Colors.WHITE,
    labelFontSize = FontSizes.MEDIUM,
  } = props;

  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        disabled={disabled}
        value={value}
        onValueChange={onCheck}
        tintColors={{ true: color, false: color }}
      />
      <View style={{ marginTop: 2, marginLeft: 8 }}>
        <TouchableOpacity onPress={() => onCheck(value)}>
          <BText bebasFont color={color} size={labelFontSize}>
            {label}
          </BText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
