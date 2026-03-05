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
		titleKg: 'Python негиздери',
		titleEn: 'Python Basics',
		description: 'Основы Python и программирования',
		descriptionKg: 'Python жана программалоо негиздери',
		descriptionEn: 'Python and Programming Basics',
		icon: <FaPython />
	},
	{
		title: 'ООП в Python',
		titleKg: 'Python до ООП',
		titleEn: 'OOP in Python',
		description: 'Объектно-ориентированное программирование в Python',
		descriptionKg: "Python'до объектиге багытталган программалоо",
		descriptionEn: 'Object-Oriented Programming in Python',
		icon: <FaPython />
	},
	{
		title: 'Асинхронность',
		titleKg: 'Асинхронность',
		titleEn: 'Async',
		description: 'Асинхронное программирование в Python с asyncio',
		descriptionKg: 'Ayncio менен Pythonдо асинхрондук программалоо',
		descriptionEn: 'Asynchronous Programming in Python with asyncio',
		icon: <FaClock />
	},
	{
		title: 'Фреймворки',
		titleKg: 'Фреймворктор',
		titleEn: 'Frameworks',
		description: 'Фреймворки: Django, Flask, FastAPI',
		descriptionKg: 'Фреймворктор: Django, Flask, FastAPI',
		descriptionEn: 'Frameworks: Django, Flask, FastAPI',
		icon: <FaCode />
	},
	{
		title: 'Работа с файлами',
		titleKg: 'Файлдар менен иштөө',
		titleEn: 'Working with Files',
		description: 'Чтение и запись файлов, работа с JSON и CSV',
		descriptionKg: 'Файлдарды окуу жана жазуу, JSON жана CSV менен иштөө',
		descriptionEn: 'Reading and Writing Files, Working with JSON and CSV',
		icon: <FaFile />
	},
	{
		title: 'Веб-разработка',
		titleKg: 'Сайт иштеп чыгуу',
		titleEn: 'Web Development',
		description: 'Создание веб-приложений на Django и Flask',
		descriptionKg: 'Django жана Flask менен веб-тиркемелерди түзүү',
		descriptionEn: 'Creating Web Applications with Django and Flask',
		icon: <FaGlobe />
	},
	{
		title: 'Базы данных',
		titleKg: 'Маалымат базалары',
		titleEn: 'Databases',
		description: 'Работа с базами данных: SQLite, PostgreSQL, MongoDB',
		descriptionKg: 'Маалымат базалары менен иштөө: SQLite, PostgreSQL, MongoDB',
		descriptionEn: 'Working with Databases: SQLite, PostgreSQL, MongoDB',
		icon: <FaDatabase />
	},
	{
		title: 'Оптимизация',
		titleKg: 'Оптималдаштыруу',
		titleEn: 'Optimization',
		description:
			'Оптимизация кода, многопоточное и многопроцессное программирование',
		descriptionKg:
			'Кодду оптималдаштыруу, көп тарактый жана көп процессорлу программалоо',
		descriptionEn:
			'Code optimization, multithreaded and multiprocess programming',
		icon: <FaRocket />
	},
	{
		title: 'Практика',
		titleKg: 'Көнүгүү',
		titleEn: 'Practice',
		description: 'Практические проекты и задания',
		descriptionKg: 'Практикалык долбоорлор жана тапшырмалар',
		descriptionEn: 'Practical Projects and Assignments',
		icon: <FaTasks />
	}
];

const ModuleCoursePython: FC = () => {
	const { i18n, t } = useTranslation('translated');
	return (
		<section className={scss.ModuleCoursePython}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconModule />
						<h2>
							{t('python.courseModules.theme')}{' '}
							<span>{t('python.courseModules.custom_theme')}</span>
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

export default ModuleCoursePython;
