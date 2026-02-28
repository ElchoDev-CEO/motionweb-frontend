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
import { useTranslation } from 'react-i18next';

const courseModules = [
	{
		title: 'Знакомство с компьютером',
		titleEn: 'Getting to Know Your Computer',
		description:
			'Научимся включать и выключать компьютер, пользоваться мышкой и клавиатурой!',
		icon: <FaComputer />
	},
	{
		title: 'Безопасность в интернете',
		titleEn: 'Internet Safety',
		description:
			'Узнаем, как безопасно пользоваться интернетом и защищать свои данные.',
		icon: <FaShieldAlt />
	},
	{
		title: 'Работа с файлами',
		titleEn: 'Working with Files',
		description: 'Научимся открывать, сохранять и искать файлы на компьютере.',
		icon: <FaFolder />
	},
	{
		title: 'Программы и приложения',
		titleEn: 'Programs and Applications',
		description:
			'Познакомимся с полезными программами и научимся их запускать!',
		icon: <FaWindowRestore />
	},
	{
		title: 'Интернет и поиск информации',
		titleEn: 'The Internet and Information Search',
		description:
			'Узнаем, как находить полезную информацию и пользоваться браузером.',
		icon: <FaGlobe />
	},
	{
		title: 'Первая презентация',
		titleEn: 'First Presentation',
		description:
			'Научимся создавать простые презентации и показывать их друзьям!',
		icon: <FaChartBar />
	},
	{
		title: 'Тайпинг-мастер',
		titleEn: 'Typing Master',
		description:
			'Развиваем скорость печати на клавиатуре с помощью весёлых упражнений.',
		icon: <FaKeyboard />
	},
	{
		title: 'Рисуем на компьютере',
		titleEn: 'Drawing on the Computer',
		description:
			'Используем графические программы для создания красивых рисунков!',
		icon: <FaPaintBrush />
	},
	{
		title: 'Весёлая практика',
		titleEn: 'Fun Practice',
		description: 'Играем, решаем задания и закрепляем полученные знания!',
		icon: <FaGamepad />
	}
];

const ModuleCourseKids: FC = () => {
	const { i18n, t } = useTranslation('kids');
	return (
		<section className={scss.ModuleCourseKids}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconModule />
						<h2>
							{t('banner.theme')} <span>{t('banner.custom_theme')}</span>
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
