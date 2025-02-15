import { useLanguage } from './useLanguage';
import fr from '../translations/fr';
import en from '../translations/en';
import es from '../translations/es';

const translations = {
  fr,
  en,
  es,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string) => {
    try {
      const keys = key.split('.');
      let value = translations[language as keyof typeof translations];

      for (const k of keys) {
        if (!value?.[k]) {
          console.warn(`Missing translation for key "${key}" in language "${language}"`);
          // Fallback to English if translation is missing
          value = translations['en'];
          for (const fallbackK of keys) {
            value = value?.[fallbackK];
          }
          break;
        }
        value = value[k];
      }

      return value || key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  return { t };
};