import { isIOS } from '../utils/platform';

export interface Fonts {
  noto: string;
  bebas: string;
  bebasBold: string;
}

const iOSFonts: Fonts = {
  noto: 'Noto Sans',
  bebas: 'Bebas Neue',
  bebasBold: 'Bebas Neue'
};

const androidFonts: Fonts = {
  noto: 'NotoSansRegular',
  bebas: 'BebasNeueRegular',
  bebasBold: 'BebasNeueBold'
};

export const fonts: Fonts = isIOS ? iOSFonts : androidFonts;
