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
import { GiCurledLeaf } from "react-icons/gi";
import { IoIosLeaf } from "react-icons/io";


const courseModules = [
	{
		title: 'Основы JavaScript',
		description: 'Основы JavaScript и программирования',
		icon: <FaJs />
	},
	{
		title: 'Основы JavaScript',
		description: 'Объектно-ориентированное программирование в JavaScript',
		icon: <FaJs />
	},
	{
		title: 'Асинхронное программирование',
		description: 'Асинхронное программирование и обработка событий',
		icon: <FaClock />
	},
	{
		title: 'Фреймворки',
		description: 'Фреймворки: React.js, Angular, или Vue.js',
		icon: <FaReact />
	},
	{
		title: 'Основы JavaScript',
		description: 'Объектно-ориентированное программирование в JavaScript',
		icon: <FaJs />
	},
	{
		title: 'Node.js',
		description: 'Node.js и разработка серверной части приложений',
		icon: <FaNodeJs />
	},
	{
		title: 'База данных',
		description: 'Работа с базами данных: MongoDB, MySQL, PostgreSQL',
		icon: <FaDatabase />
	},
	{
		title: 'Оптимизация',
		description: 'Оптимизация производительности и безопасности приложений',
		icon: <FaRocket />
	},
	{
		title: 'Практика',
		description: 'Проектная работа и практикум',
		icon: <FaTasks />
	}
];

const ModuleCourseFS: FC = () => {
	return (
		<section className={scss.ModuleCourseFS}>
			<GiCurledLeaf className={scss.decor_1} />
			<IoIosLeaf className={scss.decor_2} />

			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
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

export default ModuleCourseFS;
