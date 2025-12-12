'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import scss from './Welcome.module.scss';

import TabImage1 from '@/assets/img/people/1.webp';
import TabImage2 from '@/assets/img/people/2.webp';
import TabImage3 from '@/assets/img/people/3.webp';
import TabImage4 from '@/assets/img/people/4.webp';
import TabImage5 from '@/assets/img/people/5.webp';

import company1 from '@/assets/img/company/1.png';
import company2 from '@/assets/img/company/2.png';
import company3 from '@/assets/img/company/3.png';
import company4 from '@/assets/img/company/4.png';
import company5 from '@/assets/img/company/5.png';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import AnimatedNumbers from '../../framerMotion/AnimatedNumbers';

interface ITab {
	area: string;
	label: string;
	company: StaticImageData;
	image: StaticImageData;
}

const Welcome: FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const intervalIdRef = useRef<number | null>(null);

	useEffect(() => {
		const id = setInterval(() => {
			setActiveTab((activeTab) => (activeTab + 1) % tabs.length);
		}, 3000);
		// @ts-ignore
		intervalIdRef.current = id;
		return () => clearInterval(id);
	}, []);

	const handleTabClick = (index: number) => {
		clearInterval(intervalIdRef.current!); // используем сохраненную ссылку
		setActiveTab(index);
		const newIntervalId = setInterval(() => {
			setActiveTab((activeTab) => (activeTab + 1) % tabs.length);
		}, 3000);
		// @ts-ignore
		intervalIdRef.current = newIntervalId; // обновляем ссылку в ref
	};

	const tabs: ITab[] = [
		{
			area: 'Основатель MotionWeb',
			label: 'Software engineer',
			company: company2,
			image: TabImage2
		},
		{
			area: 'Сооснователь MotionWeb',
			label: 'Предприниматель',
			company: company1,
			image: TabImage1
		},
		{
			area: 'Сооснователь MotionWeb',
			label: 'FullStack',
			company: company3,
			image: TabImage3
		},
		{
			area: 'FullStack Ментор',
			label: 'Руководитель FS',
			company: company4,
			image: TabImage4
		},
		{
			area: 'Frontend Ментор',
			label: 'IT инженер',
			company: company5,
			image: TabImage5
		}
	];

	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.left}>
							<h1 className={scss.title}>
								Исследуйте будущее <span>MotionWeb</span>
							</h1>
							<p className={scss.text}>
								{/* eslint-disable-next-line react/no-unescaped-entities */}
								Давайте исследуем и разработаем ваш опыт работы с Motion Web.
							</p>
							<div className={scss.buttons}>
								<Link href={'/courses'} className={scss.bg}>
									Давайте начнем!
								</Link>
								{/* <Link href={'/'} className={scss.no_bg}>
									Explore Now
								</Link> */}
							</div>
							<div className={scss.stats}>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={290} />
										K+
									</h3>
									<p>Запросы</p>
								</div>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={40} />
										K+
									</h3>
									<p>Пользователи</p>
								</div>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={72} />
										K+
									</h3>
									<p>Запросов в день</p>
								</div>
							</div>
						</div>
						<div className={scss.right}>
							<div className={scss.tab_carousel}>
								<div className={scss.position}>
									<div className={scss.carousel}>
										<div className={scss.tabs}>
											{tabs.map((tab: ITab, index: number) => (
												<div
													key={index}
													onClick={() => handleTabClick(index)}
													className={
														index === activeTab
															? `${scss.button} ${scss.active}`
															: `${scss.button}`
													}
												>
													<div
														className={
															index === activeTab
																? `${scss.company} ${scss.active}`
																: `${scss.company}`
														}
													>
														<Image src={tab.company} alt="company" />
													</div>
													<div
														className={
															index === activeTab
																? `${scss.role} ${scss.active}`
																: `${scss.role}`
														}
													>
														<pre
															className={
																index === activeTab
																	? `${scss.role_text} ${scss.active}`
																	: `${scss.role_text}`
															}
														>
															{tab.label}
														</pre>
													</div>
												</div>
											))}
										</div>
										{tabs.map((tab: ITab, index: number) => (
											<div
												key={index}
												className={
													index === activeTab
														? `${scss.base_people} ${scss.active}`
														: `${scss.base_people}`
												}
											>
												<pre className={scss.person_company}>{tab.area}</pre>
												<Image
													className={scss.person_img}
													src={tab.image}
													alt="people"
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
