'use client';
import { FC } from 'react';
import scss from './FullStack.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import fullStackPhoto from '@/assets/img/full-stack/fullstack-dev.webp';
import { IoIosLeaf } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const FullStack: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};
	const { t } = useTranslation('translated');

	return (
		<section className={scss.FullStack}>
			<IoIosLeaf className={scss.decor_1} />
			<div className="container">
				<div className={scss.content}>
					<div className={scss.content}>
						<div className={scss.left}>
							<span className={scss.icon}>
								<IconCourses />
							</span>
							<h1 className={scss.title}>
								{t('fullStack.banner.theme')}{' '}
								<span>{t('fullStack.banner.custom_theme')}</span>
							</h1>
							<p className={scss.text}>{t('fullStack.banner.subtitle')}</p>
							<button className={scss.button} onClick={handleScrollContact}>
								{t('fullStack.banner.btnText')} <IconChevronRight stroke={2} />
							</button>
						</div>
						<div className={scss.right}>
							<Image
								className={scss.img}
								width={700}
								height={660}
								src={fullStackPhoto}
								alt="PC illustration"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FullStack;
