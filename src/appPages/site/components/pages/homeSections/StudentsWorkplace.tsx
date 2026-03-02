'use client';
import { FC, useEffect, useState } from 'react';
import scss from './StudentsWorkplace.module.scss';
// import Image from 'next/image';
// import students_workplace_1 from '@/assets/div.absolute.png';
// import students_workplace_2 from '@/assets/div.w-full.png';
import IconStudentsWorkplace from '@/assets/icons/icon-students-workplace';
import CustomTitle from '@/ui/title/CustomTitle';
import LogoLoop from '@/components/LogoLoop';
import {
	logo_jogorkukenesh,
	logo_skynet,
	logo_kyrgyzaltyn,
	logo_growave,
	logo_remotion,
	logo_mbank,
	logo_aiylbank,
	logo_asiabank,
	logo_bishkekcityhall,
	logo_timelyskills
} from '@/assets/company_logos';
import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss
} from 'react-icons/si';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';



const StudentsWorkplace: FC = () => {
	const [logoHeightTrack, setLogoHeightTrack] = useState(40);

	useEffect(() => {
		const update = () => {
			if (window.innerWidth <= 768) {
				setLogoHeightTrack(30);
			} else if (window.innerHeight <= 470) {
				setLogoHeightTrack(20);
			} else {
				setLogoHeightTrack(40);
			}
		};

		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	const company_logos = [
		{
			node: (
				<Image src={logo_jogorkukenesh} alt="logo_jogorkukenesh" width={50} height={50} />
			),
			title: 'Жогорку Кенеш',
			href: 'https://kenesh.kg'
		},
		{
			node: (
				<Image src={logo_skynet} alt="logo_skynet" width={50} height={50} />
			),
			title: 'Skynet',
			href: 'https://skynet.kg'
		},
		{
			node: (
				<Image
					src={logo_kyrgyzaltyn}
					alt="logo_kyrgyzaltyn"
					width={100}
					height={100}
				/>
			),
			title: 'Кыргыз Алтын',
			href: 'https://www.kyrgyzaltyn.kg'
		},
		{
			node: (
				<Image src={logo_growave} alt="logo_growave" width={50} height={50} />
			),
			title: 'Growave',
			href: 'https://www.growave.io/'
		},
		{
			node: (
				<Image src={logo_remotion} alt="logo_remotion" width={90} height={80} />
			),
			title: 'Remotion',
			href: 'https://remotion.kg'
		},
		{
			node: (
				<Image src={logo_asiabank} alt="logo_asiabank" width={50} height={50} />
			),
			title: 'AsiaBank',
			href: 'https://www.bankasia.kg'
		},
		{
			node: (
				<Image
					src={logo_bishkekcityhall}
					alt="bishkekcityhall"
					width={50}
					height={50}
				/>
			),
			title: 'Мэрия Бишкек',
			href: 'https://bishkek.gov.kg'
		},
		{
			node: <Image src={logo_mbank} alt="logo_mbank" width={50} height={50} />,
			title: 'MBank',
			href: 'https://mbank.kg'
		},
		{
			node: (
				<Image src={logo_aiylbank} alt="logo_aiylbank" width={50} height={50} />
			),
			title: 'AiylBank',
			href: 'https://www.ab.kg/ky'
		},
		{
			node: (
				<Image
					src={logo_timelyskills}
					alt="logo_timelyskills"
					width={50}
					height={50}
				/>
			),
			title: 'TimelySkills',
			href: 'https://timelyskills.com/'
		}
	];

	const { t } = useTranslation('home');

	return (
		<section className={scss.StudentsWorkplace}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.block}>
						<div className={scss.top}>
							<div className={scss.tag}>
								<IconStudentsWorkplace />
							</div>
							<CustomTitle
								title={t('studentsWorkPlace.theme')}
								spanRight={t('studentsWorkPlace.custom_theme')}
								color="#000000"
							/>
						</div>
						<div className={scss.logoWrapper}>
							{/* Basic horizontal loop */}
							<LogoLoop
								logos={company_logos}
								speed={100}
								direction="left"
								logoHeight={logoHeightTrack}
								gap={40}
								hoverSpeed={0}
								fadeOutColor="#ffffff"
								ariaLabel="Work companies"
							/>
						</div>
						{/* <Image
							className={scss.students_workplace_1}
							width={1450}
							height={400}
							src={students_workplace_1}
							alt="students_workplace_1"
						/>
						<Image
							className={scss.students_workplace_2}
							width={900}
							height={300}
							src={students_workplace_2}
							alt="students_workplace_2"
						/> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentsWorkplace;
