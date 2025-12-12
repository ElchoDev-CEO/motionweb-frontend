'use client';
import React, { FC, ReactNode } from 'react';
import scss from './Buttons.module.scss';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '@/utils/firebase';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLoginMutation } from '@/redux/api/auth';

interface GoogleButtonProps {
	children: ReactNode;
}

const GoogleButton: FC<GoogleButtonProps> = ({ children }) => {
	const router = useRouter();
	const [googleLoginMutation] = useGoogleLoginMutation();

	const login = async () => {
		try {
			const userCredential = await signInWithPopup(auth, googleAuthProvider);
			const idToken = await userCredential.user.getIdToken();
			console.log(idToken);

			const responseGoogleLogin = await googleLoginMutation({ idToken });
			localStorage.setItem(
				'tokens',
				JSON.stringify(responseGoogleLogin.data!.results.tokens)
			);
			router.push('/');
		} catch (e) {
			console.error(`Login error: ${e}`);
		}
	};

	return (
		<button className={`${scss.button} ${scss.GoogleButton}`} onClick={login}>
			<span className={scss.icon}>
				<FcGoogle />
			</span>
			{children}
		</button>
	);
};
export default GoogleButton;
