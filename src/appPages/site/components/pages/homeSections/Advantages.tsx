'use client';
import { FC } from 'react';
import scss from './Advantages.module.scss';
import { useTranslation } from 'react-i18next';
const advantagesData = [
	{
		title: 'Практика с первого дня',
		titleEn: 'Practical Experience from Day One',
		text: 'Вы сразу работаете с реальными задачами и кейсами, а не только сухой теорией.',
		textEn:
			'You immediately work with real-world tasks and cases, not just dry theory.'
	},
	{
		title: 'Актуальные технологии',
		titleEn: 'Actual Technologies',
		text: 'Стек и подходы соответствуют требованиям рынка и реальным вакансиям.',
		textEn:
			'The stack and approaches align with market demands and real job openings.'
	},
	{
		title: 'Поддержка и менторство',
		titleEn: 'Support and Mentoring',
		text: 'Помощь на каждом этапе обучения и разбор сложных моментов.',
		textEn:
			'We provide assistance at every stage of the learning process and help you navigate difficult moments.'
	},
	{
		title: 'Практические проекты',
		titleEn: 'Practical Projects',
		text: 'Вы создаёте реальные проекты, которые можно добавить в портфолио.',
		textEn: 'You create real-world projects that you can add to your portfolio.'
	},
	{
		title: 'Дополнительные курсы',
		titleEn: 'Additional Courses',
		text: 'При прохождении основного курса вы получаете сразу 3 дополнительных курса совершенно бесплатно!',
		textEn:
			'When completing the main course, you receive 3 additional courses completely free of charge!'
	},
	{
		title: 'Подготовка к карьерному росту',
		titleEn: 'Preparing for Career Growth',
		text: 'Наш курс не только даёт навыки для текущих задач, но и готовит вас к быстрому карьерному росту.Вы научитесь работать с реальными	процессами, общаться с командами и создавать проекты, которые оценивают работодатели.',
		textEn:
			"Our course not only equips you with skills for current tasks but also prepares you for rapid career growth. You'll learn to work with real processes, communicate with teams, and create projects that employers value."
	}
];

interface IAdvantagesProps {
	titleColor: string;
	spanColor: string;
}

const Advantages: FC<IAdvantagesProps> = ({ titleColor, spanColor }) => {
	const { i18n, t } = useTranslation('FS');
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.content}>
					<h2 style={{ color: `${titleColor}` }}>
						{t('advantages.theme')}{' '}
						<span style={{ color: `${spanColor}` }}>
							{t('advantages.custom_theme')}
						</span>
					</h2>
					<div className={scss.wrapper}>
						<div className={scss.cards}>
							{advantagesData.map((item, index) => (
								<div key={index} className={scss.card}>
									<span className={scss.index}>{index + 1}</span>
									<h3>{i18n.language === 'ru' ? item.title : item.titleEn}</h3>
									<p>{i18n.language === 'ru' ? item.text : item.textEn}</p>
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
