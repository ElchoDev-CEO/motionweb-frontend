'use client';
import { FC, useRef, useState } from 'react';
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
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)

	// refs для autoplay
	const autoplayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
	const isPaused = useRef(false)

	// autoplay plugin
	const autoplay = (slider: any) => {
		const clear = () => {
			if (autoplayTimeout.current) {
				clearTimeout(autoplayTimeout.current)
				autoplayTimeout.current = null
			}
		}

		const start = () => {
			clear()
			if (isPaused.current) return

			autoplayTimeout.current = setTimeout(() => {
				slider.next()
			}, 1300)
		}

		slider.on('created', () => {
			slider.container.addEventListener('mouseover', () => {
				isPaused.current = true
				clear()
			})

			slider.container.addEventListener('mouseout', () => {
				isPaused.current = false
				start()
			})

			start()
		})

		slider.on('dragStarted', clear)
		slider.on('animationEnded', start)
		slider.on('updated', start)

		slider.autoplay = { clear, start }
	}

	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			mode: 'free-snap',
			initial: 0,

			slides: { perView: 4, spacing: 25 },

			breakpoints: {
				'(max-width: 1250px)': {
					slides: { perView: 3, spacing: 15 },
				},
				'(max-width: 1000px)': {
					slides: { perView: 2, spacing: 8 },
				},
				'(max-width: 600px)': {
					slides: { perView: 1, spacing: 6 },
				},
			},

			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel)
			},

			created() {
				setLoaded(true)
			},
		},
		[autoplay]
	)



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
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation()
										instanceRef.current?.autoplay.clear()
										instanceRef.current?.prev()
										instanceRef.current?.autoplay.start()
									}}
								// disabled={currentSlide === 0}
								>
									<IconChevronLeft />
								</button>

								<button
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation()
										instanceRef.current?.autoplay.clear()
										instanceRef.current?.next()
										instanceRef.current?.autoplay.start()
									}}
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
