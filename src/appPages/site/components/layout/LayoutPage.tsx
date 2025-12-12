'use client';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import scss from './LayoutPage.module.scss';
import { usePathname } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import { LoadingOverlay } from '@mantine/core';
import { useGetMeQuery } from '@/redux/api/me';
import { useHeaderStore } from '@/stores/useHeaderStore';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { useEditControlStore } from '@/stores/useEditControlStore';
import Header from '@/appPages/site/components/layout/header/Header';
import Footer from '@/appPages/site/components/layout/footer/Footer';
import TelegramContactButton from '@/ui/contactButtons/TelegramContactButton';
import { FeedBack } from '@/ui/feedback/FeedBack';
import { ElchoAI } from './elcho-ai/ElchoAI';

interface LayoutPageType {
	children: ReactNode;
}

const LayoutPage: FC<LayoutPageType> = ({ children }) => {
	const pathname = usePathname();
	const [courseId, setCourseId] = useState<number | null>(null);
	const [lessonId, setLessonId] = useState<number | null>(null);
	const [isPreLoader, setIsPreloader] = useState(true);
	const [procolIslama, setProcolIslama] = useState('');
	const [hasMounted, setHasMounted] = useState(false);
	const { data: session, status } = useGetMeQuery();
	const { setIsOpen } = useHeaderStore();
	const { isEdit } = useEditControlStore();
	const { setIsAdminOrMentorRole, setIsManagerRole } = useUserRoleStore();

	useEffect(() => {
		if (session?.results) {
			setIsAdminOrMentorRole(session.results.role);
			setIsManagerRole(session.results.role);
			switch (session?.results.email) {
				case 'islamdev404@gmail.com':
				case 'empty email address':
				case 'aubakirovweb09@gmail.com':
					setProcolIslama('🦄 ТЫ ТЕРЕРЬ РОДРИЧ, Дррааа...');
					break;
				default:
					setProcolIslama('🦄 Теперь ты Сэнсэй!');
					break;
			}
		}
	}, [session]);

	useEffect(() => {
		const handleEditChange = async () => {
			if (hasMounted) {
				setIsPreloader(true);
				await new Promise((resolve) => setTimeout(resolve, 1500));
				setIsPreloader(false);
				if (isEdit) {
					toast(procolIslama, {
						position: 'top-right',
						autoClose: 1500,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
						transition: Bounce
					});
				} else {
					toast('Ты больше не сэнсей 😭', {
						position: 'top-right',
						autoClose: 1500,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
						transition: Bounce
					});
				}
			} else {
				setHasMounted(true);
			}
		};
		handleEditChange();
	}, [isEdit]);

	useEffect(() => {
		const lastRoute = localStorage.getItem('lastRoute');
		if (lastRoute) {
			const routeSegment = lastRoute.split('/');
			setCourseId(Number(routeSegment[2]));
			setLessonId(Number(routeSegment[4]));
		} else {
			console.warn('lastRoute is not set in localStorage');
			setCourseId(null);
		}
	}, [pathname]);

	useEffect(() => {
		if (status === 'fulfilled' || status === 'rejected') {
			setTimeout(() => {
				setIsPreloader(false);
			}, 700);
		}
	}, [status]);

	useEffect(() => {
		// Восстановить позицию скролла
		const savedScrollPosition = sessionStorage.getItem(
			`scrollPosition_${pathname}`
		);
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}

		// Сохранить позицию скролла при изменении
		const handleScroll = () => {
			sessionStorage.setItem(
				`scrollPosition_${pathname}`,
				String(window.scrollY)
			);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [pathname]);

	const shouldShowFooter =
		!pathname.startsWith(`/courses/${courseId}/`) &&
		pathname !== '/contracts' &&
		pathname !== '/users';

	return (
		<>
			<div
				className={scss.LayoutPage}
				onClick={() => {
					setIsOpen(false);
				}}
			>
				<Header />
				<main>{children}</main>
				{shouldShowFooter ? <Footer /> : <footer></footer>}
			</div>
			{/* <TelegramContactButton /> */}
			<ElchoAI
				aiModel="motion_web"
				telegramChatId="-1002546757793"
				telegramBotToken={process.env.NEXT_PUBLIC_TELEGRAM_TOKEN!}
			/>
			<FeedBack />
			<LoadingOverlay
				style={{ position: 'fixed' }}
				visible={isPreLoader}
				transitionProps={{
					transition: 'fade-up',
					duration: 150
					// timingFunction: 'ease-in-out'
				}}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 7 }}
				loaderProps={{ type: 'dots', size: 'xl' }}
			/>
		</>
	);
};

export default LayoutPage;
