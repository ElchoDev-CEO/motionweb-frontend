'use client';
import { FC } from 'react';
import scss from './Python.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import pythonPhoto from '@/assets/img/python/python.webp';
import { useTranslation } from 'react-i18next';

const Python: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

	const { t } = useTranslation('translated');

	return (
		<section className={scss.Python}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.content}>
						<div className={scss.left}>
							<span className={scss.icon}>
								<IconCourses />
							</span>
							<h1 className={scss.title}>
								{t('python.banner.theme')}{' '}
								<span>{t('python.banner.custom_theme')}</span>
							</h1>
							<p className={scss.text}>{t('python.banner.subtitle')}</p>
							<button className={scss.button} onClick={handleScrollContact}>
								{t('python.banner.btnText')} <IconChevronRight stroke={2} />
							</button>
						</div>
						<div className={scss.right}>
							<Image
								className={scss.img}
								width={700}
								height={660}
								src={pythonPhoto}
								alt="PC illustration"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Python;
