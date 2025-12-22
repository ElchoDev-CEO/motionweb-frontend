'use client';
import { FC } from 'react';
import scss from './AdditionalCourses.module.scss';
import {
	extraCourse_1,
	extraCourse_2,
	extraCourse_3,
	extraCourse_4
} from '@/assets/img/additional_courses';
import CustomTitle from '@/ui/title/CustomTitle';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import Image from 'next/image';

const additionalCoursesData = [
	{
		title: 'Искусство публичных выступлений',
		description:
			'Улучшите свои навыки ораторского искусства и добейтесь отличных результатов в презентациях и мероприятиях.',
		image: extraCourse_1,
		text_color: '#78d5e1'
	},
	{
		title: 'Английский язык',
		description:
			'Мы обучаем студентов английскому языку с начала программы до завершения курса.',
		image: extraCourse_2,
		text_color: '#f9c8c8'
	},
	{
		title: 'Русский язык',
		description:
			'Мы обучаем студентов русскому языку с начала программы до завершения курса.',
		image: extraCourse_3,
		isRussiaText: true
	},
	{
		title: 'Онлайн-урок для родителей',
		description: 'Дополнительный 6-дневный онлайн-курс для родителей.',
		image: extraCourse_4,
		text_color: '#a59bfc'
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

					<div className={scss.scrollWrapper}>
						<ScrollStack>
							{additionalCoursesData.map((item, index) => (
								<ScrollStackItem key={index}>
									<div className={scss.cardItem}>
										<div className={scss.left}>
											<h2>{item.title}</h2>
											<p style={{ color: item.text_color }} className={`${item.isRussiaText && scss.russia}`}> {item.description}</p>
										</div>
										<div className={scss.right}>
											<Image width={300} height={300} src={item.image} alt={item.description} loading='lazy' />
										</div>
									</div>
								</ScrollStackItem>
							))}
						</ScrollStack>
					</div>
				</div>
			</div>
		</section >
	);
};

export default AdditionalCourses;
