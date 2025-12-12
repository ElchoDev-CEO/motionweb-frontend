'use client';
import React, { FC, ReactNode } from 'react';
import scss from './Buttons.module.scss';
import { FaGithub } from 'react-icons/fa';

interface GitHubButtonProps {
	children: ReactNode;
}

const GitHubButton: FC<GitHubButtonProps> = ({ children }) => {
	const login = () => {
		// window.open(
		// 	`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/github`,
		// 	'_self'
		// );
		console.error('Error login with GitHub');
	};

	return (
		<button className={`${scss.button} ${scss.GitHubButton}`} onClick={login}>
			<span className={scss.icon}>
				<FaGithub />
			</span>
			{children}
		</button>
	);
};
export default GitHubButton;
