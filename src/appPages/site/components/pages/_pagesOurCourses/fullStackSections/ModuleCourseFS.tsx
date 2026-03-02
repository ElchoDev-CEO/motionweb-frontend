'use client';
import React, { FC } from 'react';
import scss from './ModuleCourseFS.module.scss';
import {
	FaJs,
	FaClock,
	FaReact,
	FaNodeJs,
	FaDatabase,
	FaRocket,
	FaTasks
} from 'react-icons/fa';
import { GiCurledLeaf } from 'react-icons/gi';
import { IoIosLeaf } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const courseModules = [
	{
		title: 'Основы JavaScript',
		titleKg: 'JavaScript негиздери',
		titleEn: 'JavaScript Basics',
		description: 'Основы JavaScript и программирования',
		descriptionKg: 'JavaScript жана программалоо негиздери',
		descriptionEn: 'JavaScript Basics and Programming Fundamentals',
		icon: <FaJs />
	},
	{
		title: 'Основы JavaScript',
		titleKg: 'JavaScript негиздери',
		titleEn: 'JavaScript Basics',
		description: 'Объектно-ориентированное программирование в JavaScript',
		descriptionKg: 'JavaScript объект-ориентирленген программалоо',
		descriptionEn: 'Object-oriented programming in JavaScript',
		icon: <FaJs />
	},
	{
		title: 'Асинхронное программирование',
		titleKg: 'Асинхрондук программалоо',
		titleEn: 'Asynchronous programming',
		description: 'Асинхронное программирование и обработка событий',
		descriptionKg: 'Асинхронное программалоо жана окуяларды иштетүү',
		descriptionEn: 'Asynchronous programming and event handling',
		icon: <FaClock />
	},
	{
		title: 'Фреймворки',
		titleKg: 'Фреймворктор',
		titleEn: 'Frameworks',
		description: 'Фреймворки: React.js, Angular, или Vue.js',
		descriptionKg: 'Фреймворктор: React.js, Angular, же Vue.js',
		descriptionEn: 'Frameworks: React.js, Angular, or Vue.js',
		icon: <FaReact />
	},
	{
		title: 'Основы JavaScript',
		titleKg: 'JavaScript негиздери',
		titleEn: 'JavaScript Basics',
		description: 'Объектно-ориентированное программирование в JavaScript',
		descriptionKg: 'JavaScript объект-ориентирленген программалоо',
		descriptionEn: 'Object-oriented programming in JavaScript',
		icon: <FaJs />
	},
	{
		title: 'Node.js',
		titleKg: 'Node.js',
		titleEn: 'Node.js',
		description: 'Node.js и разработка серверной части приложений',
		descriptionKg: 'Node.js жана сервердик колдонмолорду иштеп чыгуу',
		descriptionEn: 'Node.js and server-side application development',
		icon: <FaNodeJs />
	},
	{
		title: 'База данных',
		titleKg: 'Маалымат базасы',
		titleEn: 'Database',
		description: 'Работа с базами данных: MongoDB, MySQL, PostgreSQL',
		descriptionKg: 'Маалымат базалары менен иштөө: MongoDB, MySQL, PostgreSQL',
		descriptionEn: 'Working with databases: MongoDB, MySQL, PostgreSQL',
		icon: <FaDatabase />
	},
	{
		title: 'Оптимизация',
		titleKg: 'Оптимизация',
		titleEn: 'Optimization',
		description: 'Оптимизация производительности и безопасности приложений',
		descriptionKg: 'Колдонмолордун иштешин жана коопсуздугун оптималдаштыруу',
		descriptionEn: 'Optimizing performance and application security',
		icon: <FaRocket />
	},
	{
		title: 'Практика',
		titleKg: 'Көнүгүү',
		titleEn: 'Practice',
		description: 'Проектная работа и практикум',
		descriptionKg: 'Проекттик иш жана практикум',
		descriptionEn: 'Project work and practicum',
		icon: <FaTasks />
	}
];

const ModuleCourseFS: FC = () => {
	const { i18n, t } = useTranslation('FS');
	return (
		<section className={scss.ModuleCourseFS}>
			<GiCurledLeaf className={scss.decor_1} />
			<IoIosLeaf className={scss.decor_2} />

			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<h2>
							{t('courseModules.theme')}{' '}
							<span>{t('courseModules.custom_theme')}</span>
						</h2>
					</div>
					<div className={scss.cards}>
						{courseModules.map((item, index) => (
							<React.Fragment key={index}>
								<div className={scss.card}>
									<h2 className={scss.title}>
										<span className={scss.icon}>{item.icon}</span>
										{i18n.language === 'en'
											? item.titleEn
											: i18n.language === 'kg'
												? item.titleKg
												: item.title}
									</h2>
									<p className={scss.description}>
										{i18n.language === 'en'
											? item.descriptionEn
											: i18n.language === 'kg'
												? item.descriptionKg
												: item.description}
									</p>
								</div>
								{index !== courseModules.length - 1 && (
									<span className={scss.line}></span>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModuleCourseFS;
