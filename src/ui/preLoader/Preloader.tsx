import React, { FC } from 'react';
import scss from './PreLoader.module.scss';

interface PreloaderType {
	className?: any;
}

const Preloader: FC<PreloaderType> = ({ className }) => {
	return (
		<div className={scss.loader}>
			<div className={scss.infinityChrome}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Preloader;
