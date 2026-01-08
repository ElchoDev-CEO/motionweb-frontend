import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import scss from './Style.module.scss';
import { IoIosDoneAll } from 'react-icons/io';
import SplitText from "@/components/SplitText";

import GoogleButton from '@/appPages/auth/components/pages/authButtons/GoogleButton';
import GitHubButton from '@/appPages/auth/components/pages/authButtons/GitHubButton';
import AppleButton from '@/appPages/auth/components/pages/authButtons/AppleButton';
import logo from '@/assets/logo.png';



const SingInPage: FC = () => {
	return (
		<>
			<div className={scss.auth}>
				{/* ! left */}
				<div className={scss.left}>
					<Link className={scss.back_link} href={'/'}>
						&lt; Back
					</Link>
					<div className={scss.container}>
						<div className={scss.content}>
							<div className={scss.get_started}>
								<div className={scss.blocks}>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>Доступ к микро-лекциям</p>
											<p className={scss.text}>
												Мы предоставляем бесплатные микро-лекции по Java и soft-skills от опытных преподавателей из ведущих компаний, таких как Apple. Учитесь у лучших и применяйте полученные знания на практике в реальных проектах.
											</p>
										</div>
									</div>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>Закрепляйте знания на практике</p>
											<p className={scss.text}>
												Наша платформа предлагает практические задания по Java с мгновенной автоматической проверкой результатов. Это помогает отслеживать прогресс и быстро находить области, требующие улучшения.
											</p>
										</div>
									</div>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>Бесплатная консультация</p>
											<p className={scss.text}>
												Бесплатные персональные консультации с нашими учебными консультантами помогут вам определить цели обучения, выбрать подходящие курсы и получить рекомендации по их успешному прохождению.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ! right */}
				<div className={scss.right}>
					<div className={scss.container}>
						<div className={scss.content}>
							<Link href="/" className={`${scss.logo_link}`}>
								<Image
									className={scss.icon}
									src={logo}
									width={100}
									height={100}
									priority
									alt="logo"
								/>
								Motion<span>Web</span>
							</Link>
							<div className={scss.auth_buttons}>

								<SplitText
									text="С возвращением!"
									className="text-3xl text-center"
									delay={100}
									duration={0.6}
									ease="power3.out"
									splitType="chars"
									from={{ opacity: 0, y: 40 }}
									to={{ opacity: 1, y: 0 }}
									threshold={0.1}
									rootMargin="-100px"
									textAlign="center"
								/>
								<h2 className={scss.title}></h2>
								<GoogleButton>Войти через Google</GoogleButton>
								<GitHubButton>Войти через GitHub</GitHubButton>
								<AppleButton>Войти через Apple</AppleButton>
								<p className={scss.privacy}>
									Входя в систему, вы соглашаетесь с нашей{' '}
									<Link href={'/privacy-policy.pdf'} target={'_blank'}>
										Политикой конфиденциальности
									</Link>{' '}
									и{' '}
									<Link href={'/terms-of-service.pdf'} target={'_blank'}>
										Условиями использования
									</Link>
									.
								</p>
								<p className={scss.auth_switcher}>
									{/* eslint-disable-next-line react/no-unescaped-entities */}
									Нет аккаунта?{' '}
									<Link href="/auth/sign-up">Зарегистрируйтесь</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SingInPage;
