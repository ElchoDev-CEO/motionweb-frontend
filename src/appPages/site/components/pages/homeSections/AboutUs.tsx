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

const about_stats = [
	{
		icon: <IconRosetteDiscountCheck stroke={2} />,
		name: 'Опыт в сфере IT',
		stat: 5,
		statType: '+'
	},
	{
		icon: <IconUserCheck stroke={2} />,
		name: 'Количество студентов',
		stat: 50,
		statType: '-100'
	},
	{
		icon: <IconStar stroke={2} />,
		name: 'Позитивных отзывов',
		stat: 95,
		statType: '%'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'Сотрудники',
		stat: 15,
		statType: '+'
	}
];

const AboutUs: FC = () => {
	return (
		<section className={scss.AboutUs}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.outside}>
						<h1 className={scss.title}>О компании</h1>
						<p className={scss.text}>
							Академия основана в 2020 году с целью предоставления качественного
							образования в сфере информационных технологий. 
						</p>
					</div>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.top_left}>
								<Tag icon={<IconStairsUp stroke={2} />}>О компании</Tag>
								<CustomTitle title="Мы" spanRight=" в цифрах" color="#ffffff" />
							</div>
							<p className={scss.top_right_text}>
								Миссия нашей компании - подготовка высококвалифицированных
								специалистов, способных успешно применять свои знания и навыки в
								современном цифровом мире.
							</p>
						</div>
						<div className={scss.bottom}>
							{about_stats.map((item, index) => (
								<React.Fragment key={index}>
									<div className={scss.card}>
										<div className={scss.icon}>{item.icon}</div>
										<div className={scss.name}>
											<p>{item.name}</p>
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
