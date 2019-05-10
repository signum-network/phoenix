import i18nJS from 'i18n-js';
import { findBestAvailableLanguage } from 'react-native-localize';
import en from '../translations/en.json';
import ru from '../translations/ru.json';

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } = findBestAvailableLanguage(['en-US', 'en', 'ru']) || fallback;

i18nJS.locale = languageTag;
i18nJS.fallbacks = true;
i18nJS.translations = { en, ru };

export const i18n = i18nJS;
