'use client';
import { FC } from 'react';
import scss from './CustomTitle.module.scss';

interface ITitleProps {
	spanLeft?: string;
	title: string;
	spanRight?: string;
	color: string;
}

const CustomTitle: FC<ITitleProps> = ({
	spanLeft,
	title,
	spanRight,
	color
}) => {
	return (
		<section className={scss.CustomTitle}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1
						className={scss.title}
						style={{
							color: color
						}}
					>
						{spanLeft && <span className={scss.span}>{spanLeft} </span>}
						{title}
						{spanRight && <span className={scss.span}> {spanRight}</span>}
					</h1>
				</div>
			</div>
		</section>
	);
};

export default CustomTitle;
