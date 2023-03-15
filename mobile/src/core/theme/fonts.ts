import {isIOS} from '../utils/platform';

export interface Fonts {
  signum: string;
  roboto: string;
  noto: string;
  bebas: string;
  bebasBold: string;
}

const iOSFonts: Fonts = {
  signum: 'Montserrat',
  roboto: 'Roboto',
  noto: 'Noto Sans',
  bebas: 'Bebas Neue',
  bebasBold: 'Bebas Neue',
};

const androidFonts: Fonts = {
  signum: 'Montserrat-Regular',
  roboto: 'Roboto-Regular',
  noto: 'NotoSansRegular',
  bebas: 'BebasNeueRegular',
  bebasBold: 'BebasNeueBold',
};

export const fonts: Fonts = isIOS ? iOSFonts : androidFonts;
