'use client';
import React, { FC } from 'react';
import scss from './ModuleCoursePython.module.scss';
import {
	FaClock,
	FaDatabase,
	FaRocket,
	FaTasks,
	FaPython,
	FaCode,
	FaFile,
	FaGlobe
} from 'react-icons/fa';
import { IconModule } from '@/assets/icons';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

const courseModules = [
	{
		title: 'Основы Python',
		titleEn: 'Python Basics',
		description: 'Основы Python и программирования',
		descriptionEn: 'Python and Programming Basics',
		icon: <FaPython />
	},
	{
		title: 'ООП в Python',
		titleEn: 'OOP in Python',
		description: 'Объектно-ориентированное программирование в Python',
		descriptionEn: 'Object-Oriented Programming in Python',
		icon: <FaPython />
	},
	{
		title: 'Асинхронность',
		titleEn: 'Async',
		description: 'Асинхронное программирование в Python с asyncio',
		descriptionEn: 'Asynchronous Programming in Python with asyncio',
		icon: <FaClock />
	},
	{
		title: 'Фреймворки',
		titleEn: 'Frameworks',
		description: 'Фреймворки: Django, Flask, FastAPI',
		descriptionEn: 'Frameworks: Django, Flask, FastAPI',
		icon: <FaCode />
	},
	{
		title: 'Работа с файлами',
		titleEn: 'Working with Files',
		description: 'Чтение и запись файлов, работа с JSON и CSV',
		descriptionEn: 'Reading and Writing Files, Working with JSON and CSV',
		icon: <FaFile />
	},
	{
		title: 'Веб-разработка',
		titleEn: 'Web Development',
		description: 'Создание веб-приложений на Django и Flask',
		descriptionEn: 'Creating Web Applications with Django and Flask',
		icon: <FaGlobe />
	},
	{
		title: 'Базы данных',
		titleEn: 'Databases',
		description: 'Работа с базами данных: SQLite, PostgreSQL, MongoDB',
		descriptionEn: 'Working with Databases: SQLite, PostgreSQL, MongoDB',
		icon: <FaDatabase />
	},
	{
		title: 'Оптимизация',
		titleEn: 'Optimization',
		description:
			'Оптимизация кода, многопоточное и многопроцессное программирование',
		descriptionEn:
			'Code optimization, multithreaded and multiprocess programming',
		icon: <FaRocket />
	},
	{
		title: 'Практика',
		titleEn: 'Practice',
		description: 'Практические проекты и задания',
		descriptionEn: 'Practical Projects and Assignments',
		icon: <FaTasks />
	}
];

const ModuleCoursePython: FC = () => {
	const { i18n, t } = useTranslation('python');
	return (
		<section className={scss.ModuleCoursePython}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconModule />
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
										{i18n.language === 'ru' ? item.title : item.titleEn}
									</h2>
									<p className={scss.description}>
										{i18n.language === 'ru'
											? item.description
											: item.descriptionEn}
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

export default ModuleCoursePython;
