'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
	TranslateFSEn,
	TranslateHeaderEn,
	TranslateHomeEn,
	TranslateKidsEn,
	TranslateLoginEn,
	TranslateMyCoursesEn,
	TranslateMyGroupsEn,
	TranslatePythonEn,
	TranslateRegisterEn
} from '../../public/locales/en';
import {
	TranslateFSRu,
	TranslateHeaderRu,
	TranslateHomeRu,
	TranslateKidsRu,
	TranslateLoginRu,
	TranslateMyCoursesRu,
	TranslateMyGroupsRu,
	TranslatePythonRu,
	TranslateRegisterRu
} from '../../public/locales/ru';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: 'ru',
		fallbackLng: 'ru',
		ns: [
			'home',
			'header',
			'myCourses',
			'myGroups',
			'register',
			'login',
			'FS',
			'python',
			'kids'
		],
		resources: {
			en: {
				home: TranslateHomeEn,
				header: TranslateHeaderEn,
				myCourses: TranslateMyCoursesEn,
				myGroups: TranslateMyGroupsEn,
				register: TranslateRegisterEn,
				login: TranslateLoginEn,
				FS: TranslateFSEn,
				python: TranslatePythonEn,
				kids: TranslateKidsEn
			},
			ru: {
				home: TranslateHomeRu,
				header: TranslateHeaderRu,
				myCourses: TranslateMyCoursesRu,
				myGroups: TranslateMyGroupsRu,
				register: TranslateRegisterRu,
				login: TranslateLoginRu,
				FS: TranslateFSRu,
				python: TranslatePythonRu,
				kids: TranslateKidsRu
			}
		},
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
