'use client';
import React, { FC } from 'react';
import scss from './Footer.module.scss';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import logo from '@/assets/logo.png';
import { extraSiteLinks, siteLinks } from '@/constants/links';

type Inputs = {
	email: string;
};

const Footer: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.top}>
							<div className={scss.block}>
								<div className={scss.links}>
									<a className={scss.tel_link} href="tel:+996700232400">+996-700-232-400</a>
									<span>Контактный центр</span>
									<Link className={scss.email_link} href="#">motion.web@gmail.com</Link>
									{/* boss.armsport@gmail.com */}
									<div className={scss.social_links}>
										<a href="https://www.tiktok.com/@it_motionweb" target="_blank">
											<FaTiktok />
										</a>
										<a href="https://www.instagram.com/motion_web/" target="_blank">
											<AiFillInstagram />
										</a>
										<a
											href="https://www.youtube.com/@motionwebllc683"
											target="_blank"
										>
											<FaYoutube />
										</a>
										<a
											href="https://www.linkedin.com/company/motionwebllc/"
											target="_blank"
										>
											<FaLinkedin />
										</a>
									</div>
								</div>
							</div>

							<div className={scss.directions_block}>
								<div className={scss.directions_block__links}>
									{siteLinks.map((item, index) => (
										<Link key={index} href={item.href}>
											{item.name}
										</Link>
									))}
								</div>
								<div className={scss.directions_block__links}>
									{extraSiteLinks.map((item, index) => (
										<Link key={index} href={item.href}>
											{item.name}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className={scss.block_about}>
							<Image className={scss.logo} src={logo} alt="logo" />
							<p>
								Поднимите свою карьеру, доход и жизнь на новый уровень.
								MotionWeb помог более 100 студентам получить свою первую
								работу в сфере технологий. Станьте следующим и измените свою
								жизнь уже сегодня!
							</p>
						</div>
						<span className={scss.line}></span>
						<div className={scss.bottom}>
							<p>
								Copyright © 2021-2025 MotionWeb | Powered by ElchoDev | Privacy
								Policy | Terms & Conditions
							</p>

						</div>
					</div>
				</div>
			</footer>
		</>
	);
};
export default Footer;
