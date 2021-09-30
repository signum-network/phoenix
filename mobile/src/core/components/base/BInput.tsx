import * as React from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputEndEditingEventData,
  View,
} from "react-native";
import { Colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";
import { FontSizes, Sizes } from "../../theme/sizes";
import { Text as BText } from "./Text";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onEndEditing?: (
    value: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  keyboard?: KeyboardTypes;
  title?: string;
  placeholder?: string;
  rightIcons?: React.ReactElement;
  editable?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export enum KeyboardTypes {
  DEFAULT = "default",
  EMAIL = "email-address",
  NUMERIC = "numeric",
  PHONE = "phone-pad",
}

export class BInput extends React.PureComponent<Props> {
  styles: any = {
    wrapper: {
      borderColor: Colors.BLUE,
      borderWidth: 1,
      borderRadius: 4,
      padding: Sizes.MEDIUM,
      backgroundColor: Colors.BLACK_T,
      marginBottom: Sizes.MEDIUM,
      flexDirection: "row",
    },
    input: {
      fontFamily: fonts.roboto,
      letterSpacing: -1,
      fontSize: FontSizes.MEDIUM,
      fontWeight: "500",
      backgroundColor: Colors.TRANSPARENT,
      height: 25,
      padding: 0,
      width: "100%",
      flex: 1,
    },
    end: {
      marginLeft: "auto",
    },
  };

  getInputStyle = () => {
    return {
      ...this.styles.input,
      color:
        this.props.editable || this.props.editable === undefined
          ? Colors.WHITE
          : Colors.GREY,
    };
  };

  render() {
    const {
      editable,
      title,
      value,
      onChange,
      placeholder,
      keyboard,
      onEndEditing,
      rightIcons,
      autoCapitalize,
    } = this.props;

    return (
      <View>
        {title ? (
          <BText color={Colors.WHITE} size={FontSizes.SMALLER}>
            {title}
          </BText>
        ) : null}
        <View style={this.styles.wrapper}>
          <TextInput
            editable={editable}
            onEndEditing={onEndEditing}
            value={value}
            onChangeText={onChange}
            style={this.getInputStyle()}
            autoCapitalize={autoCapitalize || "none"}
            autoCorrect={false}
            keyboardType={keyboard}
            returnKeyType={"done"}
            placeholder={placeholder}
            placeholderTextColor={Colors.GREY_TT}
          />
          <View style={this.styles.end}>{rightIcons}</View>
        </View>
      </View>
    );
  }
}
