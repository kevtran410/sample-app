/* eslint-disable global-require */
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const translationGetters = {
  en: () => require('./en.json'),
  vi: () => require('./vi.json'),
};

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en' };

  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

setI18nConfig();
