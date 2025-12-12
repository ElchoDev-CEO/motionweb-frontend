import React, { FC, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './TabPages.module.scss';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Rating } from '@mantine/core';

interface SlidersProps {
	title: string;
	text: string;
	user: string;
	rating: number;
	date: string;
}

const reviews: SlidersProps[] = [
	{
		title: 'Удивительно!',
		text: 'Курс превзошел все мои ожидания! Преподаватели объясняют сложные темы доступно, задания помогают закрепить материал, а проектная работа позволила почувствовать себя настоящим разработчиком. Большое спасибо команде MotionWeb!',
		user: 'Elcho911',
		rating: 5,
		date: '14/10/2023'
	},
	{
		title: 'Спасибо вам ❤️',
		text: 'Очень рад, что выбрал именно этот курс. Материалы подготовлены на высшем уровне, обратная связь от наставников приходит быстро и по делу. После прохождения курса уверенно чувствую себя в разработке. Рекомендую!',
		user: 'Sher911',
		rating: 5,
		date: '30/04/2023'
	},
	{
		title: 'Мне понравилось!',
		text: 'Программа курса продумана до мелочей. Много практики, примеры из реальной жизни, поддержка наставников – все это сделало обучение максимально эффективным. Спасибо MotionWeb за классный опыт!',
		user: 'Tima911',
		rating: 4,
		date: '19/06/2023'
	},
	{
		title: 'Лучшие!',
		text: 'Команда MotionWeb – профессионалы! Курс оказался невероятно полезным, благодаря ему я смог сразу приступить к работе над реальными проектами. Это был незабываемый опыт, спасибо за ваше внимание к деталям и поддержку! 🙌🏻',
		user: 'Elcho911',
		rating: 5,
		date: '14/10/2023'
	},
	{
		title: 'Профессиональный подход',
		text: 'Очень доволен обучением. Преподаватели – настоящие эксперты, готовые ответить на любые вопросы. Материалы курса помогли структурировать знания, и я начал писать чистый и качественный код. Отличный курс!',
		user: 'Alex78',
		rating: 5,
		date: '05/03/2023'
	},
	{
		title: 'Очень дружелюбный персонал',
		text: 'До начала курса я немного нервничал, но команда MotionWeb сделала все, чтобы обучение было комфортным. Материал объяснялся понятно, а поддержка помогала двигаться вперед. Огромное спасибо!',
		user: 'HappyStudent',
		rating: 5,
		date: '29/08/2023'
	},
	{
		title: 'Превосходный сервис',
		text: 'Курс превзошел мои ожидания. Организация, учебные материалы и поддержка на высшем уровне. Уже после нескольких занятий я начал применять полученные знания на практике. Спасибо MotionWeb!',
		user: 'CodeSam',
		rating: 5,
		date: '10/09/2023'
	},
	{
		title: 'Высококвалифицированные наставники',
		text: 'Рекомендую курс всем, кто хочет освоить программирование. Наставники с глубокими знаниями и большим опытом, уроки интересные и насыщенные. После обучения я чувствую себя уверенно в IT-сфере.',
		user: 'TechExpert',
		rating: 5,
		date: '20/01/2023'
	},
	{
		title: 'Индивидуальный подход',
		text: 'Команда MotionWeb сделала обучение уникальным. Индивидуальный подход и внимание к каждому студенту позволили добиться потрясающих результатов. Очень рад, что прошел этот курс!',
		user: 'SpecialCode',
		rating: 5,
		date: '12/03/2023'
	},
	{
		title: 'Результаты просто потрясающие',
		text: 'Я в восторге от того, как изменились мои навыки после курса. Практические задания, проекты и наставничество сделали обучение эффективным. Теперь я уверен в своих силах как разработчик.',
		user: 'PerfectCode',
		rating: 5,
		date: '26/01/2023'
	},
	{
		title: 'Прекрасное место для старта в IT',
		text: 'Курс подарил мне уверенность в собственных силах. Преподаватели всегда готовы помочь, материалы легко воспринимаются, а атмосфера обучения мотивирует. Огромное спасибо MotionWeb!',
		user: 'CodeStarter',
		rating: 5,
		date: '15/04/2023'
	}
];

const TabFeedBack: FC = () => {
	const [currentSlide, setCurrentSlide] = useState<any>(0);
	const [loaded, setLoaded] = useState<any>(false);
	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			// ! slider
			loop: true,
			// mode: "free-snap",
			slides: {
				// origin: "center",
				perView: 1,
				spacing: 10
			},

			breakpoints: {
				'(min-width: 650px)': {
					slides: { perView: 2, spacing: 15 }
				},
				'(min-width: 1000px)': {
					slides: { origin: 'center', perView: 3, spacing: 25 }
				}
			},

			// ! navigation + buttons
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			}
		},

		// ! auto play
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;

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
		<>
			<div className={scss.FeedBack__container}>
				<div className={scss.title}>
					Что о нас думают наши <span>Клиенты</span>?
				</div>
				<div className={scss.navigation__wrapper}>
					<div ref={ref} className="keen-slider">
						{reviews.map((item, index) => (
							<div key={index + 1} className="keen-slider__slide">
								<div className={scss.card}>
									<div className={scss.icon}>
										<Rating defaultValue={item.rating} color="red" readOnly />
									</div>
									<h5 className={scss.card__title}>{item.title}</h5>
									<p className={scss.text}>{item.text}</p>
									<h5 className={scss.user__date}>
										{/*{item.user},*/}
										{item.date}
									</h5>
								</div>
							</div>
						))}
					</div>
				</div>

				{loaded && instanceRef.current && (
					<div className={scss.dots}>
						{/* ! arrow__left */}
						<div>
							{loaded && instanceRef.current && (
								<>
									<span
										className={`${scss.arrow} ${scss.arrow__left}`}
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.prev()
										}
									>
										<IconChevronLeft stroke={2} />
									</span>
								</>
							)}
						</div>
						{/* ! dot */}
						{Array.from(
							{ length: instanceRef.current.track.details.slides.length },
							(_, idx) => (
								<button
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={
										currentSlide === idx
											? `${scss.dot} ${scss.active}`
											: `${scss.dot}`
									}
								></button>
							)
						)}
						{/* ! arrow__right */}
						<div>
							{loaded && instanceRef.current && (
								<>
									<span
										className={`${scss.arrow} ${scss.arrow__right}`}
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.next()
										}
									>
										<IconChevronRight stroke={2} />
									</span>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};
export default TabFeedBack;
