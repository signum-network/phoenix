export enum Colors {
  transparent = 'transparent',
  white = '#FFFFFF',
  black = '#262626',
  greyLight = '#F2F2F2',
  grey = '#CDCDCD',
  greyDark = '#595959',
  blue = '#00579D',
  blueDark = '#002341',
  pink = '#E91E63',
  red = '#F44336'
}

export interface ThemeColors {
  color: Colors;
  bgColor: Colors;
  inputBorderColor: Colors;
}

export enum ColorThemeNames {
  default = 'default',
  disabled = 'disabled',
  light = 'light',
  dark = 'dark',
  white = 'white',
  black = 'black',
  warning = 'warning',
  negative = 'negative'
}

interface Themes {
  default: ThemeColors,
  disabled: ThemeColors,
  light: ThemeColors,
  dark: ThemeColors,
  white: ThemeColors,
  black: ThemeColors,
  warning: ThemeColors,
  negative: ThemeColors,
}

export const themeColors: Themes = {
  [ColorThemeNames.default]: {
    color: Colors.white,
    bgColor: Colors.blue,
    inputBorderColor: Colors.blue
  },
  [ColorThemeNames.disabled]: {
    color: Colors.grey,
    bgColor: Colors.greyLight,
    inputBorderColor: Colors.grey
  },
  [ColorThemeNames.light]: {
    color: Colors.greyDark,
    bgColor: Colors.greyLight,
    inputBorderColor: Colors.greyLight
  },
  [ColorThemeNames.dark]: {
    color: Colors.white,
    bgColor: Colors.blueDark,
    inputBorderColor: Colors.blueDark
  },
  [ColorThemeNames.white]: {
    color: Colors.black,
    bgColor: Colors.white,
    inputBorderColor: Colors.blue
  },
  [ColorThemeNames.black]: {
    color: Colors.white,
    bgColor: Colors.black,
    inputBorderColor: Colors.black
  },
  [ColorThemeNames.warning]: {
    color: Colors.white,
    bgColor: Colors.pink,
    inputBorderColor: Colors.pink
  },
  [ColorThemeNames.negative]: {
    color: Colors.white,
    bgColor: Colors.red,
    inputBorderColor: Colors.red
  }
};
