'use client';
import { FC } from 'react';
import scss from './WelcomeItClub.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconInternship } from '@/assets/icons';
import ItClubPhoto from '@/assets/img/it-club/it-club.png';

const WelcomeItClub: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className={scss.WelcomeItClub}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<span className={scss.icon}>
							<IconInternship />
						</span>
						<h1 className={scss.title}>IT Клуб</h1>
						<p className={scss.text}>
							Стань экспертом в разработке на языке JavaScript и овладей
							инженерными навыками для создания сложных веб-приложений.
						</p>
						{/* Исправлено: добавлен id-атрибут для плавной прокрутки */}
						<button className={scss.button} onClick={handleScrollContact}>
							Подать заявку <IconChevronRight stroke={2} />
						</button>
					</div>
					<div className={scss.right}>
						<Image
							className={scss.img}
							width={663}
							height={546}
							src={ItClubPhoto}
							alt="IT Club illustration"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WelcomeItClub;
