'use client';
import { FC } from 'react';
import scss from './Kids.module.scss';
import Image from 'next/image';
import { IconChevronRight } from '@tabler/icons-react';
import { IconCourses } from '@/assets/icons';
import kidsPhoto from '@/assets/img/kids/kids.gif';

const Kids: FC = () => {
	const handleScrollContact = () => {
		document
			.getElementById('contact-section')
			?.scrollIntoView({ behavior: 'smooth' });
	};

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
								Юный <span>Компьютерный Гений</span>
							</h1>
							<p className={scss.text}>
								Узнай, как правильно пользоваться компьютером, работать с
								программами и безопасно исследовать интернет. Сделай первые шаги
								в мире технологий!
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
