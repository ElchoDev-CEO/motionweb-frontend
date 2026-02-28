'use client';
import { FC } from 'react';
import scss from './SomeCourses.module.scss';
import SpotlightCard from '@/components/SpotlightCard';
import Image from 'next/image';
import IconSomeCourse from '@/assets/icons/icon-some-course';
import {
	FaCss3Alt,
	FaDocker,
	FaGitAlt,
	FaGithub,
	FaHtml5,
	FaJava,
	FaPython,
	FaReact
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import {
	BiLogoPostgresql,
	BiLogoRedux,
	BiLogoTypescript
} from 'react-icons/bi';
import { SiNginx } from 'react-icons/si';
import { FcLinux } from 'react-icons/fc';
import {
	some_courses_1,
	some_courses_2,
	some_courses_3,
	some_courses_4
} from '@/assets/img/some_courses';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

const courseData = [
	{
		title: 'Инженер Javascript',
		titleEn: 'Engineer Javascript',
		description: '18 месяцев + 1 месяц стажировки в подарок',
		descriptionEn: '18 months + 1 month internship as a gift',
		image: some_courses_1,
		isHit: true,
		technologies: [
			{ icon: <FaHtml5 />, name: 'HTML5' },
			{ icon: <FaCss3Alt />, name: 'CSS3' },
			{ icon: <FaGithub />, name: 'GitHub' },
			{ icon: <IoLogoJavascript />, name: 'JavaScript' },
			{ icon: <FaGitAlt />, name: 'Git' },
			{ icon: <FaReact />, name: 'React' },
			{ icon: <BiLogoTypescript />, name: 'TypeScript' },
			{ icon: <BiLogoRedux />, name: 'Redux' }
		],
		startDate: '25-января',
		startDateEn: '25-january'
	},
	{
		title: 'AI Разработка',
		titleEn: 'AI Development',
		description: '15 месяцев + 1 месяц стажировки в подарок',
		descriptionEn: '15 months + 1 month internship as a gift',
		image: some_courses_2,
		isHit: false,
		technologies: [
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <BiLogoPostgresql />, name: 'PostgreSQL' },
			{ icon: <FaDocker />, name: 'Docker' },
			{ icon: <FcLinux />, name: 'Linux' },
			{ icon: <SiNginx />, name: 'Nginx' }
		],
		startDate: '1-февраля',
		startDateEn: '1-february'
	},
	{
		title: 'Кибербезопасность',
		titleEn: 'Cybersecurity',
		description: '6 месяцев',
		descriptionEn: '6 months',
		image: some_courses_3,
		isHit: false,
		technologies: [
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <FaJava />, name: 'Java' },
			{ icon: '', name: 'C++' },
			{ icon: '', name: 'C#' }
		],
		startDate: '5-января',
		startDateEn: '5-january'
	},
	{
		title: 'IT шаг для маленьких детей',
		titleEn: 'IT step for young children',
		description: '4 месяца',
		descriptionEn: '4 months',
		image: some_courses_4,
		isHit: true,
		technologies: [
			{ icon: <IoLogoJavascript />, name: 'JavaScript' },
			{ icon: <FaHtml5 />, name: 'HTML5' },
			{ icon: <FaCss3Alt />, name: 'CSS3' },
			{ icon: <FaPython />, name: 'Python' }
		],
		startDate: '29-декабря',
		startDateEn: '29-december'
	}
];

const SomeCourses: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};
	const { i18n, t } = useTranslation('home');

	return (
		<section className={scss.SomeCourses}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconSomeCourse />
						<CustomTitle
							title={t('courses.theme')}
							spanRight={t('courses.custom_theme')}
							color="#000000"
						/>
					</div>
					<div className={scss.cards}>
						{courseData.map((item, index) => (
							<SpotlightCard
								key={index}
								className={scss.card}
								spotlightColor="#f96b6b"
							>
								{item.isHit && (
									<span className={scss.is_hit}>
										{t('courses.course.bestsellers')}
									</span>
								)}
								<div className={scss.left}>
									<Image
										width={200}
										height={200}
										src={item.image}
										alt={item.title}
										style={{ zIndex: 100 }}
									/>
								</div>
								<div className={scss.right}>
									<div className={scss.right_header}>
										<h2 className={scss.title}>
											{i18n.language === 'ru' ? item.title : item.titleEn}
										</h2>
										<div className={scss.separator}>
											<span className={scss.details}>
												{t('courses.course.duration')}:
											</span>
											<p className={scss.text}>
												{i18n.language === 'ru'
													? item.description
													: item.descriptionEn}
											</p>
										</div>
										<div>
											<span className={scss.details}>
												{t('courses.course.technologies')}:
											</span>
											<ul>
												{item.technologies.map((tech, index) => (
													<li key={index} className={scss.tech_stack}>
														{tech.icon && (
															<span className={scss.icon_img}>{tech.icon}</span>
														)}
														<p className={scss.icon_name}>{tech.name}</p>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className={scss.right_footer}>
										<div className={scss.start_date}>
											{/* <p className={scss.start}>Запуск: </p>
											<span>{item.startDate}</span> */}
										</div>
										<button
											className={scss.button}
											onClick={handleScrollContact}
										>
											{/* Подробнее */}

											{t('courses.course.btnText')}
										</button>
									</div>
								</div>
							</SpotlightCard>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default SomeCourses;
