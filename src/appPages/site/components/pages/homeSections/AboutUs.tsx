'use client';
import React, { FC } from 'react';
import scss from './AboutUs.module.scss';
import Tag from '@/ui/tag/Tag';
import {
	IconRosetteDiscountCheck,
	IconStairsUp,
	IconStar,
	IconUserCheck,
	IconUsersGroup
} from '@tabler/icons-react';
import AnimatedNumbers from '../../framerMotion/AnimatedNumbers';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

const about_stats = [
	{
		icon: <IconRosetteDiscountCheck stroke={2} />,
		name: 'Опыт в сфере IT',
		nameKg: 'Иш чөйрөсүндөгү тажрыйба',
		nameEn: 'IT experience',
		stat: 5,
		statType: '+'
	},
	{
		icon: <IconUserCheck stroke={2} />,
		name: 'Количество студентов',
		nameKg: 'Студенттердин саны',
		nameEn: 'Number of students',
		stat: 50,
		statType: '-100'
	},
	{
		icon: <IconStar stroke={2} />,
		name: 'Позитивных отзывов',
		nameKg: 'Позитивдүү сын-пикирлер',
		nameEn: 'Positive reviews',
		stat: 95,
		statType: '%'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'Сотрудники',
		nameKg: 'Кызматкерлер',
		nameEn: 'Employees',
		stat: 15,
		statType: '+'
	}
];

const AboutUs: FC = () => {
	const { i18n, t } = useTranslation('translated');
	return (
		<section className={scss.AboutUs}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.outside}>
						<h1 className={scss.title}>{t('home.aboutUs.theme')}</h1>
						<p className={scss.text}>{t('home.aboutUs.subtitle')}</p>
					</div>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.top_left}>
								<Tag icon={<IconStairsUp stroke={2} />}>
									{t('home.aboutUs.onNumbers.subtopic')}
								</Tag>
								<CustomTitle
									title={t('home.aboutUs.onNumbers.title')}
									spanRight={t('home.aboutUs.onNumbers.custom_title')}
									color="#ffffff"
								/>
							</div>
							<p className={scss.top_right_text}>
								{t('home.aboutUs.subtitle')}
							</p>
						</div>
						<div className={scss.bottom}>
							{about_stats.map((item, index) => (
								<React.Fragment key={index}>
									<div className={scss.card}>
										<div className={scss.icon}>{item.icon}</div>
										<div className={scss.name}>
											<p>
												{i18n.language === 'ru'
													? item.name
													: i18n.language === 'kg'
														? item.nameKg
														: item.nameEn}
											</p>
										</div>
										<div className={scss.count}>
											<p>
												<AnimatedNumbers value={item.stat} />
												{item.statType}
											</p>
										</div>
									</div>
									{index !== about_stats.length - 1 && (
										<span className={scss.line}></span>
									)}
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
