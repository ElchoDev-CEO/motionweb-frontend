'use client';
import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import scss from './Tabs.module.scss';
import TabFeedBack from './tab__pages/TabFeedBack';
import TabStaff from './tab__pages/TabStaff';
import TabPhoto from './tab__pages/TabPhoto';
import TabVideo from './tab__pages/TabVideo';
import TabCertificate from './tab__pages/TabCertificate';
import {
	IconCertificate,
	IconMessage,
	IconMovie,
	IconPhoto,
	IconUsersGroup
} from '@tabler/icons-react';

interface tabsProps {
	icon: any;
	label: any;
	page?: any;
}

const tabs: tabsProps[] = [
	{
		icon: <IconMessage stroke={2} />,
		label: 'Отзывы',
		page: <TabFeedBack />
	},
	// {
	// 	icon: <CalendarIcon />,
	// 	label: <FormattedMessage id="page.tabs.button.schedule" />,
	// 	page: <TabCalendar />
	// },
	{
		icon: <IconUsersGroup stroke={2} />,
		label: 'Сотрудники',
		page: <TabStaff />
	},
	{
		icon: <IconPhoto stroke={2} />,
		label: 'Фото',
		page: <TabPhoto />
	},
	{
		icon: <IconMovie stroke={2} />,
		label: 'Видео',
		page: <TabVideo />
	},
	{
		icon: <IconCertificate stroke={2} />,
		label: 'Сертификаты',
		page: <TabCertificate />
	}
];

const Tabs: FC = () => {
	const [activeTab, setActiveTab] = useState<number>(tabs[0].label);

	return (
		<>
			<div className={scss.tabs__container}>
				<div className="container">
					<div className={scss.content}>
						<h1 className={scss.about__us}>Основные возможности MotionWeb?</h1>
						<div className={scss.tabs}>
							<div className={scss.buttons}>
								{tabs.map((tab, index) => (
									<button
										key={index + 1}
										onClick={() => {
											setActiveTab(tab.label);
										}}
										className={
											activeTab === tab.label
												? `${scss.button} ${scss.active}`
												: `${scss.button}`
										}
									>
										{activeTab === tab.label && (
											<motion.div
												layoutId="active-pill-tab"
												className={scss.active}
												style={{
													borderRadius: 12
												}}
												transition={{ type: 'spring', duration: 0.6 }}
											/>
										)}
										<span className={scss.icon}>{tab.icon}</span>
										<span className={scss.label}>{tab.label}</span>
									</button>
								))}
							</div>
							{tabs.map((tab, index) =>
								activeTab === tab.label ? (
									<div key={index + 1} className={scss.tabs__content}>
										{tab.page}
									</div>
								) : null
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Tabs;
