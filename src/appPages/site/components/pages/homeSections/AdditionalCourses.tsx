'use client';
import { FC, useEffect, useState } from 'react';
import scss from './AdditionalCourses.module.scss';
import {
	extraCourse_1,
	extraCourse_2,
	extraCourse_3,
	extraCourse_4
} from '@/assets/img/additional_courses';
import CustomTitle from '@/ui/title/CustomTitle';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const additionalCoursesData = [
	{
		title: 'Искусство публичных выступлений',
		titleKg: 'Эл алдында сүйлөө өнөрү',
		titleEn: 'The art of public speaking',
		description:
			'Улучшите свои навыки ораторского искусства и добейтесь отличных результатов в презентациях и мероприятиях.',
		descriptionKg:
			'Эл алдында сүйлөө жөндөмүңүздү өркүндөтүңүз жана презентацияларда жана иш-чараларда эң сонун натыйжаларга жетиңиз.',
		descriptionEn:
			'Improve your public speaking skills and achieve excellent results in presentations and events.',
		image: extraCourse_1,
		accentColor: '#78d5e1'
	},
	{
		title: 'Английский язык',
		titleKg: 'Английс тили',
		titleEn: 'English language',
		description:
			'Мы обучаем студентов английскому языку с начала программы до завершения курса.',
		descriptionKg:
			'Биз студенттерге англис тилин программанын башынан аягына чейин үйрөтөбүз.',
		descriptionEn:
			'We teach students English from the beginning of the program until the end of the course.',
		image: extraCourse_2,
		accentColor: '#f9c8c8'
	},
	{
		title: 'Русский язык',
		titleKg: 'Орус тили',
		titleEn: 'Russian language',
		description:
			'Мы обучаем студентов русскому языку с начала программы до завершения курса.',
		descriptionKg:
			'Биз студенттерге орус тилин программанын башталышынан баштап курстун аягына чейин окутабыз.',
		descriptionEn:
			'We teach students Russian from the beginning of the program until the end of the course.',
		image: extraCourse_3,
		accentColor: '#ec3025'
	},
	{
		title: 'Онлайн-урок для родителей',
		titleKg: 'Ата-энелер үчүн онлайн сабак',
		titleEn: 'Online lesson for parents',
		description: 'Дополнительный 6-дневный онлайн-курс для родителей.',
		descriptionKg: 'Ата-энелер үчүн кошумча 6 күндүк онлайн курс.',
		descriptionEn: 'Additional 6-day online course for parents.',
		image: extraCourse_4,
		accentColor: '#a59bfc'
	}
];

const AdditionalCourses: FC = () => {
	const [isMobile, setIsMobile] = useState(false);
	const { i18n, t } = useTranslation('translated');

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section className={scss.AdditionalCourses}>
			<div className="container">
				<div className={scss.header}>
					<CustomTitle
						spanLeft={t('home.additionalCourses.theme')}
						title={t('home.additionalCourses.custom_theme')}
						color="#000000"
					/>
					<p className={scss.subtitle}>
						{t('home.additionalCourses.subtitle')}
					</p>
				</div>

				<div className={scss.cardsGrid}>
					{additionalCoursesData.map((course, index) => (
						<div
							key={index}
							className={scss.card}
							style={
								{
									'--card-accent': course.accentColor
								} as React.CSSProperties
							}
						>
							<div className={scss.imageWrapper}>
								<Image
									src={course.image}
									alt={course.title}
									fill
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
								/>
								<div className={scss.imageOverlay} />
							</div>

							<div className={scss.content}>
								<h3 className={scss.title}>
									{i18n.language === 'ru'
										? course.title
										: i18n.language === 'kg'
											? course.titleKg
											: course.titleEn}
								</h3>
								<p className={scss.description}>
									{i18n.language === 'ru'
										? course.description
										: i18n.language === 'kg'
											? course.descriptionKg
											: course.descriptionEn}
								</p>

								<div className={scss.accentLine} />
							</div>

							<div className={scss.hoverGlow} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AdditionalCourses;
