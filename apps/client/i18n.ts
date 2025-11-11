import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Osnovni primer prevoda, proširi po potrebi
const resources = {
  sr: {
    translation: {
      pozdrav: "Zdravo!",
      // Dodaj ostale prevode ovde
    },
  },
  en: {
    translation: {
      pozdrav: "Hello!",
      // Add more translations here
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sr', // ili 'en', ili automatski detektuj
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
