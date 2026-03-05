'use client';
import { FC } from 'react';
import scss from './License.module.scss';
import Image from 'next/image';
import Tag from '@/ui/tag/Tag';
import { IconSchool } from '@tabler/icons-react';
// import license_bg from '@/assets/license-bg.png';
import license_photo from '@/assets/license-photo.png';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

const License: FC = () => {
	const { i18n, t } = useTranslation('translated');

	return (
		<section className={scss.License}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<Tag icon={<IconSchool stroke={2} />}>
							{t('home.license.subtopic')}
						</Tag>
						<CustomTitle title={t('home.license.theme')} color="#ffffff" />
						<ul className={scss.text}>
							<li>
								<p>{t('home.license.subtitle')}</p>
							</li>
							<li>
								<p>{t('home.license.additionally')}</p>
							</li>
						</ul>
					</div>
					<div className={scss.right}>
						<Image
							width={650}
							height={360}
							src={license_photo}
							alt="license_photo"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default License;
