'use client';
import { FC } from 'react';
import scss from './Python.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import pythonPhoto from '@/assets/img/python/python.webp';

const Python: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

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
								Инженер <span>Python</span>
							</h1>
							<p className={scss.text}>
								Стань экспертом в разработке на языке Python и овладей
								инженерными навыками для создания мощных приложений.
							</p>
							<button className={scss.button} onClick={handleScrollContact}>
								Записаться <IconChevronRight stroke={2} />
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
