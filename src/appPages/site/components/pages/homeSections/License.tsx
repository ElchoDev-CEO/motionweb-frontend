'use client';
import { FC } from 'react';
import scss from './License.module.scss';
import Image from 'next/image';
import Tag from '@/ui/tag/Tag';
import { IconSchool } from '@tabler/icons-react';
// import license_bg from '@/assets/license-bg.png';
import license_photo from '@/assets/license-photo.png';
import CustomTitle from '@/ui/title/CustomTitle';

const License: FC = () => {
	return (
		<section className={scss.License}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<Tag icon={<IconSchool stroke={2} />}>Диплом</Tag>
						<CustomTitle
							title="Лицензия от Министерства Образования"
							color="#ffffff"
						/>
						<ul className={scss.text}>
							<li>
								<p>
									Наша академия имеет Лицензию от Министерства Образования, что
									гарантирует качество и законность предоставляемых
									образовательных услуг.
								</p>
							</li>
							<li>
								<p>
									Кроме того, наша академия после успешного завершения обучения,
									каждому студенту выдает диплом или сертификат об окончании
									образовательной программы.
								</p>
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
