'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import scss from './Style.module.scss';
import { IoIosDoneAll } from 'react-icons/io';
import SplitText from '@/components/SplitText';
import GoogleButton from '@/appPages/auth/components/pages/authButtons/GoogleButton';
import GitHubButton from '@/appPages/auth/components/pages/authButtons/GitHubButton';
import AppleButton from '@/appPages/auth/components/pages/authButtons/AppleButton';
import logo from '@/assets/logo.png';
import { useTranslation } from 'react-i18next';

const SingUpPage: FC = () => {
	const { t } = useTranslation('translated');

	return (
		<>
			<div className={scss.auth}>
				{/* ! left */}
				<div className={scss.left}>
					<Link className={scss.back_link} href={'/'}>
						&lt; {t('signUp.back')}
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
											<p className={scss.title}>
												{t('signUp.accessBlock.title')}
											</p>
											<p className={scss.text}>
												{t('signUp.accessBlock.description')}
											</p>
										</div>
									</div>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>
												{t('signUp.consolidateBlock.title')}{' '}
											</p>
											<p className={scss.text}>
												{t('signUp.consolidateBlock.description')}
											</p>
										</div>
									</div>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>
												{' '}
												{t('signUp.freeConsBlock.title')}
											</p>
											<p className={scss.text}>
												{t('signUp.freeConsBlock.description')}
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* <div className={scss.our_graduates}>
								<p className={scss.sup_title}>
									Our graduates work at companies like:
								</p>
								<div className={scss.images}>
									{company_logos.map((item, index) => (
										<Image
											key={index + 1}
											src={item.img}
											width={item.width}
											height={item.height}
											alt={item.alt}
											style={{
												width: item.width,
												height: item.height
											}}
										/>
									))}
								</div>
							</div> */}
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
									text={t('signUp.content.text')}
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
								<GoogleButton>{t('signUp.content.googleBtn')}</GoogleButton>
								<GitHubButton>{t('signUp.content.gitHubBtn')}</GitHubButton>
								<AppleButton>{t('signUp.content.appleBtn')}</AppleButton>
								<p className={scss.privacy}>
									{t('signUp.content.agree.text')}{' '}
									<Link href={'/privacy-policy.pdf'} target={'_blank'}>
										{t('signUp.content.agree.privacy')}
									</Link>{' '}
									{t('signUp.content.agree.between')}{' '}
									<Link href={'/terms-of-service.pdf'} target={'_blank'}>
										{t('signUp.content.agree.terms')}
									</Link>
									.
								</p>
								<p className={scss.auth_switcher}>
									{/* eslint-disable-next-line react/no-unescaped-entities */}
									{/* Уже есть аккаунт? <Link href="/auth/sign-in">Войти</Link> */}
									{t('signUp.content.alreadyHaveAcc')}{' '}
									<Link href="/auth/sign-up">{t('signUp.content.signIn')}</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SingUpPage;
