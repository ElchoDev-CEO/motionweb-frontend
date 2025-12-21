import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import './globals.scss';
import '../styles/main.scss';
import LayoutRoot from '@/app/layout.c';

const euclidCircular = localFont({
	src: [
		{
			path: './fonts/EuclidCircularA-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/EuclidCircularA-Bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: './fonts/EuclidCircularA-Light.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: './fonts/EuclidCircularA-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: './fonts/EuclidCircularA-SemiBold.woff2',
			weight: '600',
			style: 'normal'
		}
	],
	variable: '--font-euclid',
	display: 'swap',
	adjustFontFallback: 'Arial'
});

declare global {
	interface Window {
		TelegramLoginWidget?: {
			init: () => void;
		};
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}

export const metadata: Metadata = {
	title:
		'MotionWeb LMS Платформа | Доступ к качественным образовательным материалам',
	description:
		'MotionWeb — это передовая образовательная платформа, предлагающая высококачественные учебные материалы, управление курсами и интерактивные инструменты для повышения вовлеченности студентов и их успеха.',
	robots: 'index, follow',
	openGraph: {
		title: 'MotionWeb LMS Платформа',
		description:
			'MotionWeb — это современная LMS платформа, предоставляющая студентам первоклассные образовательные материалы и инструменты. Оптимизируйте обучение с помощью наших интерактивных функций и адаптивной доставки контента.',
		url: 'https://motion.kg',
		siteName: 'MotionWeb LMS Платформа',
		images: [
			{
				url: '/cover.png',
				width: 1200,
				height: 630,
				alt: 'MotionWeb LMS Платформа'
			}
		],
		type: 'website'
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html data-theme="light" lang="en">
			<body className={`${euclidCircular.variable}`}>
				<LayoutRoot>{children}</LayoutRoot>
			</body>
		</html>
	);
}
