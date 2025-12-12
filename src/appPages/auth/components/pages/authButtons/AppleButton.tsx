'use client';
import React, { FC, ReactNode } from 'react';
import scss from './Buttons.module.scss';
import { FaApple } from 'react-icons/fa';

interface AppleButtonProps {
	children: ReactNode;
}

const AppleButton: FC<AppleButtonProps> = ({ children }) => {
	const login = () => {
		// window.open(
		// 	`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/apple`,
		// 	"_self"
		// );
		console.error('Error login with Apple');
	};

	return (
		<button className={`${scss.button} ${scss.AppleButton}`} onClick={login}>
			<span className={scss.icon}>
				<FaApple />
			</span>
			{children}
		</button>
	);
};
export default AppleButton;
