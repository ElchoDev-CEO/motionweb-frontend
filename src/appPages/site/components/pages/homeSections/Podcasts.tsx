'use client';
import { FC } from 'react';
import scss from './Podcasts.module.scss';
import ReactPlayer from 'react-player';
import Tag from '@/ui/tag/Tag';
import { IconMicrophone } from '@tabler/icons-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import CustomTitle from '@/ui/title/CustomTitle';
import { useTranslation } from 'react-i18next';

// if (typeof window !== 'undefined') {
// 	const originalFetch = window.fetch;
// 	window.fetch = async (...args) => {
// 		if (args[0].includes('play.google.com')) {
// 			console.warn('Blocked request to:', args[0]);
// 			return new Response(JSON.stringify({}), { status: 204 });
// 		}
// 		return originalFetch(...args);
// 	};
// }

// https://youtu.be/

const podcasts_data = [
	{
		name: 'MOTION PODCAST | Знакомство | Аскеров Канатбек',
		nameKg: 'MOTION PODCAST | ТААНЫШУУ | Аскеров Канатбек',
		nameEn: 'MOTION PODCAST | Acquaintance | Askerov Kanatbek',
		videoUrl: 'https://youtu.be/ldiOAWE6j8s'
	},
	{
		name: 'Алишер Турдалиев КАРЛИКОВЫЙ ИЗ ДЕРЕВНИ В ДУБАЙ',
		nameKg: 'Алишер Турдалиев КАРЛИКОВЫЙ АЙЫЛДАН ДУБАЙГА',
		nameEn: 'Alisher Turdaliev FROM KARLIKOVY VILLAGE TO DUBAI',
		videoUrl: 'https://youtu.be/wtUwUao7nJg'
	},
	{
		name: 'Электронное меню для ресторанов и кафе в рамках IT-клуба',
		nameKg:
			'IT клубтун алкагында ресторан жана кафелерге жасашкан электрондук меню',
		nameEn:
			'Electronic menus created for restaurants and cafes as part of the IT club',
		videoUrl: 'https://youtu.be/SDCDrdlYScE'
	},
	{
		name: 'INTI-МЕЖДУНАРОДНЫЙ ВУЗ!',
		nameKg: 'INTI - ЭЛ АРАЛЫК ЖОГОРКУУ ОКУУ ЖАЙ!',
		nameEn: 'INTI - IS AN INTERNATIONAL UNIVERSITY!',
		videoUrl: 'https://youtu.be/0n912BOhx7Q'
	},
	{
		name: 'APU - МАЛАЙЗИЯДАГЫ №1 IT ОКУУ ЖАЙ',
		nameKg: 'ОБЩЕСТВО-ЧТО ТАКОЕ 1 СТРАНИЦА ОБУЧЕНИЯ В МАЛАЙЗИИ',
		nameEn: 'APU - №1 IT SCHOOL IN MALAYSIA',
		videoUrl: 'https://youtu.be/wModLQ7Alu4'
	}
];

const Podcasts: FC = () => {
	const { i18n, t } = useTranslation('translated');

	const [ref] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			mode: 'free-snap',
			breakpoints: {
				'(min-width: 600px)': {
					slides: { perView: 2, spacing: 5 }
				},
				'(min-width: 1000px)': {
					slides: { perView: 3, spacing: 10 }
				}
			},
			slides: { perView: 1, spacing: 3 }
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = true;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 1500);
				}
				slider.on('created', () => {
					slider.container.addEventListener('mouseover', () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener('mouseout', () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on('dragStarted', clearNextTimeout);
				slider.on('animationEnded', nextTimeout);
				slider.on('updated', nextTimeout);
			}
		]
	);

	return (
		<section className={scss.Podcasts}>
			<div className="container">
				<div className={scss.content}>
					<Tag icon={<IconMicrophone stroke={2} />}>
						{t('home.podcasts.subtopic')}
					</Tag>
					<CustomTitle
						title={t('home.podcasts.theme')}
						spanRight={t('home.podcasts.custom_theme')}
						color="#ffffff"
					/>
					<div className={scss.gridContainer}>
						<div ref={ref} className="keen-slider">
							{podcasts_data.map((item, index) => (
								<div key={index} className="keen-slider__slide">
									<div className={scss.card}>
										<ReactPlayer
											className={scss.player}
											src={item.videoUrl}
											controls={true}
											width="380px"
											height="225px"
										/>
										<p>
											{i18n.language === 'en'
												? item.nameEn
												: i18n.language === 'kg'
													? item.nameKg
													: item.name}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Podcasts;
