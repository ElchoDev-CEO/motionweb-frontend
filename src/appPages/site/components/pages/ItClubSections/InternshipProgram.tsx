'use client';
import { FC } from 'react';
import scss from './InternshipProgram.module.scss';
import Image from 'next/image';
import {
	termsOfParticipation,
	duration,
	opportunities
} from '@/assets/img/internship_program';
import { useTranslation } from 'react-i18next';

const internship_program_data = [
	{
		pic: termsOfParticipation,
		title: 'Условия участия',
		titleEn: 'Terms of participation',
		description:
			'Необходимо иметь базовые знания в выбранной области IT. Участники проходят отбор на основе навыков и мотивации.',
		descriptionEn:
			'Basic knowledge in the chosen IT field is required. Participants are selected based on skills and motivation.'
	},
	{
		pic: duration,
		title: 'Длительность',
		titleEn: 'Duration',
		description:
			'Стажировка длится от 3 до 6 месяцев с гибким графиком и поэтапной нагрузкой.',
		descriptionEn:
			'The internship lasts from 3 to 6 months with a flexible schedule and gradual workload.'
	},
	{
		pic: opportunities,
		title: 'Возможности',
		titleEn: 'Features',
		description:
			'Работа над реальными проектами, участие в мастер-классах и развитие профессиональных навыков.',
		descriptionEn:
			'Work on real projects, participate in master classes, and develop professional skills.'
	}
];

const InternshipProgram: FC = () => {
	const { i18n, t } = useTranslation('translated');
	return (
		<section className={scss.InternshipProgram}>
			<div className="container">
				<div className={scss.content}>
					<h2 className={scss.heading}>
						{t('ITclub.program.theme')}
						<span>{t('ITclub.program.custom_theme')}</span>
					</h2>

					<div className={scss.timeline}>
						{internship_program_data.map((item, index) => (
							<div key={index} className={scss.step}>
								<div className={scss.marker}>
									<span>{index + 1}</span>
								</div>

								<div className={scss.card}>
									<Image
										src={item.pic}
										width={56}
										height={56}
										alt={item.title}
									/>
									<div className={scss.text}>
										<h3>
											{i18n.language === 'ru' ? item.title : item.titleEn}
										</h3>
										<p>
											{i18n.language === 'ru'
												? item.description
												: item.descriptionEn}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default InternshipProgram;
