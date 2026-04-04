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
import { useTranslation } from 'react-i18next';

interface ITab {
	area: string;
	areaEn: string;
	labelRu: string;
	labelEn: string;
	company: StaticImageData;
	image: StaticImageData;
}
const TABS_DATA: ITab[] = [
	{
		area: 'Основатель MotionWeb',

		areaEn: 'Founder MotionWeb',
		labelRu: 'Software engineer',
		labelEn: 'Software engineer',
		company: company2,
		image: TabImage2
	},
	{
		area: 'Сооснователь MotionWeb',

		areaEn: 'Co-founder MotionWeb',
		labelRu: 'Предприниматель',
		labelEn: 'Entrepreneur',
		company: company1,
		image: TabImage1
	},
	{
		area: 'Сооснователь MotionWeb',

		areaEn: 'Co-founder MotionWeb',
		labelRu: 'FullStack',
		labelEn: 'FullStack',
		company: company3,
		image: TabImage3
	}
];

const Welcome: FC = () => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	// const intervalIdRef = useRef<number | null>(null);

	const { i18n, t } = useTranslation('translated');
	const lang = i18n.language;

	const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (isPaused) return;

		const id = setInterval(() => {
			setActiveTab((prev) => (prev + 1) % TABS_DATA.length);
		}, 3000);

		return () => clearInterval(id);
	}, [isPaused]);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
		setIsPaused(true);

		if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

		pauseTimeoutRef.current = setTimeout(() => {
			setIsPaused(false);
		}, 2000);
	};

	// Очистка при размонтировании
	useEffect(() => {
		return () => {
			if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
		};
	}, []);

	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.left}>
							<h1 className={scss.title}>
								{t('home.banner.theme')} <span>MotionWeb</span>
							</h1>
							<p className={scss.text}>
								{/* eslint-disable-next-line react/no-unescaped-entities */}
								{t('home.banner.subtitle')}
							</p>
							<div className={scss.buttons}>
								<Link href={'/courses'} className={scss.bg}>
									{t('home.banner.btnText')}
								</Link>
								{/* <Link href={'/'} className={scss.no_bg}>
									Explore Now
								</Link> */}
							</div>
						</div>
						  <div className={scss.right}>
							<div className={scss.tab_carousel}>
								<div className={scss.position}>
									<div className={scss.carousel}>
										<div className={scss.tabs}>
											{TABS_DATA.map((tab: ITab, index: number) => (
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
															{lang === 'en' ? tab.labelEn : tab.labelRu}
														</pre>
													</div>
												</div>
											))}
										</div>
										{TABS_DATA.map((tab: ITab, index: number) => (
											<div
												key={index}
												className={
													index === activeTab
														? `${scss.base_people} ${scss.active}`
														: `${scss.base_people}`
												}
											>
												<pre className={scss.person_company}>
													{lang === 'ru' ? tab.area : tab.areaEn}
												</pre>
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
