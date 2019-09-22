import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { Colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { FontSizes } from '../../theme/sizes';

export enum TextThemes {
  DEFAULT = 'DEFAULT',
  ACCENT = 'ACCENT',
  HEADER = 'HEADER',
  HINT = 'HINT',
  DANGER = 'DANGER'
}

export enum TextAlign {
  AUTO = 'auto',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  JUSTIFY = 'justify'
}

interface Props {
  children: string | string[] | JSX.Element | JSX.Element[];
  bebasFont?: boolean;
  theme?: TextThemes;
  color?: string;
  size?: FontSizes | number;
  disabled?: boolean;
  disabledColor?: Colors | string;
  bold?: boolean;
  thin?: boolean;
  textAlign?: TextAlign;
  selectable?: boolean;
  numberOfLines?: number;
}

const defaultTheme = TextThemes.DEFAULT;
const defaultAlign = TextAlign.LEFT;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.noto,
    fontSize: FontSizes.MEDIUM,
    fontWeight: 'normal',
    textAlign: defaultAlign,
    color: Colors.BLACK
  },
  textAccent: {
    color: Colors.BLUE
  },
  textHeader: {
    color: Colors.BLUE,
    fontFamily: fonts.bebas,
    fontSize: FontSizes.LARGE,
    textAlign: TextAlign.CENTER
  },
  textHint: {
    color: Colors.GREY_DARK,
    fontSize: FontSizes.SMALL
  },
  textDanger: {
    color: Colors.PINK,
    fontSize: FontSizes.SMALL,
    textAlign: TextAlign.CENTER
  },
  textDisabled: {
    color: Colors.GREY
  }
});

// TODO: Create new universal text component according to mockups
export const Text: React.FunctionComponent<Props> = (props) => {
  const { theme = defaultTheme,
    textAlign,
    color,
    bebasFont,
    size,
    disabled,
    disabledColor,
    bold,
    thin,
    numberOfLines
  } = props;
  const style: any = [
    styles.text,
    theme === TextThemes.ACCENT && styles.textAccent,
    theme === TextThemes.DANGER && styles.textDanger,
    theme === TextThemes.HEADER && styles.textHeader,
    theme === TextThemes.HINT && styles.textHint,
    textAlign && { textAlign },
    color && { color },
    bebasFont && { fontFamily: fonts.bebas },
    size && { fontSize: size },
    disabled && styles.textDisabled,
    disabledColor && { color: disabledColor },
    bold && { fontWeight: '500' },
    thin && { fontWeight: '400' }
  ];

  return (
    <RNText style={style} selectable={props.selectable} numberOfLines={numberOfLines}>
      {props.children}
    </RNText>
  );
};
