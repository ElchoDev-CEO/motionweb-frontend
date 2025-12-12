'use client';
import React, { FC } from 'react';
import scss from './Questions.module.scss';
import { Group, Avatar, Text, Accordion } from '@mantine/core';

const motionWebInfo = [
	{
		id: 'learning_management',
		image: 'https://img.icons8.com/clouds/256/000000/classroom.png',
		label: 'Управление обучением',
		description:
			'Инструменты для организации и управления учебными материалами',
		content:
			'Платформа MotionWeb LMS предоставляет мощные инструменты для создания, организации и управления учебными материалами. Эти инструменты делают процесс обучения проще и удобнее как для преподавателей, так и для студентов. Преподаватели могут эффективно структурировать курсы, а студенты — легко находить и использовать необходимые материалы, что значительно ускоряет обучение.'
	},

	{
		id: 'resource_accessibility',
		image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
		label: 'Доступность образовательных ресурсов',
		description: 'Централизованный доступ к учебным материалам',
		content:
			'MotionWeb LMS предоставляет централизованный доступ к учебным материалам, что позволяет студентам изучать нужные темы в любое удобное для них время и из любого места. Такая гибкость особенно важна в современном мире, где ценится возможность обучаться удаленно и в индивидуальном темпе. Платформа позволяет сосредоточиться на получении знаний, не отвлекаясь на технические сложности.'
	},

	{
		id: 'progress_tracking',
		image: 'https://img.icons8.com/clouds/256/000000/combo-chart.png',
		label: 'Мониторинг прогресса',
		description: 'Функции отслеживания успеваемости студентов',
		content:
			'Система мониторинга прогресса, встроенная в MotionWeb LMS, позволяет преподавателям отслеживать успеваемость студентов в реальном времени. Это помогает выявлять трудности, с которыми сталкиваются студенты, и своевременно вносить корректировки в процесс обучения. Преподаватели могут использовать данные для создания более персонализированных и эффективных программ обучения.'
	},

	{
		id: 'interactive_learning',
		image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
		label: 'Интерактивное обучение',
		description: 'Поддержка взаимодействия между преподавателями и студентами',
		content:
			'MotionWeb LMS активно поддерживает интерактивное обучение, обеспечивая различные формы взаимодействия между преподавателями и студентами. Виртуальные классы, чаты, совместные задания и другие функции помогают студентам лучше усваивать материал, а преподавателям — эффективнее взаимодействовать с группой. Такой подход делает обучение более увлекательным и продуктивным.'
	},

	{
		id: 'administrative_automation',
		image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
		label: 'Автоматизация административных процессов',
		description: 'Снижение нагрузки на административный персонал',
		content:
			'MotionWeb LMS существенно снижает нагрузку на административный персонал за счет автоматизации рутинных задач. Управление курсами, создание расписаний, формирование отчетности — всё это выполняется автоматически, экономя время и усилия. Это позволяет сосредоточиться на более важных аспектах образовательного процесса и улучшении качества обучения.'
	}
];

interface AccordionLabelProps {
	label: string;
	image: string;
	description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
	return (
		<Group wrap="nowrap">
			<Avatar src={image} radius="xl" size="lg" />
			<div>
				<Text>{label}</Text>
				<Text size="sm" c="dimmed" fw={400}>
					{description}
				</Text>
			</div>
		</Group>
	);
}

const Questions: FC = () => {
	const items = motionWebInfo.map((item) => (
		<Accordion.Item value={item.id} key={item.label}>
			<Accordion.Control>
				<AccordionLabel {...item} />
			</Accordion.Control>
			<Accordion.Panel>
				<Text size="sm">{item.content}</Text>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<>
			<section className={scss.Questions}>
				<div className="container">
					<div className={scss.content}>
						<h1 className={scss.title}>
							Часто задаваемые <span>вопросы (FAQs)</span>
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
