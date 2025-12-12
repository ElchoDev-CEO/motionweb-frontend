'use client';
import { FC } from 'react';
import scss from './Advantages.module.scss';
import CustomTitle from '@/ui/title/CustomTitle';
import photoImage from '@/assets/img/advantages/full_section.png';
import Image from 'next/image';

const Advantages: FC = () => {
	return (
		<section className={scss.Advantages}>
			<div className="container">
				<div className={scss.content}>
					<CustomTitle color="#000" spanLeft="Преимущества" title=" курса" />
					<div className={scss.block}>
						<Image className={scss.img} src={photoImage} alt="block_section" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
