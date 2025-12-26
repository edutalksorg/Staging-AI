import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import bnTranslations from './locales/bn.json';
import teTranslations from './locales/te.json';
import mrTranslations from './locales/mr.json';
import taTranslations from './locales/ta.json';
import urTranslations from './locales/ur.json';
import guTranslations from './locales/gu.json';
import knTranslations from './locales/kn.json';
import orTranslations from './locales/or.json';
import mlTranslations from './locales/ml.json';
import paTranslations from './locales/pa.json';
import asTranslations from './locales/as.json';
import maiTranslations from './locales/mai.json';
import saTranslations from './locales/sa.json';

const resources = {
    English: { translation: enTranslations },
    Hindi: { translation: hiTranslations },
    Bengali: { translation: bnTranslations },
    Telugu: { translation: teTranslations },
    Marathi: { translation: mrTranslations },
    Tamil: { translation: taTranslations },
    Urdu: { translation: urTranslations },
    Gujarati: { translation: guTranslations },
    Kannada: { translation: knTranslations },
    Odia: { translation: orTranslations },
    Malayalam: { translation: mlTranslations },
    Punjabi: { translation: paTranslations },
    Assamese: { translation: asTranslations },
    Maithili: { translation: maiTranslations },
    Sanskrit: { translation: saTranslations }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'English',
        lng: localStorage.getItem('edutalks_language_preference') || 'English',

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'edutalks_language_preference'
        },

        interpolation: {
            escapeValue: false // React already escapes values
        },

        react: {
            useSuspense: true
        }
    });

// Listen for language changes from LanguageSelector
window.addEventListener('languageChanged', () => {
    const savedLang = localStorage.getItem('edutalks_language_preference');
    if (savedLang && i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
    }
});

export default i18n;
