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

const SingInPage: FC = () => {
	const { t } = useTranslation('translated');
	return (
		<>
			<div className={scss.auth}>
				{/* ! left */}
				<div className={scss.left}>
					<Link className={scss.back_link} href={'/'}>
						&lt; {t('signIn.back')}
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
												{t('signIn.accessBlock.title')}
											</p>
											<p className={scss.text}>
												{t('signIn.accessBlock.description')}
											</p>
										</div>
									</div>
									<div className={scss.block}>
										<div className={scss.icon}>
											<IoIosDoneAll />
										</div>
										<div className={scss.child_block}>
											<p className={scss.title}>
												{t('signIn.consolidateBlock.title')}{' '}
											</p>
											<p className={scss.text}>
												{t('signIn.consolidateBlock.description')}
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
												{t('signIn.freeConsBlock.title')}
											</p>
											<p className={scss.text}>
												{t('signIn.freeConsBlock.description')}
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
									text={t('signIn.content.text')}
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
								<GoogleButton>{t('signIn.content.googleBtn')}</GoogleButton>
								<GitHubButton>{t('signIn.content.gitHubBtn')}</GitHubButton>
								<AppleButton>{t('signIn.content.appleBtn')}</AppleButton>
								<p className={scss.privacy}>
									{t('signIn.content.agree.text')}{' '}
									<Link href={'/privacy-policy.pdf'} target={'_blank'}>
										{t('signIn.content.agree.privacy')}
									</Link>{' '}
									{t('signIn.content.agree.between')}{' '}
									<Link href={'/terms-of-service.pdf'} target={'_blank'}>
										{t('signIn.content.agree.terms')}
									</Link>
									.
								</p>
								<p className={scss.auth_switcher}>
									{/* eslint-disable-next-line react/no-unescaped-entities */}
									{t('signIn.content.noAccount')}{' '}
									<Link href="/auth/sign-up">{t('signIn.content.signUp')}</Link>
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
