import { ColorThemeNames, ThemeColors, themeColors } from '../theme/colors';
import { SizeNames, themeSizes, ThemeSizes } from '../theme/sizes';

export function getThemeColors (colorTheme?: ColorThemeNames, disabled?: boolean): ThemeColors {
  const theme = (colorTheme && !disabled) ? colorTheme : ColorThemeNames.disabled;
  return themeColors[theme];
}

export function getSizes (sizeName?: SizeNames): ThemeSizes {
  const name = sizeName ? sizeName : SizeNames.m;
  return themeSizes[name];
}
