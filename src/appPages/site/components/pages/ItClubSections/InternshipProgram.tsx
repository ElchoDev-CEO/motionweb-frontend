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
			'Необходимо иметь базовые знания в выбранной области IT. Участники проходят отбор на основе навыков и мотивации.'
	},
	{
		pic: duration,
		title: 'Длительность',
		description:
			'Стажировка длится от 3 до 6 месяцев с гибким графиком и поэтапной нагрузкой.'
	},
	{
		pic: opportunities,
		title: 'Возможности',
		description:
			'Работа над реальными проектами, участие в мастер-классах и развитие профессиональных навыков.'
	}
];

const InternshipProgram: FC = () => {
	return (
		<section className={scss.InternshipProgram}>
			<div className="container">
				<div className={scss.content}>
					<h2 className={scss.heading}>
						Программа <span>стажировки</span>
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
										<h3>{item.title}</h3>
										<p>{item.description}</p>
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
