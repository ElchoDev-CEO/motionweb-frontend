'use client';
import { FC } from 'react';
import scss from './WelcomeItClub.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconInternship } from '@/assets/icons';
import ItClubPhoto from '@/assets/img/it-club/it-club_img.webp';
import { useTranslation } from 'react-i18next';

const WelcomeItClub: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};
	const { t } = useTranslation('ITclub');

	return (
		<section className={scss.WelcomeItClub}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<span className={scss.icon}>
							<IconInternship />
						</span>
						<h1 className={scss.title}>
							<span>{t('banner.theme')} </span> {t('banner.custom_theme')}
						</h1>
						<p className={scss.text}>{t('banner.subtitle')}</p>
						{/* Исправлено: добавлен id-атрибут для плавной прокрутки */}
						<button className={scss.button} onClick={handleScrollContact}>
							{t('banner.btnText')} <IconChevronRight stroke={2} />
						</button>
					</div>
					<div className={scss.right}>
						<Image
							className={scss.img}
							width={863}
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
