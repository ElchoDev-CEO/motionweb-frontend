'use client';
import { FC, useEffect, useState } from 'react';
import scss from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, createTheme, MantineProvider, Switch } from '@mantine/core';
import {
	dropDownMenuCourses,
	dropDownMenuResources,
	siteLinks,
	getMenuLinks
} from '@/constants/links';
import { useHeaderStore } from '@/stores/useHeaderStore';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { useGetMeQuery } from '@/redux/api/me';
import logo from '@/assets/logo.png';
import BurgerButton from '@/ui/burgerButton/BurgerButton';
import BurgerMenu from '@/ui/burgerMenu/BurgerMenu';
import ProfileMenu from '@/ui/profileMenu/ProfileMenu';
import ProfileButton from '@/ui/profileButton/ProfileButton';
import DropDownMenu from '@/ui/dropDownMenu/DropDownMenu';
import { useLogoutMutation } from '@/redux/api/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';

const Header: FC = () => {
	const [headerScroll, setHeaderScroll] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [menuLinks, setMenuLinks] = useState<{ name: string; href: string }[]>(
		[]
	);

	const {
		isOpen,
		setIsOpen,
		isOpenDropDownMenuCourses,
		setIsOpenDropDownMenuCourses,
		isOpenDropDownMenuResources,
		setIsOpenDropDownMenuResources
	} = useHeaderStore();
	const { isEdit, setIsEdit } = useEditControlStore();
	const { isAdminOrMentor } = useUserRoleStore();

	const { data: userData } = useGetMeQuery();
	const [logoutMutation] = useLogoutMutation();

	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (userData) {
			const userRole: UserRole = userData.results.role;
			setMenuLinks(getMenuLinks(userRole));
		}
	}, [userData]);

	useEffect(() => {
		// const handleScroll = () => setHeaderScroll(window.scrollY >= 3);
		const handleResize = () => setIsMobile(window.innerWidth < 1270);
		// handleScroll();
		handleResize();
		// window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
		return () => {
			// window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const linkToSignIn = () => {
		router.push('/auth/sign-in');
	};

	const linkToSignUp = () => {
		router.push('/auth/sign-up');
	};

	const logout = async () => {
		await logoutMutation();
		await signOut(auth);
		localStorage.removeItem('tokens');
		router.push('/auth/sign-in');
	};

	const theme = createTheme({
		cursorType: 'pointer'
	});

	return (
		<>
			<header className={scss.Header}>
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}
				>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.logo}>
								<Image loading="eager" src={logo} alt="logo" />
							</div>
							{!isMobile ? (
								<>
									<nav className={scss.nav}>
										<ul className={scss.ul}>
											{siteLinks.map((item, index) => (
												<li key={index} className={scss.li}>
													<Link
														className={
															pathname === item.href ||
															(item.href !== '/' &&
																pathname.startsWith(item.href))
																? `${scss.link} ${scss.active}`
																: `${scss.link}`
														}
														href={item.href}
													>
														{item.name}
														{(pathname === item.href ||
															(item.href !== '/' &&
																pathname.startsWith(item.href))) && (
															<motion.div
																layoutId="active-pill"
																className={scss.active}
																style={{
																	borderRadius: 12
																}}
																transition={{
																	type: 'spring',
																	duration: 0.6
																}}
															/>
														)}
													</Link>
												</li>
											))}
										</ul>
										<div className={scss.dropDownMenus}>
											<DropDownMenu
												title="Наши курсы"
												links={dropDownMenuCourses}
												isOpen={isOpenDropDownMenuCourses}
												setIsOpen={setIsOpenDropDownMenuCourses}
											/>
											<DropDownMenu
												title="Ресурсы"
												links={dropDownMenuResources}
												isOpen={isOpenDropDownMenuResources}
												setIsOpen={setIsOpenDropDownMenuResources}
											/>
										</div>
									</nav>
									<div className={scss.profile}>
										{userData?.results ? (
											<>
												{isAdminOrMentor && (
													<MantineProvider theme={theme}>
														<Switch
															defaultChecked={isEdit}
															onLabel="ON"
															offLabel="OFF"
															size="md"
															onChange={(event) =>
																setIsEdit(event.currentTarget.checked)
															}
														/>
													</MantineProvider>
												)}
												<ProfileButton
													userData={userData.results}
													isOpen={isOpen}
													setIsOpen={setIsOpen}
												/>
												<ProfileMenu
													userData={userData.results}
													menuLinks={menuLinks}
													logout={logout}
													isOpen={isOpen}
													setIsOpen={setIsOpen}
													pathname={pathname}
												/>
											</>
										) : (
											<>
												<div className={scss.auth_login_buttons}>
													<Button onClick={linkToSignIn} variant="filled">
														Вход
													</Button>
													<Button onClick={linkToSignUp} variant="outline">
														Регистрация
													</Button>
												</div>
											</>
										)}
									</div>
								</>
							) : (
								<>
									<BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
									<BurgerMenu
										userData={userData?.results!}
										menuLinks={menuLinks}
										siteLinks={siteLinks}
										linkToSignUp={linkToSignUp}
										linkToSignIn={linkToSignIn}
										logout={logout}
										isOpen={isOpen}
										setIsOpen={setIsOpen}
										pathname={pathname}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};
export default Header;
