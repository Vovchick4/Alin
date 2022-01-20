import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en.json'
import uk from '../locales/uk.json'
import { setLocale } from './axios';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en,
        uk,
    },
    supportedLngs: ['en', 'uk'],
    lng: 'en',
});

i18next.on('languageChanged', (lng) => setLocale(lng))
