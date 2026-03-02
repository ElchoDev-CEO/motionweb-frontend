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
import { useTranslation } from 'react-i18next';

const about_stats = [
	{
		icon: <IconRosetteDiscountCheck stroke={2} />,
		name: 'Успешно трудоустроены',
		nameEn: 'Successfully Employed',
		nameKg: 'Ийгиликтүү иштеп жатат',
		stat: 100,
		statType: '+'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'В менторстве',
		nameEn: 'Under Mentoring',
		nameKg: 'Ментордукта',
		stat: 30,
		statType: '+'
	},
	{
		icon: <IconStar stroke={2} />,
		name: 'Улучшили навыки',
		nameEn: 'Improved Skills',
		nameKg: 'Жакшыртылган көндүмдөр',
		stat: 95,
		statType: '%'
	},
	{
		icon: <IconUsersGroup stroke={2} />,
		name: 'Реальные проекты',
		nameEn: 'Real projects',
		nameKg: 'Реалдуу долбоорлор',
		stat: 50,
		statType: '+'
	}
];

const ClubStatistics: FC = () => {
	const { i18n, t } = useTranslation('ITclub');
	return (
		<section className={scss.ClubStatistics}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.top_left}>
								<Tag icon={<IconAntennaBars5 stroke={2} />}>
									{t('clubStats.subtopic')}{' '}
								</Tag>
								<h1 className={scss.title}>
									{t('clubStats.theme')}
									<span>{t('clubStats.custom_theme')}</span>
								</h1>
							</div>
						</div>
						<div className={scss.bottom}>
							{about_stats.map((item, index) => (
								<React.Fragment key={index}>
									<div className={scss.card}>
										<div className={scss.icon}>{item.icon}</div>
										<div className={scss.name}>
											<p>{i18n.language === 'ru' ? item.name : item.nameEn}</p>
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
