'use client';
import { FC } from 'react';
import scss from './Advantages.module.scss';
const advantagesData = [
	{
		title: 'Практика с первого дня',
		text: 'Вы сразу работаете с реальными задачами и кейсами, а не только сухой теорией.',
	},
	{
		title: 'Актуальные технологии',
		text: 'Стек и подходы соответствуют требованиям рынка и реальным вакансиям.',
	},
	{
		title: 'Поддержка и менторство',
		text: 'Помощь на каждом этапе обучения и разбор сложных моментов.',
	},
	{
		title: 'Практические проекты',
		text: 'Вы создаёте реальные проекты, которые можно добавить в портфолио.',
	},
	{
		title: 'Дополнительные курсы',
		text: 'При прохождении основного курса вы получаете сразу 3 дополнительных курса совершенно бесплатно!',
	},
	{
		title: 'Подготовка к карьерному росту',
		text: 'Наш курс не только даёт навыки для текущих задач, но и готовит вас к быстрому карьерному росту.Вы научитесь работать с реальными	процессами, общаться с командами и создавать проекты, которые оценивают работодатели.',
	},
];

interface IAdvantagesProps {
	titleColor: string
	spanColor: string
}

const Advantages: FC<IAdvantagesProps> = ({ titleColor, spanColor }) => {
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.content}>
					<h2 style={{ color: `${titleColor}` }}>Преимущества <span style={{ color: `${spanColor}` }}>курса</span></h2>
					<div className={scss.wrapper}>
						<div className={scss.cards}>
							{advantagesData.map((item, index) => (
								<div key={index} className={scss.card}>
									<span className={scss.index}>
										{index + 1}
									</span>
									<h3>{item.title}</h3>
									<p>{item.text}</p>
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
