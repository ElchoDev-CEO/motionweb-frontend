'use client';
import { FC } from 'react';
import scss from './AdditionalCourses.module.scss';
import {
	bgFrame,
	orator,
	enLanguage,
	ruLanguage,
	parents
} from '@/assets/img/additional_courses';
import Image from 'next/image';
import CustomTitle from '@/ui/title/CustomTitle';

const additionalCoursesData = [
	{
		title: 'Искусство публичных выступлений',
		description:
			'Улучшите свои навыки ораторского искусства и добейтесь отличных результатов в презентациях и мероприятиях.',
		image: orator
	},
	{
		title: 'Английский язык',
		description:
			'Мы обучаем студентов английскому языку с начала программы до завершения курса.',
		image: enLanguage
	},
	{
		title: 'Русский язык',
		description:
			'Мы обучаем студентов русскому языку с начала программы до завершения курса.',
		image: ruLanguage
	},
	{
		title: 'Онлайн-урок для родителей',
		description: 'Дополнительный 6-дневный онлайн-курс для родителей.',
		image: parents
	}
];

const AdditionalCourses: FC = () => {
	return (
		<section className={scss.AdditionalCourses}>
			<div className="container">
				<div className={scss.content}>
					<CustomTitle
						spanLeft="В основные"
						title=" курсы входят"
						color="#000000"
					/>
					<div className={scss.cards}>
						{additionalCoursesData.map((item, index) => (
							<div key={index} className={scss.card}>
								<div className={scss.image_block}>
									<Image
										width={300}
										height={200}
										src={item.image}
										alt={item.title}
									/>
								</div>
								<div className={scss.info_block}>
									<h1 className={scss.info_block_title}>{item.title}</h1>
									<p className={scss.info_block_text}>{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AdditionalCourses;
