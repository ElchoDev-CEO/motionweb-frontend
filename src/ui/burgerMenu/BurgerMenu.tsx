'use client';
import { FC } from 'react';
import scss from './BurgerMenu.module.scss';
import Link from 'next/link';
import { IconLogout } from '@tabler/icons-react';
import MuiAvatar from '../muiAvatar/MuiAvatar';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { Switch } from '@mantine/core';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import { dropDownMenuCourses, dropDownMenuResources } from '@/constants/links';
import { useHeaderStore } from '@/stores/useHeaderStore';

interface LinksType {
	name: string;
	href: string;
}

interface BurgerMenuProps {
	userData: User;
	menuLinks: LinksType[];
	siteLinks: LinksType[];
	linkToSignIn: () => void;
	linkToSignUp: () => void;
	logout: () => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	pathname: string;
}

const BurgerMenu: FC<BurgerMenuProps> = ({
	userData,
	menuLinks,
	siteLinks,
	linkToSignIn,
	linkToSignUp,
	logout,
	isOpen,
	setIsOpen,
	pathname
}) => {
	const { isEdit, setIsEdit } = useEditControlStore();
	const { isAdminOrMentor } = useUserRoleStore();
	const {
		isOpenDropDownMenuCourses,
		setIsOpenDropDownMenuCourses,
		isOpenDropDownMenuResources,
		setIsOpenDropDownMenuResources
	} = useHeaderStore();
	return (
		<>
			<div
				className={
					isOpen ? `${scss.BurgerMenu} ${scss.active}` : `${scss.BurgerMenu}`
				}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={scss.content}>
					{userData ? (
						<div className={scss.user_profile}>
							<MuiAvatar src={userData.photo} alt={userData.firstName} />
							<div className={scss.user_data}>
								<p className={scss.user_name}>
									{userData.firstName} {userData.lastName}
								</p>
								<p className={scss.user_email}>{userData.email}</p>
							</div>
						</div>
					) : (
						<>
							<div className={scss.auth_login_buttons}>
								<button className={scss.sign_in_button} onClick={linkToSignIn}>
									Вход
								</button>
								<button className={scss.sign_up_button} onClick={linkToSignUp}>
									Регистрация
								</button>
							</div>
						</>
					)}
					{isAdminOrMentor && (
						<Switch
							defaultChecked={isEdit}
							onLabel="ON"
							offLabel="OFF"
							label="Стать Сэнсэй:)"
							size="md"
							onChange={(event) => setIsEdit(event.currentTarget.checked)}
						/>
					)}
					<nav className={scss.nav}>
						<ul>
							{userData && (
								<>
									{menuLinks.map((item, index) => (
										<li key={index}>
											<Link
												className={
													pathname === item.href
														? `${scss.link} ${scss.active}`
														: `${scss.link}`
												}
												href={item.href}
												onClick={() => setIsOpen(false)}
											>
												{item.name}
											</Link>
										</li>
									))}
								</>
							)}
							{siteLinks.map((item, index) => (
								<li key={index}>
									<Link
										className={
											pathname === item.href ||
											(item.href !== '/' && pathname.startsWith(item.href))
												? `${scss.link} ${scss.active}`
												: `${scss.link}`
										}
										href={item.href}
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className={scss.more_nav}>
						<span className={scss.line}></span>

						<DropDownMenu
							title="Наши курсы"
							links={dropDownMenuCourses}
							isOpen={isOpenDropDownMenuCourses}
							setIsOpen={setIsOpenDropDownMenuCourses}
						/>
						<span className={scss.line}></span>
						<DropDownMenu
							title="Ресурсы"
							links={dropDownMenuResources}
							isOpen={isOpenDropDownMenuResources}
							setIsOpen={setIsOpenDropDownMenuResources}
						/>
						<span className={scss.line}></span>
					</div>
					{userData && (
						<div className={scss.auth_logout_buttons}>
							<button className={scss.logout_button} onClick={logout}>
								<IconLogout stroke={2} /> Log Out
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default BurgerMenu;
