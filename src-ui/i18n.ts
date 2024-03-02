import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import japanese from './locales/ja/translation.json';
import english from './locales/en/translation.json';

// i18n を使ってローカライズ
i18n
    // 
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            ja: {
                translation: japanese
            },
            en: {
                translation: english
            }
        },
        interpolation: {
            escapeValue: false
        }
    })

export default i18n