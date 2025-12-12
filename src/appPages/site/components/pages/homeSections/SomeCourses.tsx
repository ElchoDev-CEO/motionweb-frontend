'use client';
import { FC } from 'react';
import scss from './SomeCourses.module.scss';
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
import { FcLinux } from 'react-icons/fc';
import {
	some_courses_1,
	some_courses_2,
	some_courses_3,
	some_courses_4
} from '@/assets/img/some_courses';
import CustomTitle from '@/ui/title/CustomTitle';

const courseData = [
	{
		title: 'Инженер Javascript',
		description: '18 месяцев + 1 месяц стажировки в подарок',
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
		startDate: '25-января'
	},
	{
		title: 'AI Разработка',
		description: '15 месяцев + 1 месяц стажировки в подарок',
		image: some_courses_2,
		isHit: false,
		technologies: [
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <BiLogoPostgresql />, name: 'PostgreSQL' },
			{ icon: <FaDocker />, name: 'Docker' },
			{ icon: <FcLinux />, name: 'Linux' },
			{ icon: '', name: 'Nginx' }
		],
		startDate: '1-февраля'
	},
	{
		title: 'Кибербезопасность',
		description: '6 месяцев',
		image: some_courses_3,
		isHit: false,
		technologies: [
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <FaJava />, name: 'Java' },
			{ icon: '', name: 'C++' },
			{ icon: '', name: 'C#' }
		],
		startDate: '5-января'
	},
	{
		title: 'IT шаг для маленьких детей',
		description: '4 месяца',
		image: some_courses_4,
		isHit: false,
		technologies: [
			{ icon: '', name: 'JavaScript' },
			{ icon: '', name: 'HTML5' },
			{ icon: '', name: 'CSS3' },
			{ icon: <FaPython />, name: 'Python' }
		],
		startDate: '29-декабря'
	}
];

const SomeCourses: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<section className={scss.SomeCourses}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<IconSomeCourse />
						<CustomTitle title="Скоро " spanRight="стартует" color="#000000" />
					</div>
					<div className={scss.cards}>
						{courseData.map((item, index) => (
							<div key={index} className={scss.card}>
								{item.isHit && <span className={scss.is_hit}>Хит продаж</span>}
								<div className={scss.left}>
									<Image
										width={200}
										height={200}
										src={item.image}
										alt={item.title}
									/>
								</div>
								<div className={scss.right}>
									<div className={scss.right_header}>
										<h2 className={scss.title}>{item.title}</h2>
										<p className={scss.text}>{item.description}</p>
										<ul>
											{item.technologies.map((tech, index) => (
												<li key={index} className={scss.tech_stack}>
													<span className={scss.icon_img}>{tech.icon}</span>
													<p className={scss.icon_name}>{tech.name}</p>
												</li>
											))}
										</ul>
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
											Записаться
										</button>
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

export default SomeCourses;
