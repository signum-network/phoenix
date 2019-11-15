import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { BorderRadiusSizes, FontSizes, Sizes } from '../../theme/sizes';
import { Text, TextAlign } from './Text';

export enum ButtonThemes {
  DEFAULT = 'DEFAULT',
  ACCENT = 'ACCENT'
}

export enum ButtonSizes {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE'
}

interface Props {
  children: string | JSX.Element | JSX.Element[];
  onPress: () => any;
  loading?: boolean;
  theme?: ButtonThemes;
  size?: ButtonSizes;
  fullWidth?: boolean;
  disabled?: boolean;
}

const defaultTheme = ButtonThemes.DEFAULT;
const defaultSize = ButtonSizes.DEFAULT;

const childrenColors = {
  [ButtonThemes.DEFAULT]: Colors.BLUE,
  [ButtonThemes.ACCENT]: Colors.WHITE
};
const textSizes = {
  [ButtonSizes.DEFAULT]: FontSizes.MEDIUM,
  [ButtonSizes.SMALL]: FontSizes.SMALL,
  [ButtonSizes.LARGE]: FontSizes.LARGE
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Sizes.MEDIUM
  },
  wrapperSmall: {
    padding: Sizes.SMALL
  },
  wrapperLarge: {
    padding: Sizes.LARGE
  },
  button: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: BorderRadiusSizes.MEDIUM,
    borderColor: Colors.BLUE,
    padding: Sizes.MEDIUM
  },
  buttonSmall: {
    padding: Sizes.SMALL,
    borderRadius: BorderRadiusSizes.SMALL
  },
  buttonLarge: {
    padding: Sizes.LARGE,
    borderRadius: BorderRadiusSizes.LARGE
  },
  buttonAccent: {
    backgroundColor: Colors.BLUE,
    borderColor: Colors.BLUE_DARKER
  },
  loader: {
    margin: Sizes.SMALL
  },
  buttonDisabled: {
    opacity: 0.5
  }
});

export const Button: React.FunctionComponent<Props> = (props) => {
  const { size = defaultSize, theme = defaultTheme, disabled } = props;

  const textSize = textSizes[size];
  const childrenColor = (disabled)
    ? Colors.BLACK
    : childrenColors[theme];
  const wrapperStyles = [
    styles.wrapper,
    size === ButtonSizes.SMALL && styles.wrapperSmall,
    size === ButtonSizes.LARGE && styles.wrapperLarge
  ];
  const buttonStyles = [
    styles.button,
    theme === ButtonThemes.ACCENT && styles.buttonAccent,
    size === ButtonSizes.SMALL && styles.buttonSmall,
    size === ButtonSizes.LARGE && styles.buttonLarge,
    disabled && styles.buttonDisabled
  ];

  const handlePress = () => {
    if (!props.disabled && !props.loading) {
      props.onPress();
    }
  };

  const renderLoader = () => {
    return (
      <ActivityIndicator style={styles.loader} animating={true} color={childrenColor} />
    );
  };

  const renderChildren = () => {
    const { children } = props;
    if (typeof children === 'string') {
      return (
        <Text
          color={childrenColor}
          textAlign={TextAlign.CENTER}
          size={textSize}
          disabled={props.disabled}
        >
          {children}
        </Text>
      );
    } else {
      return children;
    }
  };

  return (
    <TouchableOpacity style={wrapperStyles} onPress={handlePress}>
      <View style={buttonStyles}>
        {props.loading ? renderLoader() : renderChildren()}
      </View>
    </TouchableOpacity>
  );
};
