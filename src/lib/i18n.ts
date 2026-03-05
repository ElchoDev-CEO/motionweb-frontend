'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enLang, kgLang, ruLang } from '../../public/locales';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: 'kg',
		fallbackLng: 'kg',
		ns: ['translated'],
		resources: {
			en: {
				translated: enLang
			},
			ru: {
				translated: ruLang
			},
			kg: {
				translated: kgLang
			}
		},
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
