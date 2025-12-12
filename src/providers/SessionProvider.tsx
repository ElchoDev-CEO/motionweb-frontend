'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname } from 'next/navigation';
import { useGetMeQuery } from '@/redux/api/me';
import { useUserRoleStore } from '@/stores/useUserRoleStore';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const SessionProvider: FC<ProtectedRouteProps> = ({ children }) => {
	const [shouldCheckRedirect, setShouldCheckRedirect] = useState(false);
	const { status } = useGetMeQuery();
	const pathname = usePathname();
	const router = useRouter();
	const { isAdminOrMentor, isManager } = useUserRoleStore();

	const publicRoutes = ['/auth/sign-in', '/auth/sign-up'];
	const protectedRoutes = [
		/^\/courses/,
		/^\/groups/,
		/^\/users/,
		/^\/contracts/,
		/^\/profile/,
		/^\/motion-ai/
	];

	useEffect(() => {
		if (status !== 'pending') {
			const timer = setTimeout(() => {
				setShouldCheckRedirect(true);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [status]);

	useEffect(() => {
		if (shouldCheckRedirect && status !== 'pending') {
			// Проверяем публичные роуты
			if (publicRoutes.includes(pathname)) {
				if (status === 'fulfilled') {
					router.push('/');
				}
			}

			// Проверяем защищённые роуты
			if (protectedRoutes.some((route) => route.test(pathname))) {
				if (status === 'rejected') {
					router.push('/auth/sign-in');
				}
			}
			setShouldCheckRedirect(false);
		}
	}, [status, pathname, router, isAdminOrMentor, isManager]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			// Проверяем доступ к /hw
			if (pathname.endsWith('/hw')) {
				if (!isAdminOrMentor) {
					router.push('/');
				}
			}
			// Проверяем доступ к /contracts
			if (pathname.startsWith('/contracts')) {
				if (!isAdminOrMentor && !isManager) {
					router.push('/');
				}
			}
		}, 5000);
		return () => clearTimeout(timeout);
	}, [pathname, isAdminOrMentor, isManager, router]);

	return children;
};
