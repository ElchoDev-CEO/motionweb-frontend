'use client';
import { FC, ReactNode } from 'react';
import scss from './Tag.module.scss';

interface ITag {
	icon: any;
	children: ReactNode;
}

const Tag: FC<ITag> = ({ icon, children }) => {
	return (
		<div className={scss.Tag}>
			<div className={scss.content}>
				{icon} {children}
			</div>
		</div>
	);
};

export default Tag;
