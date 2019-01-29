import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { SpacingProps } from '../../interfaces';
import { ColorThemeNames, ThemeColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { SizeNames, ThemeSizes } from '../../theme/sizes';
import { getSizes, getThemeColors } from '../../utils/theme';

type TTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export enum TextAlign {
  auto = 'auto',
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify'
}

interface Props extends TextProps, SpacingProps {
  children: string | string[];
  isHeader?: boolean;
  // TODO: think about it. Maybe remove theme props.
  colorTheme?: ColorThemeNames;
  sizeName?: SizeNames;
  disabled?: boolean;
  textAlign?: TTextAlign;
  color?: string;
}

// Because default theme has blue background and white color;
const defaultColorTheme = ColorThemeNames.white;

const defaultSizeName = SizeNames.m;
const defaultTextAlign = TextAlign.left;

/**
 * Standard text component from React Native, but with our fonts.
 * isHeader stands for font that we use for headers - Bebas Neue.
 *
 * NOTE: if you pass custom style properties, you should set font manually.
 */
export class Text extends React.PureComponent<Props> {
  getStyles = (themeColors: ThemeColors, size: ThemeSizes, textAlign: string): any => {
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
      padding,
      color
    } = this.props;

    const styles = {
      text: {
        fontFamily: this.props.isHeader ? fonts.bebas : fonts.noto,
        color: color ? color : themeColors.color,
        fontSize: size.fontSize,
        textAlign,
        marginHorizontal: marginHor,
        marginVertical: marginVert,
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingHorizontal: paddingHor,
        paddingVertical: paddingVert,
        padding,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      }
    };

    return StyleSheet.create(styles as any);
  }

  render () {
    const {
      children,
      colorTheme = defaultColorTheme,
      sizeName = defaultSizeName,
      textAlign = defaultTextAlign,
      disabled
    } = this.props;

    const themeColors = getThemeColors(colorTheme, disabled);
    const size = getSizes(sizeName);
    const styles = this.getStyles(themeColors, size, textAlign);

    return (
      <RNText style={styles.text} {...this.props}>
        {children}
      </RNText>
    );
  }
}
