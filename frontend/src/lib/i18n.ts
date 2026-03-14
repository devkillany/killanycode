import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from '../../public/locales/en/common.json';
import common_ar from '../../public/locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: common_en },
      ar: { common: common_ar },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
