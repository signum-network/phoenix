import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { SpacingProps } from '../../interfaces';
import { ColorThemeNames, ThemeColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { SizeNames, ThemeSizes } from '../../theme/sizes';
import { getSizes, getThemeColors } from '../../utils/theme';

interface IProps {
  colorTheme?: ColorThemeNames;
  sizeName?: SizeNames;
}

// Because default theme has blue background and white color;
const defaultColorTheme = ColorThemeNames.white;
const defaultSizeName = SizeNames.m;

type Props = IProps & SpacingProps & TextInputProps;

export class Input extends React.PureComponent<Props> {
  getStyles = (themeColors: ThemeColors, size: ThemeSizes) => {
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
      view: {
        padding,
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
      text: {
        fontFamily: fonts.noto,
        fontSize: size.fontSize,
        color: themeColors.color,
        padding: size.buttonInnerPadding,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.inputBorderColor
      }
    };

    return StyleSheet.create(styles);
  }

  render () {
    const { colorTheme = defaultColorTheme, sizeName = defaultSizeName, editable = true, ...rest } = this.props;
    const themeColors = getThemeColors(colorTheme, !editable);
    const size = getSizes(sizeName);
    const styles = this.getStyles(themeColors, size);

    return (
      <View style={styles.view} >
        <TextInput editable={editable} style={styles.text} {...rest}/>
      </View>
    );
  }
}
