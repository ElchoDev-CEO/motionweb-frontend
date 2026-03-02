'use client';
import { FC, useEffect, useState } from 'react';
import scss from './Maps.module.scss';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

const Maps: FC = () => {
	const [isMobile, setIsMobile] = useState(false);

	const { t } = useTranslation('home');

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 700);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section className={scss.Maps}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<CustomTitle
							title={t('location.theme')}
							spanRight={t('location.custom_theme')}
							color="#000000"
						/>
						<div className={scss.right}>
							<p className={scss.address}>{t('location.adress')}</p>
							<a className={scss.phone} href="tel:+996700232400">
								+996-700-232-400
							</a>
						</div>
					</div>
					<div className={scss.map_address}>
						{isMobile ? (
							<>
								<iframe
									src="/map_mobile.html"
									frameBorder="0"
									title="Map on 2GIS"
								></iframe>
							</>
						) : (
							<>
								<iframe
									src="/map_desktop.html"
									frameBorder="0"
									title="Map on 2GIS"
								></iframe>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Maps;
