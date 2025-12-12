'use client';
import { FC } from 'react';
import scss from './WelcomeOld.module.scss';

const WelcomeOld: FC = () => {
	return (
		<section className={scss.WelcomeOld}>
			<div className="container">
				<div className={scss.content}>WelcomeOld</div>
			</div>
		</section>
	);
};

export default WelcomeOld;
