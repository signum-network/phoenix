import {I18n} from 'i18n-js';
import {findBestAvailableLanguage} from 'react-native-localize';
import en from '../translations/en.json';
import ru from '../translations/ru.json';
import de from '../translations/de.json';
import pt from '../translations/pt.json';

const fallback = {languageTag: 'en', isRTL: false};
const {languageTag} =
  findBestAvailableLanguage(['en-US', 'en', 'ru', 'de', 'pt']) || fallback;

export const i18n = new I18n();

i18n.store({en, ru, de, pt});
i18n.locale = languageTag;
i18n.enableFallback = true;
