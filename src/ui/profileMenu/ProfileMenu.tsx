import React, { FC } from 'react';
import scss from './ProfileMenu.module.scss';
import Link from 'next/link';
import { IconLogout } from '@tabler/icons-react';
import MuiAvatar from '../muiAvatar/MuiAvatar';

interface LinksType {
	name: string;
	href: string;
}

interface ProfileMenuProps {
	userData: User;
	menuLinks: LinksType[];
	isOpen: boolean;
	logout: () => void;
	setIsOpen: (isOpen: boolean) => void;
	pathname: string;
}

const ProfileMenu: FC<ProfileMenuProps> = ({
	userData,
	menuLinks,
	logout,
	isOpen,
	setIsOpen,
	pathname
}) => {
	return (
		<>
			<div
				className={
					isOpen ? `${scss.ProfileMenu} ${scss.active}` : `${scss.ProfileMenu}`
				}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={scss.content}>
					<div className={scss.user_profile}>
						<MuiAvatar src={userData.photo} alt={userData.firstName} />
						<div className={scss.user_data}>
							<p className={scss.user_name}>
								{userData.firstName} {userData.lastName}
							</p>
							<p className={scss.user_email}>{userData.email}</p>
						</div>
					</div>
					<nav className={scss.nav}>
						<ul>
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
						</ul>
					</nav>
					<div className={scss.auth_logout_buttons}>
						<button className={scss.logout_button} onClick={logout}>
							<IconLogout stroke={2} /> Log Out
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default ProfileMenu;
