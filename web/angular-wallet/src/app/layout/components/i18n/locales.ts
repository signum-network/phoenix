import {registerLocaleData} from '@angular/common';
import localeBg from '@angular/common/locales/bg';
import localeBgExtra from '@angular/common/locales/extra/bg';
import localeCa from '@angular/common/locales/ca';
import localeCaExtra from '@angular/common/locales/extra/ca';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEl from '@angular/common/locales/el';
import localeElExtra from '@angular/common/locales/extra/el';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import localeFi from '@angular/common/locales/fi';
import localeFiExtra from '@angular/common/locales/extra/fi';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeGl from '@angular/common/locales/gl';
import localeGlExtra from '@angular/common/locales/extra/gl';
import localeHi from '@angular/common/locales/hi';
import localeHiExtra from '@angular/common/locales/extra/hi';
import localeHr from '@angular/common/locales/hr';
import localeHrExtra from '@angular/common/locales/extra/hr';
import localeId from '@angular/common/locales/id';
import localeIdExtra from '@angular/common/locales/extra/id';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
import localeJa from '@angular/common/locales/ja';
import localeJaExtra from '@angular/common/locales/extra/ja';
import localeLt from '@angular/common/locales/lt';
import localeLtExtra from '@angular/common/locales/extra/lt';
import localeNl from '@angular/common/locales/nl';
import localeNlExtra from '@angular/common/locales/extra/nl';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import localePtBr from '@angular/common/locales/pt';
import localePtBrExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt-PT';
import localePtExtra from '@angular/common/locales/extra/pt-PT';
import localeRo from '@angular/common/locales/ro';
import localeRoExtra from '@angular/common/locales/extra/ro';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import localeSh from '@angular/common/locales/shi';
import localeShExtra from '@angular/common/locales/extra/shi';
import localeSk from '@angular/common/locales/sk';
import localeSkExtra from '@angular/common/locales/extra/sk';
import localeSr from '@angular/common/locales/sr';
import localeSrExtra from '@angular/common/locales/extra/sr';
import localeSrCs from '@angular/common/locales/sr-Cyrl';
import localeSrCsExtra from '@angular/common/locales/extra/sr-Cyrl';
import localeTr from '@angular/common/locales/tr';
import localeTrExtra from '@angular/common/locales/extra/tr';
import localeUk from '@angular/common/locales/uk';
import localeUkExtra from '@angular/common/locales/extra/uk';
import localeZhCn from '@angular/common/locales/zh-Hans';
import localeZhCnExtra from '@angular/common/locales/extra/zh-Hans';
import localeZhTw from '@angular/common/locales/zh-Hant';
import localeZhTwExtra from '@angular/common/locales/extra/zh-Hant';

export const registerLocales = () => {
  registerLocaleData(localeBg, 'bg', localeBgExtra);
  registerLocaleData(localeCa, 'ca', localeCaExtra);
  registerLocaleData(localeCs, 'cs', localeCsExtra);
  registerLocaleData(localeDe, 'de-de', localeDeExtra);
  registerLocaleData(localeEl, 'el', localeElExtra);
  registerLocaleData(localeEs, 'es-es', localeEsExtra);
  registerLocaleData(localeFi, 'fi', localeFiExtra);
  registerLocaleData(localeFr, 'fr', localeFrExtra);
  registerLocaleData(localeGl, 'gl', localeGlExtra);
  registerLocaleData(localeHi, 'hi', localeHiExtra);
  registerLocaleData(localeHr, 'hr', localeHrExtra);
  registerLocaleData(localeId, 'id', localeIdExtra);
  registerLocaleData(localeIt, 'it', localeItExtra);
  registerLocaleData(localeJa, 'ja', localeJaExtra);
  registerLocaleData(localeLt, 'lt', localeLtExtra);
  registerLocaleData(localeNl, 'nl', localeNlExtra);
  registerLocaleData(localePl, 'pl', localePlExtra);
  registerLocaleData(localePtBr, 'pt-br', localePtBrExtra);
  registerLocaleData(localePt, 'pt-pt', localePtExtra);
  registerLocaleData(localeRo, 'ro', localeRoExtra);
  registerLocaleData(localeRu, 'ru', localeRuExtra);
  registerLocaleData(localeSh, 'sh', localeShExtra);
  registerLocaleData(localeSrCs, 'sr-cs', localeSrCsExtra);
  registerLocaleData(localeSk, 'sk', localeSkExtra);
  registerLocaleData(localeSr, 'sr', localeSrExtra);
  registerLocaleData(localeTr, 'tr', localeTrExtra);
  registerLocaleData(localeUk, 'uk', localeUkExtra);
  registerLocaleData(localeZhCn, 'zh-cn', localeZhCnExtra);
  registerLocaleData(localeZhTw, 'zh-tw', localeZhTwExtra);
};

export interface NumberSeparator {
  thousand: string;
  decimal: string;
}
export const DecimalDot: NumberSeparator = { thousand: ',', decimal: '.'};
export const DecimalComma: NumberSeparator = { thousand: '.', decimal: ','};

export const numberFormatLocales = {
  'bg': DecimalComma,
  'ca': DecimalComma,
  'cs': DecimalComma,
  'de-de': DecimalComma,
  'el': DecimalComma,
  'en': DecimalDot,
  'es-es': DecimalComma,
  'fi': DecimalComma,
  'fr': DecimalComma,
  'gl': DecimalComma,
  'hi': DecimalDot,
  'hr': DecimalComma,
  'id': DecimalComma,
  'it': DecimalComma,
  'ja': DecimalDot,
  'lt': DecimalComma,
  'nl': DecimalComma,
  'pl': DecimalComma,
  'pt-br': DecimalComma,
  'pt-pt': DecimalComma,
  'ro': DecimalComma,
  'ru': DecimalComma,
  'sh': DecimalComma,
  'sr-cs': DecimalComma,
  'sk': DecimalComma,
  'sr': DecimalComma,
  'tr': DecimalComma,
  'uk': DecimalComma,
  'zh-cn': DecimalDot,
  'zh-tw': DecimalDot,
};
