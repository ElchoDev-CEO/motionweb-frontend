'use client';
import { FC } from 'react';
import scss from './Gallery.module.scss';

const Gallery: FC = () => {
	return (
		<section className={scss.Gallery}>
			<div className="container">
				<div className={scss.content}>Gallery</div>
			</div>
		</section>
	);
};

export default Gallery;
