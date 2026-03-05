'use client';
import { FC } from 'react';
import scss from './Kids.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import kidsPhoto from '@/assets/img/kids/kids.webp';
import { useTranslation } from 'react-i18next';

const Kids: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

	const { i18n, t } = useTranslation('translated');
	return (
		<section className={scss.Kids}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.content}>
						<div className={scss.left}>
							<span className={scss.icon}>
								<IconCourses />
							</span>
							<h1 className={scss.title}>
								{t('kids.banner.theme')}{' '}
								<span>{t('kids.banner.custom_theme')}</span>
							</h1>
							<p className={scss.text}>{t('kids.banner.subtitle')}</p>
							<button className={scss.button} onClick={handleScrollContact}>
								{t('kids.banner.btnText')} <IconChevronRight stroke={2} />
							</button>
						</div>
						<div className={scss.right}>
							<Image
								className={scss.img}
								width={700}
								height={660}
								src={kidsPhoto}
								alt="PC illustration"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Kids;
