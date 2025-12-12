'use client';
import { FC } from 'react';
import scss from './TelegramContactButton.module.scss';
import { FaTelegram } from 'react-icons/fa';

const TelegramContactButton: FC = () => {
	return (
		<section className={scss.TelegramContactButton}>
			<div className={scss.container}>
				<div className={scss.content}>
					<a
						href="https://t.me/assistent112"
						target="_blank"
						title="Написать в Telegram"
						rel="noopener noreferrer"
					>
						<div className={scss.telegramButton}>
							<FaTelegram className={scss.telegramIcon} />
						</div>
					</a>
				</div>
			</div>
		</section>
	);
};

export default TelegramContactButton;
