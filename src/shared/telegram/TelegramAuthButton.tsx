'use client';
import React, { useEffect } from 'react';

const TelegramAuthButton = () => {
	useEffect(() => {
		if (!window.TelegramLoginWidget) {
			window.TelegramLoginWidget = {
				init() {
					const script = document.createElement('script');
					script.src = 'https://telegram.org/js/telegram-widget.js?5';
					script.async = true;
					script.setAttribute('data-telegram-login', 'motion_web_manager_bot'); // Ваш бот
					script.setAttribute('data-size', 'large');
					script.setAttribute('data-radius', '10'); // Скругление кнопки
					script.setAttribute(
						'data-auth-url',
						`${process.env.NEXT_PUBLIC_API_URL}/api/v1/telegram/auth`
					); // URL для обработки данных
					document.getElementById('telegram-login-button')?.appendChild(script);
				}
			};
		}

		window.TelegramLoginWidget.init();
	}, []);

	return <div id="telegram-login-button"></div>;
};

export default TelegramAuthButton;
