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
import {
	dropDownMenuCourses,
	dropDownMenuResources,
	languages
} from '@/constants/links';
import { useHeaderStore } from '@/stores/useHeaderStore';
import LangSwitcher from '../lang-switcher/LangSwitcher';
import { MdOutlineTranslate } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

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
	setShowLangModal: (showLangModal: boolean) => void;
	showLangModal: boolean;
	handleChangeLang: (value: string) => void;
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
	pathname,
	setShowLangModal,
	showLangModal,
	handleChangeLang
}) => {
	const { isEdit, setIsEdit } = useEditControlStore();
	const { isAdminOrMentor } = useUserRoleStore();
	const {
		isOpenDropDownMenuCourses,
		setIsOpenDropDownMenuCourses,
		isOpenDropDownMenuResources,
		setIsOpenDropDownMenuResources
	} = useHeaderStore();
	const { i18n, t } = useTranslation('translated');
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
					<div className="relative flex justify-center">
						<div className="">
							<MdOutlineTranslate
								fontSize={18}
								onClick={() => setShowLangModal(!showLangModal)}
								className={showLangModal ? 'text-[#f64b6a]' : ''}
							/>
						</div>
						<LangSwitcher
							isOpen={showLangModal}
							onClose={() => setShowLangModal(false)}
						>
							<ul
								className="absolute top-5 right-20 text-sm min-w-38 bg-white rounded-lg border border-[#e5ebef] flex flex-col"
								style={{
									padding: '10px'
								}}
							>
								<li
									className="font-bold text-center"
									style={{ marginBottom: '5px' }}
								>
									{t('header.selectLang')}
								</li>
								{languages.map((item) => (
									<li
										onClick={() => handleChangeLang(item.value)}
										key={item.value}
										className={
											i18n.language === item.value
												? 'bg-[#F0F0E6]'
												: 'hover:bg-[#f7f7f7]'
										}
										style={{
											padding: '10px',
											borderRadius: '5px'
										}}
									>
										<span
											className={
												i18n.language === item.value
													? 'bg-[#f0f0f0] bg-gradient-to-r from-[#ff9898] via-[#f64b6a] to-[#bc1f5e] bg-clip-text text-transparent'
													: ''
											}
										>
											{item.name}
										</span>
									</li>
								))}
							</ul>
						</LangSwitcher>
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
