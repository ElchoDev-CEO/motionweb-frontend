'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
	TranslateCourseEn,
	TranslateFooterEn,
	TranslateFSEn,
	TranslateGroupEn,
	TranslateHeaderEn,
	TranslateHomeEn,
	TranslateITclubEn,
	TranslateKidsEn,
	TranslateLoginEn,
	TranslateMyCoursesEn,
	TranslateMyGroupsEn,
	TranslatePythonEn,
	TranslateRegisterEn,
	TranslateUserEn,
	TranslateUsersEn
} from '../../public/locales/en';
import {
	TranslateCourseRu,
	TranslateFooterRu,
	TranslateFSRu,
	TranslateGroupRu,
	TranslateHeaderRu,
	TranslateHomeRu,
	TranslateITclubRu,
	TranslateKidsRu,
	TranslateLoginRu,
	TranslateMyCoursesRu,
	TranslateMyGroupsRu,
	TranslatePythonRu,
	TranslateRegisterRu,
	TranslateUserRu,
	TranslateUsersRu
} from '../../public/locales/ru';
import {
	TranslateCourseKg,
	TranslateFooterKg,
	TranslateFSKg,
	TranslateGroupKg,
	TranslateHeaderKg,
	TranslateHomeKg,
	TranslateITclubKg,
	TranslateKidsKg,
	TranslateLoginKg,
	TranslateMyCoursesKg,
	TranslateMyGroupsKg,
	TranslatePythonKg,
	TranslateRegisterKg,
	TranslateUserKg,
	TranslateUsersKg
} from '../../public/locales/kg';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: 'kg',
		fallbackLng: 'kg',
		ns: [
			'home',
			'header',
			'myCourses',
			'myGroups',
			'register',
			'login',
			'FS',
			'python',
			'kids',
			'ITclub',
			'users',
			'group',
			'course',
			'user',
			'footer'
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
				kids: TranslateKidsEn,
				ITclub: TranslateITclubEn,
				users: TranslateUsersEn,
				group: TranslateGroupEn,
				course: TranslateCourseEn,
				user: TranslateUserEn,
				footer: TranslateFooterEn
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
				kids: TranslateKidsRu,
				ITclub: TranslateITclubRu,
				users: TranslateUsersRu,
				group: TranslateGroupRu,
				course: TranslateCourseRu,
				user: TranslateUserRu,
				footer: TranslateFooterRu
			},
			kg: {
				home: TranslateHomeKg,
				header: TranslateHeaderKg,
				myCourses: TranslateMyCoursesKg,
				myGroups: TranslateMyGroupsKg,
				register: TranslateRegisterKg,
				login: TranslateLoginKg,
				FS: TranslateFSKg,
				python: TranslatePythonKg,
				kids: TranslateKidsKg,
				ITclub: TranslateITclubKg,
				users: TranslateUsersKg,
				group: TranslateGroupKg,
				course: TranslateCourseKg,
				user: TranslateUserKg,
				footer: TranslateFooterKg
			}
		},
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
