'use client';
import React, { FC } from 'react';
import scss from './ModuleCourseKids.module.scss';
import {
	FaFolder,
	FaShieldAlt,
	FaWindowRestore,
	FaGlobe,
	FaChartBar,
	FaKeyboard,
	FaPaintBrush,
	FaGamepad
} from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6';
import { IconModule } from '@/assets/icons';
import CustomTitle from '@/ui/title/CustomTitle';

const courseModules = [
	{
		title: 'Знакомство с компьютером',
		description:
			'Научимся включать и выключать компьютер, пользоваться мышкой и клавиатурой!',
		icon: <FaComputer />
	},
	{
		title: 'Безопасность в интернете',
		description:
			'Узнаем, как безопасно пользоваться интернетом и защищать свои данные.',
		icon: <FaShieldAlt />
	},
	{
		title: 'Работа с файлами',
		description: 'Научимся открывать, сохранять и искать файлы на компьютере.',
		icon: <FaFolder />
	},
	{
		title: 'Программы и приложения',
		description:
			'Познакомимся с полезными программами и научимся их запускать!',
		icon: <FaWindowRestore />
	},
	{
		title: 'Интернет и поиск информации',
		description:
			'Узнаем, как находить полезную информацию и пользоваться браузером.',
		icon: <FaGlobe />
	},
	{
		title: 'Первая презентация',
		description:
			'Научимся создавать простые презентации и показывать их друзьям!',
		icon: <FaChartBar />
	},
	{
		title: 'Тайпинг-мастер',
		description:
			'Развиваем скорость печати на клавиатуре с помощью весёлых упражнений.',
		icon: <FaKeyboard />
	},
	{
		title: 'Рисуем на компьютере',
		description:
			'Используем графические программы для создания красивых рисунков!',
		icon: <FaPaintBrush />
	},
	{
		title: 'Весёлая практика',
		description: 'Играем, решаем задания и закрепляем полученные знания!',
		icon: <FaGamepad />
	}
];

const ModuleCourseKids: FC = () => {
	return (
		<section className={scss.ModuleCourseKids}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconModule />
						<CustomTitle spanLeft="Модули" title="курса" color="#ffffff" />
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

export default ModuleCourseKids;
