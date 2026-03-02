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
		titleKg: 'Компьютер менен таанышуу',
		titleEn: 'Getting to Know Your Computer',
		description:
			'Научимся включать и выключать компьютер, пользоваться мышкой и клавиатурой!',
		descriptionKg:
			'Келгиле, компьютерди күйгүзүп, өчүрүүнү, чычканды жана клавиатураны колдонууну үйрөнөлү!',
		descriptionEn:
			"Let's learn how to turn on and off the computer, use the mouse and keyboard!",
		icon: <FaComputer />
	},
	{
		title: 'Безопасность в интернете',
		titleKg: 'Интернет коопсуздугу',
		titleEn: 'Internet Safety',
		description:
			'Узнаем, как безопасно пользоваться интернетом и защищать свои данные.',
		descriptionKg:
			'Келгиле, интернетти кантип коопсуз колдонууну жана маалыматыңызды коргоону үйрөнөлү.',
		descriptionEn:
			'Learn how to use the Internet safely and protect your data.',
		icon: <FaShieldAlt />
	},
	{
		title: 'Работа с файлами',
		titleKg: 'Файлдар менен иштөө',
		titleEn: 'Working with Files',
		description: 'Научимся открывать, сохранять и искать файлы на компьютере.',
		descriptionKg: 'Компьютерде файлдарды ачып, сактоо жана издөө үйрөнүбүз.',
		descriptionEn:
			"Let's learn how to open, save, and search for files on your computer.",
		icon: <FaFolder />
	},
	{
		title: 'Программы и приложения',
		titleKg: 'Программалар жана приложениялар',
		titleEn: 'Programs and Applications',
		description:
			'Познакомимся с полезными программами и научимся их запускать!',
		descriptionKg:
			'Келгиле, пайдалуу программалар менен таанышып, аларды ишке киргизүүнү үйрөнөлү!',
		descriptionEn:
			"Let's get acquainted with useful programs and learn how to run them!",
		icon: <FaWindowRestore />
	},
	{
		title: 'Интернет и поиск информации',
		titleKg: 'Интернет жана маалымат издөө',
		titleEn: 'The Internet and Information Search',
		description:
			'Узнаем, как находить полезную информацию и пользоваться браузером.',
		descriptionKg:
			'Пайдалуу маалыматты кантип табууну жана браузерди колдонууну уйронуунуз.',
		descriptionEn:
			'We will learn how to find useful information and use the browser.',
		icon: <FaGlobe />
	},
	{
		title: 'Первая презентация',
		titleKg: 'Биринчи презентация',
		titleEn: 'First Presentation',
		description:
			'Научимся создавать простые презентации и показывать их друзьям!',
		descriptionKg:
			'Келгиле, жөнөкөй презентацияларды түзүүнү жана досторуңузга көрсөтүүнү үйрөнөлү!',
		descriptionEn:
			"Let's learn how to create simple presentations and show them to your friends!",
		icon: <FaChartBar />
	},
	{
		title: 'Тайпинг-мастер',
		titleKg: 'Тайпинг-мастер',
		titleEn: 'Typing Master',
		description:
			'Развиваем скорость печати на клавиатуре с помощью весёлых упражнений.',
		descriptionKg:
			'Кызыктуу көнүгүүлөр менен клавиатурада терүү ылдамдыгын өнүктүрүү.',
		descriptionEn:
			'We develop the speed of typing on the keyboard with the help of fun exercises.',
		icon: <FaKeyboard />
	},
	{
		title: 'Рисуем на компьютере',
		titleKg: 'Компьютерде сүрөт тартуу',
		titleEn: 'Drawing on the Computer',
		description:
			'Используем графические программы для создания красивых рисунков!',
		descriptionKg:
			'Биз кооз сүрөттөрдү түзүү үчүн жуурулушуу программаларды колдонуу!',
		descriptionEn: 'We use graphic software to create beautiful drawings!',
		icon: <FaPaintBrush />
	},
	{
		title: 'Весёлая практика',
		titleKg: 'Шаңдуу практика',
		titleEn: 'Fun Practice',
		description: 'Играем, решаем задания и закрепляем полученные знания!',
		descriptionKg:
			'Биз ойноп, милдеттерди чечүү жана алган билимдерин бекемдөө!',
		descriptionEn: 'We play, solve tasks and consolidate our knowledge!',
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

export default ModuleCourseKids;
