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

const advantages_data = [
	{
		icon: done_blue,
		title: 'Менторство',
		description:
			'Индивидуальная поддержка от практикующих специалистов IT-индустрии.'
	},
	{
		icon: done_yellow,
		title: 'Практический опыт',
		description:
			'Работа с реальными задачами и проектами в командной среде.'
	},
	{
		icon: done_brown,
		title: 'Обучение',
		description:
			'Современные методики обучения и развитие ключевых навыков.'
	},
	{
		icon: done_green,
		title: 'Трудоустройство',
		description:
			'Лучшие стажёры получают предложения о работе после программы.'
	}
];

const Advantages: FC = () => {
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.grid}>
					{/* Highlight */}
					<div className={scss.highlight}>
						<h2>
							Почему <span>эта стажировка</span>
							<br /> даёт результат
						</h2>
						<p>
							Мы создаём среду, максимально приближенную к реальной
							работе в IT-командах, где вы растёте как настоящий специалист.
						</p>

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
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
