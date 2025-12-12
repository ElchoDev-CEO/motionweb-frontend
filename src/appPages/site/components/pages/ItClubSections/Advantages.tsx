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
			'Стажеры получают поддержку и руководство от опытных профессионалов.'
	},
	{
		icon: done_yellow,
		title: 'Практический опыт',
		description:
			'Возможность применить свои знания на практике в профессиональной IT среде.'
	},
	{
		icon: done_brown,
		title: 'Обучение',
		description: 'Разнообразные проекты для расширения навыков.'
	},
	{
		icon: done_green,
		title: 'Трудоустройство',
		description: 'Возможность трудоустройства после завершения стажировки.'
	}
];

const Advantages: FC = () => {
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<Image
							className={scss.photo}
							src={advantages_photo}
							alt="advantages_photo"
						/>
					</div>
					<div className={scss.right}>
						<h1 className={scss.title}>Преимущества</h1>
						<div className={scss.cards}>
							{advantages_data.map((item, index) => (
								<div key={index} className={scss.card}>
									<Image
										className={scss.icon}
										width={40}
										height={40}
										src={item.icon}
										alt={item.title}
									/>
									<h1 className={scss.title}>{item.title}</h1>
									<p className={scss.description}>{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
