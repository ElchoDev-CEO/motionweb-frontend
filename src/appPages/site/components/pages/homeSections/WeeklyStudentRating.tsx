'use client';
import { FC, Fragment } from 'react';
import scss from './WeeklyStudentRating.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Tooltip } from '@mantine/core';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TbUserShare } from 'react-icons/tb';
import { useGetAllRatingQuery } from '@/redux/api/rating';
import Loader from '@/ui/loader/Loader';

const temporaryData = [
	{ src: 'https://swiperjs.com/demos/images/nature-1.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-2.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-3.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-4.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-5.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-6.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-7.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-8.jpg' },
	{ src: 'https://swiperjs.com/demos/images/nature-9.jpg' }
];

const WeeklyStudentRating: FC = () => {
	const { data: getAllRatingData, isLoading: isLoadingGetAllRating } =
		useGetAllRatingQuery();

	if (isLoadingGetAllRating) {
		return (
			<section className={scss.WeeklyStudentRating}>
				<div className="container">
					<Loader />
				</div>
			</section>
		);
	}

	if (!getAllRatingData?.results) {
		return (
			<section className={scss.WeeklyStudentRating}>
				<div className="container">
					<Loader />
				</div>
			</section>
		);
	}

	return (
		<section className={scss.WeeklyStudentRating}>
			<div className="container">
				<div className={scss.content}>
					<h1 className={scss.title}>
						Топ-7{' '}
						<span className={scss.custom_title}>
							выдающихся студентов недели
							<span className={scss.icon_question}>
								<Tooltip
									label="Рейтинг обновляется каждую субботу в 00:00"
									position="right"
									withArrow
									offset={5}
								>
									<AiFillQuestionCircle />
								</Tooltip>
							</span>
						</span>
					</h1>
					{getAllRatingData.results.length < 7 ? (
						<div className={scss.soon_rating}>
							<p className={scss.text}>
								Скоро будут результаты рейтинга. Обычно итоги подводятся каждую
								субботу в 00:00 по Бишкекскому времени.
							</p>
						</div>
					) : (
						<div className={scss.rating}>
							<Swiper
								effect={'coverflow'}
								grabCursor={true}
								centeredSlides={true}
								loop={true}
								// slidesPerView={5}
								breakpoints={{
									1280: {
										slidesPerView: 5
									},
									768: {
										slidesPerView: 3
									},
									400: {
										slidesPerView: 1
									}
								}}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false
								}}
								coverflowEffect={{
									rotate: 20,
									stretch: -50,
									depth: 100,
									modifier: 1,
									slideShadows: true
								}}
								pagination={{
									clickable: true,
									dynamicBullets: true
								}}
								modules={[Autoplay, EffectCoverflow, Pagination]}
								className={scss.mySwiper}
							>
								{getAllRatingData?.results.map((item, index) => (
									<Fragment key={index}>
										<SwiperSlide key={index} className={scss.SwiperSlide}>
											<div className={scss.slide}>
												<div className={scss.image_block}>
													<Image
														className={scss.img}
														width={240}
														height={240}
														src={item.user.photo}
														alt={`Nature ${index + 1}`}
													/>
												</div>
												<div className={scss.info_block}>
													<div className={scss.mentor_name_role_mark}>
														<div className={scss.block_top}>
															<h1 className={scss.name}>
																{item.user.firstName} {item.user.lastName}
															</h1>
														</div>
														<div className={scss.block_bottom}>
															<p className={scss.role}>
																{item.user.specialization
																	? item.user.specialization
																	: 'Нету направления'}
															</p>
															<p className={scss.mark}>
																Баллов: {item.totalMark}
															</p>
														</div>
													</div>
													<Link
														className={scss.linkedin}
														href={`/users/${item.userId}`}
													>
														<TbUserShare />
													</Link>
												</div>
											</div>
										</SwiperSlide>
									</Fragment>
								))}
							</Swiper>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default WeeklyStudentRating;
