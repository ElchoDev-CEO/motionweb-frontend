'use client';
import { FC, useState } from 'react';
import scss from './OurMentors.module.scss';
import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { elcho, isa, marlen, take, dastan } from '@/assets/img/our_mentors';
import CustomTitle from '@/ui/title/CustomTitle';

const mentorsData = [
	{
		name: 'Талаайбек Ыманкулов',
		role: 'FrontEnd Ментор',
		photoUrl: take,
		linkedin: '#'
	},
	{
		name: 'Ислам Аубакиров',
		role: 'FrontEnd Ментор',
		photoUrl: isa,
		linkedin: '#'
	},
	{
		name: 'Эльхан Шаршенбеков',
		role: 'FullStack Ментор',
		photoUrl: elcho,
		linkedin: 'https://linkedin.com/in/elcho'
	},
	{
		name: 'Марлен',
		role: 'BackEnd Ментор',
		photoUrl: marlen,
		linkedin: '#'
	},
	{
		name: 'Дастан',
		role: 'FrontEnd Ментор',
		photoUrl: dastan,
		linkedin: '#'
	}
];

const OurMentors: FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
		// slider settings
		{
			loop: true,
			mode: 'free-snap',
			breakpoints: {
				'(max-width: 1250px)': {
					slides: { perView: 3, spacing: 15 }
				},
				'(max-width: 1000px)': {
					slides: { perView: 2, spacing: 5 }
				},
				'(max-width: 600px)': {
					slides: { perView: 1, spacing: 3 }
				}
			},
			slides: { perView: 4, spacing: 25 },
			// control
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			}
		},
		// autoplay
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
					}, 1300);
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
		<section className={scss.OurMentors}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top_block}>
						<CustomTitle title="Наши " spanRight="менторы" color="#000000" />
						<p className={scss.text}>
							Каждый ментор в нашей академии имеет высокую квалификацию и
							большой опыт в своей области.
						</p>
					</div>
					<div className={scss.slider_control}>
						{loaded && instanceRef.current && (
							<>
								<button
									onClick={(e: any) =>
										e.stopPropagation() || instanceRef.current?.prev()
									}
									// disabled={currentSlide === 0}
								>
									<IconChevronLeft />
								</button>

								<button
									onClick={(e: any) =>
										e.stopPropagation() || instanceRef.current?.next()
									}
									// disabled={
									// 	currentSlide ===
									// 	instanceRef.current.track.details.slides.length - 1
									// }
								>
									<IconChevronRight />
								</button>
							</>
						)}
					</div>
					<div className={scss.slider_mentors}>
						<div ref={ref} className="keen-slider">
							{mentorsData.map((item, index) => (
								<div key={index} className="keen-slider__slide">
									<div className={scss.mentor}>
										<div className={scss.photo_block}>
											<Image
												width={512}
												height={512}
												src={item.photoUrl}
												alt={item.name}
											/>
										</div>
										<div className={scss.info_block}>
											<div className={scss.mentor_name_role}>
												<h1 className={scss.name}>{item.name}</h1>
												<p className={scss.role}>{item.role}</p>
											</div>
											<a
												className={scss.linkedin}
												href={item.linkedin}
												target="_blank"
											>
												<FaLinkedinIn />
											</a>
										</div>
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

export default OurMentors;
