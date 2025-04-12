import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationRu from "./locales/ru/translation.json";
import translationEn from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: translationRu,
      },
      en: {
        translation: translationEn,
      },
    },
    lng: "ru", // Стартовый язык
    fallbackLng: "ru", // Запасной язык, если перевод не найден
    interpolation: {
      escapeValue: false, // Отключить экранирование для React
    },
  });

export default i18n;