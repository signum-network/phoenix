import i18nJS from 'i18n-js';
import RNLanguages from 'react-native-languages';
import en from './translations/en.json';
import ru from './translations/ru.json';

i18nJS.locale = RNLanguages.language;
i18nJS.fallbacks = true;
i18nJS.translations = { en, ru };

export const i18n = i18nJS;
