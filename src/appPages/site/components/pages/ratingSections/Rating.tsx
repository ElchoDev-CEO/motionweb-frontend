'use client';
import { FC } from 'react';
import scss from './Rating.module.scss';

const Rating: FC = () => {
	return (
		<section className={scss.Rating}>
			<div className="container">
				<div className={scss.content}>Rating</div>
			</div>
		</section>
	);
};

export default Rating;
