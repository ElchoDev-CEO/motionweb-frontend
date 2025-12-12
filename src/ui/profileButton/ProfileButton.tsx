import React, { FC } from 'react';
import scss from './ProfileButton.module.scss';
import { IconChevronUp } from '@tabler/icons-react';
import MuiAvatar from '../muiAvatar/MuiAvatar';

interface ProfileButtonProps {
	userData: User;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const ProfileButton: FC<ProfileButtonProps> = ({
	userData,
	isOpen,
	setIsOpen
}) => {
	return (
		<>
			<button
				className={scss.ProfileButton}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			>
				<MuiAvatar src={userData.photo} alt={userData.firstName} />
				<p className={scss.name}>{userData.username}</p>
				<IconChevronUp
					className={isOpen ? `${scss.arrow} ${scss.active}` : `${scss.arrow}`}
					stroke={2.5}
				/>
			</button>
		</>
	);
};
export default ProfileButton;
