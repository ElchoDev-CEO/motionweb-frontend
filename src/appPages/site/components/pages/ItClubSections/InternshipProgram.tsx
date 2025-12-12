'use client';
import { FC } from 'react';
import scss from './InternshipProgram.module.scss';
import Image from 'next/image';
import {
	termsOfParticipation,
	duration,
	opportunities
} from '@/assets/img/internship_program';

const internship_program_data = [
	{
		pic: termsOfParticipation,
		title: 'Условия участия',
		description:
			'Необходимо иметь базовые знания в выбранной области IT. Участники проходят отборочный процесс на основе их навыков и мотивации.'
	},
	{
		pic: duration,
		title: 'Длительность',
		description:
			'Продолжительность стажировки варьируется от 3 до 6 месяцев в зависимости от конкретной программы.'
	},
	{
		pic: opportunities,
		title: 'Возможности',
		description:
			'Возможность работать над реальными проектами. Участие в обучающих мероприятиях, тренингах и мастер-классах, что помогает вам расширить свой кругозор и навыки в IT.'
	}
];

const InternshipProgram: FC = () => {
	return (
		<section className={scss.InternshipProgram}>
			<div className="container">
				<div className={scss.content}>
					<h1 className={scss.title}>
						Программа&nbsp;<span>стажировки</span>
					</h1>
					<div className={scss.cards}>
						{internship_program_data.map((item, index) => (
							<div key={index} className={scss.card}>
								<Image
									className={scss.pic}
									width={80}
									height={80}
									src={item.pic}
									alt={item.title}
								/>
								<h1 className={scss.title}>{item.title}</h1>
								<p className={scss.description}>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default InternshipProgram;
