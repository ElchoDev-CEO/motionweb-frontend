'use client';
import { FC } from 'react';
import scss from './FullStack.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import fullStackPhoto from '@/assets/img/full-stack/fullstack-dev.webp';
import { IoIosLeaf } from "react-icons/io";

const FullStack: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

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
								Инженер <span>Javascript</span>
							</h1>
							<p className={scss.text}>
								Cтань экспертом в разработке на языке JavaScript и овладей
								инженерными навыками для создания сложных веб-приложений.
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
