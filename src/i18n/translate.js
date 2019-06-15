import i18n from 'i18n-js';

export const translate = key => (key ? i18n.t(key) : null);

export const translateWithInterpolation = (key, value) =>
  key ? i18n.t(key, value) : null;
