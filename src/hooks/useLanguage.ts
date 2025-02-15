import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'fr',
  setLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      set({ language: lang });
    } catch (error) {
      console.error('Error setting language:', error);
    }
  },
}));

// Initialize language from storage
AsyncStorage.getItem('app_language').then((storedLang) => {
  if (storedLang) {
    useLanguage.getState().setLanguage(storedLang);
  }
});