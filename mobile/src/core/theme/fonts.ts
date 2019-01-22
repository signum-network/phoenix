import { isIOS } from '../utils/platform';

export interface IFonts {
  noto: string
  bebas: string
}

const iOSFonts: IFonts = {
  noto: 'Noto Sans',
  bebas: 'Bebas Neue'
};

// TODO: need tests, maybe not working
const androidFonts: IFonts = {
  noto: 'NotoSansRegular',
  bebas: 'BebasNeueRegular'
};

export const fonts: IFonts = isIOS ? iOSFonts : androidFonts;
