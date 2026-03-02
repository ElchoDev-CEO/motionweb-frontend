'use client';
import React, { FC } from 'react';
import scss from './Questions.module.scss';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const motionWebInfo = [
	{
		id: 'learning_management',
		image: 'https://img.icons8.com/clouds/256/000000/classroom.png',
		label: 'Управление обучением',
		labelKg: 'Окуу башкаруу',
		labelEn: 'Learning Management',
		description:
			'Инструменты для организации и управления учебными материалами',
		descriptionKg: 'Окуу материалдарын уюштуруу жана башкаруу куралдары',
		descriptionEn: 'Tools for organizing and managing educational materials',
		content:
			'Платформа MotionWeb LMS предоставляет мощные инструменты для создания, организации и управления учебными материалами. Эти инструменты делают процесс обучения проще и удобнее как для преподавателей, так и для студентов. Преподаватели могут эффективно структурировать курсы, а студенты — легко находить и использовать необходимые материалы, что значительно ускоряет обучение.',
		contentKg:
			'MotionWeb LMS платформасы окуу материалдарын түзүү, уюштуруу жана башкаруу үчүн күчтүү куралдар менен камсыз кылат. Бул инструменттер окуу процессин окутуучулар үчүн да, студенттер үчүн да жеңил жана ыңгайлуу кылат. Мугалимдер курстарды эффективдүү түзө алышат жана студенттер керектүү материалдарды оңой таап, колдоно алышат, бул окууну кыйла тездетет.',
		contentEn:
			'MotionWeb LMS provides powerful tools for creating, organizing, and managing educational materials. These tools make the learning process simpler and more convenient for both teachers and students. Teachers can efficiently structure courses, while students can easily find and use the necessary materials, significantly accelerating the learning process.'
	},

	{
		id: 'resource_accessibility',
		image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
		label: 'Доступность образовательных ресурсов',
		labelKg: 'Билим берүү ресурстарынын болушу',
		labelEn: 'Accessibility of Educational Resources',
		description: 'Централизованный доступ к учебным материалам',
		descriptionKg: 'Билим берүү материалдарына борборлоштурулган жетүү',
		descriptionEn: 'Centralized access to educational materials',
		content:
			'MotionWeb LMS предоставляет централизованный доступ к учебным материалам, что позволяет студентам изучать нужные темы в любое удобное для них время и из любого места. Такая гибкость особенно важна в современном мире, где ценится возможность обучаться удаленно и в индивидуальном темпе. Платформа позволяет сосредоточиться на получении знаний, не отвлекаясь на технические сложности.',
		contentKg:
			'MotionWeb LMS билим берүү материалдарына борборлоштурулган жеткиликтүүлүктү камсыздайт, бул студенттерге керектүү темаларды каалаган убакта жана каалаган жерден изилдөөгө мүмкүндүк берет. Бул ийкемдүүлүк, алыстан жана өз темпинде үйрөнүү жөндөмдүүлүгү жогору бааланган азыркы дүйнөдө өзгөчө маанилүү. Платформа студенттерге техникалык кыйынчылыктарга алаксыбай, окууга көңүл бурууга мүмкүндүк берет.',
		contentEn:
			'MotionWeb LMS provides centralized access to educational materials, allowing students to study the required topics at any convenient time and from any location. This flexibility is especially important in today’s world, where remote and individualized learning is valued. The platform allows students to focus on acquiring knowledge without being distracted by technical difficulties.'
	},

	{
		id: 'progress_tracking',
		image: 'https://img.icons8.com/clouds/256/000000/combo-chart.png',
		label: 'Мониторинг прогресса',
		labelKg: 'Прогресс мониторинги',
		labelEn: 'Progress Tracking',
		description: 'Функции отслеживания успеваемости студентов',
		descriptionKg: 'Студенттин ишинин натыйжалуулугун көзөмөлдөө функциялары',
		descriptionEn: 'Features for tracking student performance',
		content:
			'Система мониторинга прогресса, встроенная в MotionWeb LMS, позволяет преподавателям отслеживать успеваемость студентов в реальном времени. Это помогает выявлять трудности, с которыми сталкиваются студенты, и своевременно вносить корректировки в процесс обучения. Преподаватели могут использовать данные для создания более персонализированных и эффективных программ обучения.',
		contentKg:
			'MotionWeb LMS программасына орнотулган прогресстин мониторинг системасы инструкторлорго реалдуу убакыт режиминде студенттердин прогрессине көз салууга мүмкүндүк берет. Бул студенттердин кыйынчылыктарын аныктоого жана окуу процессин тез арада жөнгө салууга жардам берет. Инструкторлор маалыматтарды көбүрөөк жекелештирилген жана натыйжалуу окуу программаларын түзүү үчүн колдоно алышат.',
		contentEn:
			'The built-in progress tracking system in MotionWeb LMS allows teachers to monitor student performance in real-time. This helps identify difficulties students encounter and enables timely adjustments to the learning process. Teachers can use this data to create more personalized and effective learning programs.'
	},

	{
		id: 'interactive_learning',
		image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
		label: 'Интерактивное обучение',
		labelKg: 'Интерактивдүү окутуу',
		labelEn: 'Interactive Learning',
		description: 'Поддержка взаимодействия между преподавателями и студентами',
		descriptionKg:
			'Мугалимдер менен студенттердин өз ара аракеттенүүсүн колдоо',
		descriptionEn: 'Support for interaction between teachers and students',
		content:
			'MotionWeb LMS активно поддерживает интерактивное обучение, обеспечивая различные формы взаимодействия между преподавателями и студентами. Виртуальные классы, чаты, совместные задания и другие функции помогают студентам лучше усваивать материал, а преподавателям — эффективнее взаимодействовать с группой. Такой подход делает обучение более увлекательным и продуктивным.',
		contentKg:
			'MotionWeb LMS инструкторлор менен студенттердин ортосундагы өз ара аракеттенүүнүн ар кандай формаларын камсыз кылуу менен интерактивдүү окутууну активдүү колдойт. Виртуалдык класстар, чаттар, биргелешкен тапшырмалар жана башка функциялар студенттерге материалды жакшыраак өздөштүрүүгө жардам берет жана инструкторлор топ менен натыйжалуураак кызматташат. Бул ыкма окууну кызыктуураак жана жемиштүү кылат.',
		contentEn:
			'MotionWeb LMS actively supports interactive learning by providing various forms of interaction between teachers and students. Virtual classrooms, chats, collaborative assignments, and other features help students better absorb the material and allow teachers to interact more effectively with the group. This approach makes learning more engaging and productive.'
	},

	{
		id: 'administrative_automation',
		image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
		label: 'Автоматизация административных процессов',
		labelKg: 'Административдик процесстерди автоматташтыруу',
		labelEn: 'Automation of administrative processes',
		description: 'Снижение нагрузки на административный персонал',
		descriptionKg: 'Административдик кызматкерлердин түйшүгүн азайтуу',
		descriptionEn: 'Reduction of administrative workload',
		content:
			'MotionWeb LMS существенно снижает нагрузку на административный персонал за счет автоматизации рутинных задач. Управление курсами, создание расписаний, формирование отчетности — всё это выполняется автоматически, экономя время и усилия. Это позволяет сосредоточиться на более важных аспектах образовательного процесса и улучшении качества обучения.',
		contentKg:
			'MotionWeb LMS күнүмдүк тапшырмаларды автоматташтыруу аркылуу административдик кызматкерлердин жүгүн олуттуу кыскартат. Курстарды башкаруу, пландоо жана отчеттуулуктун бардыгы автоматташтырылган, бул убакытты жана күчтү үнөмдөйт. Бул билим берүү процессинин маанилүү аспектилерине көңүл бурууга жана окуунун сапатын жогорулатууга мүмкүндүк берет.',
		contentEn:
			'MotionWeb LMS significantly reduces the workload of administrative staff by automating routine tasks. Course management, schedule creation, and report generation are all performed automatically, saving time and effort. This allows staff to focus on more important aspects of the educational process and improve learning quality.'
	}
];

interface AccordionLabelProps {
	label: string;
	labelKg: string;
	labelEn: string;
	image: string;
	description: string;
	descriptionKg: string;
	descriptionEn: string;
}

function AccordionLabel({
	label,
	labelKg,
	labelEn,
	image,
	description,
	descriptionKg,
	descriptionEn
}: AccordionLabelProps) {
	const { i18n } = useTranslation('home');

	return (
		<Group wrap="nowrap">
			<Avatar src={image} radius="xl" size="lg" />
			<div>
				<Text>
					{i18n.language === 'ru'
						? label
						: i18n.language === 'en'
							? labelEn
							: labelKg}
				</Text>
				<Text size="sm" c="dimmed" fw={400}>
					{i18n.language === 'ru'
						? description
						: i18n.language === 'en'
							? descriptionEn
							: descriptionKg}
				</Text>
			</div>
		</Group>
	);
}

const Questions: FC = () => {
	const { i18n } = useTranslation();

	const items = motionWebInfo.map((item) => (
		<Accordion.Item value={item.id} key={item.label}>
			<Accordion.Control>
				<AccordionLabel {...item} />
			</Accordion.Control>
			<Accordion.Panel>
				<Text size="sm">
					{i18n.language === 'en'
						? item.contentEn
						: i18n.language === 'kg'
							? item.contentKg
							: item.content}
				</Text>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<>
			<section className={scss.Questions}>
				<div className="container">
					<div className={scss.content}>
						<h1 className={scss.title}>
							{i18n.language === 'ru' ? (
								<>
									Часто задаваемые <span>вопросы (FAQs)</span>
								</>
							) : i18n.language === 'en' ? (
								<>
									Frequently asked <span>questions (FAQs)</span>
								</>
							) : (
								<>
									Көп берилүүчү <span>суроолор (FAQs)</span>
								</>
							)}
						</h1>
						<Accordion
							chevronPosition="right"
							variant="contained"
							defaultValue="learning_management"
						>
							{items}
						</Accordion>
					</div>
				</div>
			</section>
		</>
	);
};

export default Questions;
