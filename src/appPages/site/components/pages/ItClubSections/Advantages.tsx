'use client';
import { FC } from 'react';
import scss from './Advantages.module.scss';
import Image from 'next/image';
import {
	advantages_photo,
	done_blue,
	done_green,
	done_brown,
	done_yellow
} from '@/assets/img/advantages';
import { useTranslation } from 'react-i18next';

const advantages_data = [
	{
		icon: done_blue,
		title: 'Менторство',
		titleEn: 'Mentoring',
		description:
			'Индивидуальная поддержка от практикующих специалистов IT-индустрии.',
		descriptionEn:
			'Personalized support from practicing IT industry professionals.'
	},
	{
		icon: done_yellow,
		title: 'Практический опыт',
		titleEn: 'Practical Experience',
		description: 'Работа с реальными задачами и проектами в командной среде.',
		descriptionEn:
			'Working on real-world problems and projects in a team environment.'
	},

	{
		icon: done_brown,
		title: 'Обучение',
		titleEn: 'Training',
		description: 'Современные методики обучения и развитие ключевых навыков.',
		descriptionEn: 'Modern teaching methods and development of key skills.'
	},
	{
		icon: done_green,
		title: 'Трудоустройство',
		titleEn: 'Employment',
		description:
			'Лучшие стажёры получают предложения о работе после программы.',

		descriptionEn: 'The best interns receive job offers after the program.'
	}
];

const Advantages: FC = () => {
	const { i18n, t } = useTranslation('translated');
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.grid}>
					{/* Highlight */}
					<div className={scss.highlight}>
						<h2>
							{t('ITclub.advantage.theme')}
							<span>{t('ITclub.advantage.custom_theme')}</span>
							<br />
							{t('ITclub.advantage.piece_theme')}
						</h2>
						<p>{t('ITclub.advantage.subtitle')}</p>

						<Image
							src={advantages_photo}
							alt="advantages"
							className={scss.photo}
						/>
					</div>

					{/* Features */}
					<div className={scss.features}>
						{advantages_data.map((item, index) => (
							<div key={index} className={scss.feature}>
								<div className={scss.icon}>
									<Image
										src={item.icon}
										width={36}
										height={36}
										alt={item.title}
									/>
								</div>
								<h3>{i18n.language === 'ru' ? item.title : item.titleEn}</h3>
								<p>
									{i18n.language === 'ru'
										? item.description
										: item.descriptionEn}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
