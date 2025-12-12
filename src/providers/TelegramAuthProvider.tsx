import { FC, ReactNode, useEffect, useState } from 'react';
import scss from './TelegramAuthProvider.module.scss';
import axios from 'axios';
import { Modal } from '@mantine/core';
import { useGetMeQuery } from '@/redux/api/me';
import { useCheckTelegramAuthQuery } from '@/redux/api/telegram';
import TelegramAuthButton from '@/shared/telegram/TelegramAuthButton';
import { FaTelegram } from 'react-icons/fa';

interface ITelegramAuthProviderProps {
	children: ReactNode;
}

const TelegramAuthProvider: FC<ITelegramAuthProviderProps> = ({ children }) => {
	const [isOpenTGAuthModal, setIsOpenTGAuthModal] = useState(false);
	const [isOpenTGActivateModal, setIsOpenTGActivateModal] = useState(false);

	const { data: userData } = useGetMeQuery();
	const {
		data: dataCheckTelegramAuth,
		isLoading: isLoadingCheckTelegramAuth,
		status: statusCheckTelegramAuth
	} = useCheckTelegramAuthQuery(undefined, {
		pollingInterval: 3000,
		skip: !userData?.results
	});

	const removeCookieTelegramAuth = async () => {
		await axios.get('/api/clean-cookies');
	};

	// useEffect(() => {
	// 	if (process.env.NEXT_PUBLIC_TELEGRAM_BOT_ACTIVE === 'yes') {
	// 		if (!dataCheckTelegramAuth) return;
	// 		if (userData?.results) {
	// 			if (dataCheckTelegramAuth?.results === null) {
	// 				setIsOpenTGAuthModal(true);
	// 			}
	// 			if (dataCheckTelegramAuth?.results) {
	// 				if (!dataCheckTelegramAuth?.results.isActivated) {
	// 					setIsOpenTGActivateModal(true);
	// 				}
	// 				if (dataCheckTelegramAuth?.results.isActivated) {
	// 					setIsOpenTGActivateModal(false);
	// 				}
	// 			}
	// 		}
	// 		removeCookieTelegramAuth();
	// 	}
	// }, [dataCheckTelegramAuth, isLoadingCheckTelegramAuth]);

	return (
		<>
			{children}

			<Modal
				opened={isOpenTGAuthModal}
				onClose={() => setIsOpenTGAuthModal(false)}
				withCloseButton={false}
				closeOnClickOutside={false}
				title="Привяжите аккаунт в telegram"
				centered
			>
				<div className={scss.isOpenTGAuthModal}>
					<p className={scss.description}>
						Чтобы использовать все возможности платформы, вам необходимо
						привязать свой аккаунт Telegram 📲. Это нужно для безопасной
						аутентификации 🔐 и получения персонализированных уведомлений 📩.
					</p>
					<TelegramAuthButton />
				</div>
			</Modal>

			<Modal
				opened={isOpenTGActivateModal}
				onClose={() => setIsOpenTGActivateModal(false)}
				withCloseButton={false}
				closeOnClickOutside={false}
				title="Активируйте аккаунт в telegram"
				centered
			>
				<div className={scss.isOpenTGActivateModal}>
					<p className={scss.sup_description}>
						Для активации вашего аккаунта в Telegram откройте нашего бота 🤖 и
						нажмите на кнопку &quot;Start&quot;.
					</p>
					<a
						className={scss.button}
						href="https://t.me/motion_web_manager_bot"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaTelegram /> Открыть бота для активации
					</a>
					<p className={scss.sub_description}>
						После активации вы сможете использовать все функции нашей LMS
						платформы. 🎓
					</p>
				</div>
			</Modal>
		</>
	);
};

export default TelegramAuthProvider;
