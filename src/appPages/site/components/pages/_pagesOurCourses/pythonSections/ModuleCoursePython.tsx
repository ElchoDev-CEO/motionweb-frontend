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

const courseModules = [
	{
		title: 'Основы Python',
		description: 'Основы Python и программирования',
		icon: <FaPython />
	},
	{
		title: 'ООП в Python',
		description: 'Объектно-ориентированное программирование в Python',
		icon: <FaPython />
	},
	{
		title: 'Асинхронность',
		description: 'Асинхронное программирование в Python с asyncio',
		icon: <FaClock />
	},
	{
		title: 'Фреймворки',
		description: 'Фреймворки: Django, Flask, FastAPI',
		icon: <FaCode />
	},
	{
		title: 'Работа с файлами',
		description: 'Чтение и запись файлов, работа с JSON и CSV',
		icon: <FaFile />
	},
	{
		title: 'Веб-разработка',
		description: 'Создание веб-приложений на Django и Flask',
		icon: <FaGlobe />
	},
	{
		title: 'Базы данных',
		description: 'Работа с базами данных: SQLite, PostgreSQL, MongoDB',
		icon: <FaDatabase />
	},
	{
		title: 'Оптимизация',
		description:
			'Оптимизация кода, многопоточное и многопроцессное программирование',
		icon: <FaRocket />
	},
	{
		title: 'Практика',
		description: 'Практические проекты и задания',
		icon: <FaTasks />
	}
];

const ModuleCoursePython: FC = () => {
	return (
		<section className={scss.ModuleCoursePython}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconModule />
						<h2>
							Модули <span>курса</span>
						</h2>
					</div>
					<div className={scss.cards}>
						{courseModules.map((item, index) => (
							<React.Fragment key={index}>
								<div className={scss.card}>
									<h2 className={scss.title}>
										<span className={scss.icon}>{item.icon}</span>
										{item.title}
									</h2>
									<p className={scss.description}>{item.description}</p>
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
