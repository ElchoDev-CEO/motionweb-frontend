'use client';
import React, { FC } from 'react';
import scss from './ClubStatistics.module.scss';
import {
	IconAntennaBars5,
	IconRosetteDiscountCheck,
	IconStar,
	IconUsersGroup
} from '@tabler/icons-react';
import Tag from '@/ui/tag/Tag';
import AnimatedNumbers from '../../framerMotion/AnimatedNumbers';

const about_stats = [
	{
		icon: <IconRosetteDiscountCheck stroke={2} />,
		name: 'Успешно трудоустроены',
		stat: 100,
		statType: '+'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'В менторстве',
		stat: 30,
		statType: '+'
	},
	{
		icon: <IconStar stroke={2} />,
		name: 'Улучшили навыки',
		stat: 95,
		statType: '%'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'Реальные проекты',
		stat: 50,
		statType: '+'
	}
];

const ClubStatistics: FC = () => {
	return (
		<section className={scss.ClubStatistics}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.top_left}>
								<Tag icon={<IconAntennaBars5 stroke={2} />}>Статистика</Tag>
								<h1 className={scss.title}>
									Статистика <span>клуба</span>
								</h1>
							</div>
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

export default ClubStatistics;
