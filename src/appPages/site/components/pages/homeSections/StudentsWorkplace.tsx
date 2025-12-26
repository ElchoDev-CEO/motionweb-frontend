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
	logo_chase,
	logo_apple,
	logo_microsoft,
	logo_verizon,
	logo_caterpillar,
	logo_amazon,
	logo_trueaccord,
	logo_openfit
} from '@/assets/company_logos';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import Image from 'next/image';


const StudentsWorkplace: FC = () => {

	const [logoHeightTrack, setLogoHeightTrack] = useState(40)

	useEffect(() => {
		const update = () => {
			if (window.innerWidth <= 768) {
				setLogoHeightTrack(30)
			} else if (window.innerHeight <= 470) {
				setLogoHeightTrack(20)
			}
			else {
				setLogoHeightTrack(40)
			}
		}

		window.addEventListener("resize", update)
		return () => window.removeEventListener("resize", update)

	}, [])

	const company_logos = [
		{ node: <Image src={logo_chase} alt="Chase" width={50} height={50} />, title: "Chase", href: "https://chase.com" },
		{ node: <Image src={logo_apple} alt="Apple" width={50} height={50} />, title: "Apple", href: "https://apple.com" },
		{ node: <Image src={logo_microsoft} alt="Microsoft" width={50} height={50} />, title: "Microsoft", href: "https://microsoft.com" },
		{ node: <Image src={logo_verizon} alt="Verizon" width={50} height={50} />, title: "Verizon", href: "https://verizon.com" },
		{ node: <Image src={logo_caterpillar} alt="Caterpillar" width={50} height={50} />, title: "Caterpillar", href: "https://www.caterpillar.com" },
		{ node: <Image src={logo_amazon} alt="Amazon" width={50} height={50} />, title: "Amazon", href: "https://amazon.com" },
		{ node: <Image src={logo_trueaccord} alt="TrueAccord" width={90} height={80} />, title: "TrueAccord", href: "https://trueaccord.com" },
		{ node: <Image src={logo_openfit} alt="OpenFit" width={50} height={50} />, title: "OpenFit", href: "https://openfit.com" },
	];




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
								title="Где работают "
								spanRight="наши студенты"
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
