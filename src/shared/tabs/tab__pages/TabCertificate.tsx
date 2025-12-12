// import React, { FC, useState } from 'react';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import scss from './TabPages.module.scss';

// import Image from 'next/image';
// import pic1 from '@/assets/certificate/ex-1.png';
// import pic2 from '@/assets/certificate/ex-2.png';
// import pic3 from '@/assets/certificate/ex-3.png';
// import pic4 from '@/assets/certificate/ex-4.png';
// import pic5 from '@/assets/certificate/ex-5.png';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// interface SlidersProps {
// 	img: any;
// }

// const images: SlidersProps[] = [
// 	{
// 		img: pic1
// 	},
// 	{
// 		img: pic2
// 	},
// 	{
// 		img: pic3
// 	},
// 	{
// 		img: pic4
// 	},
// 	{
// 		img: pic5
// 	}
// ];

// const TabCertificate: FC = () => {
// 	const [currentSlide, setCurrentSlide] = useState<any>(0);
// 	const [loaded, setLoaded] = useState<any>(false);
// 	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
// 		{
// 			// ! slider
// 			loop: true,
// 			// mode: "free-snap",
// 			slides: {
// 				// origin: "center",
// 				perView: 1,
// 				spacing: 10
// 			},

// 			breakpoints: {
// 				'(min-width: 650px)': {
// 					slides: { perView: 2, spacing: 15 }
// 				},
// 				'(min-width: 1000px)': {
// 					slides: { origin: 'center', perView: 3, spacing: 25 }
// 				}
// 			},

// 			// ! navigation + buttons
// 			initial: 0,
// 			slideChanged(slider) {
// 				setCurrentSlide(slider.track.details.rel);
// 			},
// 			created() {
// 				setLoaded(true);
// 			}
// 		},

// 		// ! auto play
// 		[
// 			(slider) => {
// 				let timeout: ReturnType<typeof setTimeout>;
// 				let mouseOver = false;

// 				function clearNextTimeout() {
// 					clearTimeout(timeout);
// 				}

// 				function nextTimeout() {
// 					clearTimeout(timeout);
// 					if (mouseOver) return;
// 					timeout = setTimeout(() => {
// 						slider.next();
// 						4;
// 					}, 1500);
// 				}

// 				slider.on('created', () => {
// 					slider.container.addEventListener('mouseover', () => {
// 						mouseOver = true;
// 						clearNextTimeout();
// 					});
// 					slider.container.addEventListener('mouseout', () => {
// 						mouseOver = false;
// 						nextTimeout();
// 					});
// 					nextTimeout();
// 				});
// 				slider.on('dragStarted', clearNextTimeout);
// 				slider.on('animationEnded', nextTimeout);
// 				slider.on('updated', nextTimeout);
// 			}
// 		]
// 	);

// 	return (
// 		<>
// 			<div className={scss.certificate__container}>
// 				<div className={scss.title}>
// 					Наши <span>Сертификаты</span>!
// 				</div>
// 				<div className={scss.navigation__wrapper}>
// 					<div ref={ref} className="keen-slider">
// 						{images.map((item, index) => (
// 							<div key={index + 1} className="keen-slider__slide">
// 								<div className={scss.card}>
// 									<Image
// 										className={scss.img}
// 										quality={50}
// 										loading="eager"
// 										src={item.img}
// 										alt={'certificate'}
// 									/>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{loaded && instanceRef.current && (
// 					<div className={scss.dots}>
// 						{/* ! arrow__left */}
// 						<div>
// 							{loaded && instanceRef.current && (
// 								<>
// 									<span
// 										className={`${scss.arrow} ${scss.arrow__left}`}
// 										onClick={(e: any) =>
// 											e.stopPropagation() || instanceRef.current?.prev()
// 										}
// 									>
// 										<IconChevronLeft stroke={2} />
// 									</span>
// 								</>
// 							)}
// 						</div>
// 						{/* ! dot */}
// 						{Array.from(
// 							{ length: instanceRef.current.track.details.slides.length },
// 							(_, idx) => (
// 								<button
// 									key={idx}
// 									onClick={() => {
// 										instanceRef.current?.moveToIdx(idx);
// 									}}
// 									className={
// 										currentSlide === idx
// 											? `${scss.dot} ${scss.active}`
// 											: `${scss.dot}`
// 									}
// 								></button>
// 							)
// 						)}
// 						{/* ! arrow__right */}
// 						<div>
// 							{loaded && instanceRef.current && (
// 								<>
// 									<span
// 										className={`${scss.arrow} ${scss.arrow__right}`}
// 										onClick={(e: any) =>
// 											e.stopPropagation() || instanceRef.current?.next()
// 										}
// 									>
// 										<IconChevronRight stroke={2} />
// 									</span>
// 								</>
// 							)}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// };
// export default TabCertificate;

import React, { FC } from 'react';

interface TabProps {
	title?: any;
	text?: any;
}

const TabCertificate: FC<TabProps> = ({ title, text }) => {
	return (
		<>
			<div className={title}>
				Наши <span>Сертификаты</span>!
			</div>
			<p className={text}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
				excepturi ducimus sequi dignissimos expedita tempore omnis quos cum,
				possimus, aspernatur esse nihil commodi est maiores dolorum rem iusto
				atque, beatae voluptas sit eligendi architecto dolorem temporibus. Non
				magnam ipsam, voluptas quasi nam dicta ut.
			</p>
		</>
	);
};
export default TabCertificate;
