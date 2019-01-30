import React from 'react';
import { ActivityIndicatorComponent, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { SpacingProps } from '../../interfaces';
import { ColorThemeNames, ThemeColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { SizeNames, ThemeSizes } from '../../theme/sizes';
import { getSizes, getThemeColors } from '../../utils/theme';
import { Text, TextAlign } from './Text';

interface Props extends TouchableOpacityProps, SpacingProps {
  children: string | JSX.Element | JSX.Element[];
  onPress: () => any;
  loading?: boolean;
  colorTheme?: ColorThemeNames;
  sizeName?: SizeNames;
}

const defaultColorTheme = ColorThemeNames.default;
const defaultSizeName = SizeNames.m;

/**
 * Standard button component from React Native, but with our fonts and styles.
 *
 * NOTE: if you pass custom style properties, you should set font manually.
 */
export class Button extends React.PureComponent<Props> {
  getStyles = (themeColors: ThemeColors, size: ThemeSizes): any => {
    const {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginHor,
      marginVert,
      margin,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingHor,
      paddingVert,
      padding
    } = this.props;

    const styles: any = {
      touchable: {
        padding: !padding ? size.buttonOuterPadding : padding,
        marginHorizontal: marginHor,
        marginVertical: marginVert,
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingHorizontal: paddingHor,
        paddingVertical: paddingVert,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      },
      view: {
        fontFamily: fonts.noto,
        backgroundColor: themeColors.bgColor,
        color: themeColors.color,
        padding: size.buttonInnerPadding,
        borderRadius: size.borderRadius
      }
    };

    return StyleSheet.create(styles);
  }

  handlePress = () => {
    const { disabled, onPress } = this.props;
    if (!disabled) {
      onPress();
    }
  }

  renderLoader = (themeColors: ThemeColors) => {
    return (
      <ActivityIndicatorComponent animating={true} color={themeColors.color} size={'small'} />
    );
  }

  renderChildren = (colorTheme: ColorThemeNames, sizeName: SizeNames) => {
    const { children, disabled } = this.props;
    if (typeof children === 'string') {
      return (
        <Text
          colorTheme={colorTheme}
          textAlign={TextAlign.center}
          sizeName={sizeName}
          disabled={disabled}
        >
          {children}
        </Text>
      );
    } else {
      return children;
    }
  }

  render () {
    const { loading, colorTheme = defaultColorTheme, sizeName = defaultSizeName, disabled, ...rest } = this.props;
    const themeColors = getThemeColors(colorTheme, disabled);
    const size = getSizes(sizeName);
    const styles = this.getStyles(themeColors, size);

    return (
      <TouchableOpacity style={styles.touchable} {...rest} onPress={this.handlePress}>
        <View style={styles.view}>
          {loading ? this.renderLoader(themeColors) : this.renderChildren(colorTheme, sizeName)}
        </View>
      </TouchableOpacity>
    );
  }
}
