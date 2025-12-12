'use client';
import React, { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
const VideoRecProvider = dynamic(
	() => import('@/providers/ScreenRecordingProvider'),
	{
		ssr: false
	}
);
import MantineProvider from '@/providers/MantineProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { SessionProvider } from '@/providers/SessionProvider';
import TelegramAuthProvider from '@/providers/TelegramAuthProvider';

interface LayoutRootType {
	children: ReactNode;
}

const LayoutRoot: FC<LayoutRootType> = ({ children }) => {
	return (
		<>
			<NextTopLoader showSpinner={false} color="#eb3023" height={3} />
			<ToastContainer />
			<Toaster />
			<VideoRecProvider>
				<MantineProvider>
					<ReduxProvider>
						<SessionProvider>
							<TelegramAuthProvider>{children}</TelegramAuthProvider>
						</SessionProvider>
					</ReduxProvider>
				</MantineProvider>
			</VideoRecProvider>
		</>
	);
};
export default LayoutRoot;
