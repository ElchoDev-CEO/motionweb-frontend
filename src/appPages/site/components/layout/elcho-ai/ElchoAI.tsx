'use client';
import { useState, useRef, useEffect, FC } from 'react';
import styles from './ElchoAI.module.scss';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { BiSolidSend } from 'react-icons/bi';
import { IoClose, IoLogOutOutline } from 'react-icons/io5';
import { Button, Input, Textarea } from '@mantine/core';
import { RiRobot2Fill } from 'react-icons/ri';
import { useSendMessageAIMutation } from '@/redux/api/ai';

// Type Definitions
interface IElchoAIProps {
	aiModel: 'unicorn' | 'unibook' | 'unimed' | 'elcho_dev' | 'motion_web';
	telegramBotToken: string;
	telegramChatId: string;
}

interface IUser {
	username: string;
	phone: string;
	email?: string;
	message?: string;
}

interface IMessage {
	role: 'user' | 'assistant';
	content: string;
}

export const ElchoAI: FC<IElchoAIProps> = ({
	aiModel,
	telegramBotToken,
	telegramChatId
}) => {
	// Refs
	const chatRef = useRef<HTMLDivElement>(null);
	const messagesScrollRef = useRef<HTMLDivElement>(null);

	// State Management
	const [userInfo, setUserInfo] = useState<IUser | null>(null);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [inputMessage, setInputMessage] = useState('');

	const [sendMessageAIMutation] = useSendMessageAIMutation();

	// Form Handling
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IUser>();

	// Telegram
	const sendTelegramMessage = async (text: string) => {
		try {
			await axios.post(
				`https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
				{
					chat_id: telegramChatId,
					parse_mode: 'HTML',
					text
				}
			);
		} catch (e) {
			console.error(`❌ Ошибка при отправке сообщения в Telegram: ${e}`);
		}
	};

	// ? 🔹 Авторизация клиента
	const authTelegramClient = async (data: IUser) => {
		const message = `
🚀 <b>Новая заявка на разработку сайта!</b> 🚀

👤 <b>Имя:</b> <code>${data.username}</code>
📞 <b>Телефон:</b> <code>${data.phone}</code>
${data.email ? `📧 <b>Email:</b> <code>${data.email}</code>` : ''}

🔥 Свяжитесь с клиентом как можно скорее!
`;
		await sendTelegramMessage(message);
	};

	// ? 🔹 Отправка сообщения от клиента
	const sendMessageTelegramClient = async (message: string) => {
		if (!userInfo) {
			console.error('❌ Ошибка: userInfo не определен');
			return;
		}
		const messageText = `
👤 <b>Клиент:</b> <code>${userInfo.username}</code> | <code>${userInfo.phone}</code>

${message}
`;
		await sendTelegramMessage(messageText);
	};

	// ? 🔹 Отправка сообщения от ассистента
	const sendMessageTelegramAssistant = async (message: string) => {
		const assistantMessage = `
🤖 <b>Ассистент:</b> <code>ElchoAi</code>

${message}
`;
		await sendTelegramMessage(assistantMessage);
	};

	// Scroll Utilities
	const scrollToBottom = () => {
		messagesScrollRef.current?.scrollTo({
			top: messagesScrollRef.current.scrollHeight,
			behavior: 'smooth'
		});
	};

	const scrollToTop = () => {
		messagesScrollRef.current?.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	// Load Saved Data
	useEffect(() => {
		const loadSavedData = () => {
			try {
				const storedMessages = localStorage.getItem(
					'elcho_ai_conversation_history'
				);
				const storedUserInfo = localStorage.getItem('elcho_ai_user_info');
				if (storedMessages) setMessages(JSON.parse(storedMessages));
				if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
			} catch (error) {
				console.error('Error loading saved data:', error);
			}
		};
		loadSavedData();
	}, []);

	// Save Messages and User Info
	useEffect(() => {
		if (messages.length > 0) {
			localStorage.setItem(
				'elcho_ai_conversation_history',
				JSON.stringify(messages)
			);
		}
	}, [messages]);

	useEffect(() => {
		if (userInfo) {
			localStorage.setItem('elcho_ai_user_info', JSON.stringify(userInfo));
		}
	}, [userInfo]);

	// Scroll Management
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(scrollToBottom, 100);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	// Event Listeners
	// ? Escape key press handler
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				setIsOpen(false);
				scrollToTop();
			}
		};
		window.addEventListener('keydown', handleEscKey);
		return () => {
			window.removeEventListener('keydown', handleEscKey);
		};
	}, [isOpen]);

	// ? Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				chatRef.current &&
				!chatRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest('.elcho-ai-toggle-btn')
			) {
				setIsOpen(false);
				scrollToTop();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	// Body Scroll Management
	useEffect(() => {
		document.body.style.overflowY = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflowY = '';
		};
	}, [isOpen]);

	// Message Sending
	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		setIsSending(true);
		try {
			const userMessage: IMessage = { role: 'user', content: inputMessage };
			const updatedMessages = [...messages, userMessage];

			setMessages(updatedMessages);
			sendMessageTelegramClient(inputMessage);
			setInputMessage('');

			// const response = await axios.post(
			// 	`https://ai.elcho.dev/api/v1/message/${aiModel}/send`,
			// 	{ conversationHistory: updatedMessages }
			// );

			const response = await sendMessageAIMutation({
				conversationHistory: updatedMessages
			});

			if (response.data?.success) {
				const assistantMessage = response.data.results.content
					.filter((block: any) => block.type === 'text')
					.map((block: any) => block.text)
					.join('');

				setMessages((prev) => [
					...prev,
					{ role: 'assistant', content: assistantMessage }
				]);
				sendMessageTelegramAssistant(assistantMessage);
			} else {
				const limitReachedMessage =
					'Вы достигли лимита сообщений. Для получения дополнительной информации и решения проблемы, пожалуйста, свяжитесь с нами по телефону: 0999 99 88 66.';

				setMessages((prev) => [
					...prev,
					{ role: 'assistant', content: limitReachedMessage }
				]);
			}
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error);

			const errorMessage =
				'Вы достигли лимита сообщений. Для получения дополнительной информации и решения проблемы, пожалуйста, свяжитесь с нами по телефону: 0999 99 88 66.';

			setMessages((prev) => [
				...prev,
				{ role: 'assistant', content: errorMessage }
			]);
		} finally {
			setIsSending(false);
		}
	};

	// User Form Submit
	const onUserFormSubmit: SubmitHandler<IUser> = (data) => {
		const userIntroduction = `Меня зовут ${
			data.username
		}. Мой номер телефона: ${data.phone}${
			data.email ? `, моя почта: ${data.email}` : ''
		}.`;

		setUserInfo(data);
		authTelegramClient(data);
		setMessages([
			{ role: 'user', content: userIntroduction },
			{
				role: 'assistant',
				content: `Привет, ${data.username}! Чем я могу помочь вам сегодня?`
			}
		]);
		reset();
	};

	// Logout Handler
	const handleLogout = () => {
		setUserInfo(null);
		setMessages([]);
		localStorage.removeItem('elcho_ai_user_info');
		localStorage.removeItem('elcho_ai_conversation_history');
	};

	// Render Helpers
	const renderMessageContent = (content: string) => {
		return content.indexOf(' ') === -1
			? content.split('').reduce((acc, char, i) => {
					return i > 0 && i % 25 === 0 ? acc + '<br>' + char : acc + char;
				}, '')
			: content;
	};

	return (
		<div className={styles.ElchoAI}>
			{/* Chatbot Toggle Button */}
			<div className={styles.toggleBtn}>
				<button
					className={`${styles.pulseButton} elcho-ai-toggle-btn`}
					onClick={() => setIsOpen(true)}
				>
					<RiRobot2Fill size={50} />
				</button>
			</div>

			{/* Chat Modal */}
			<div
				className={`${styles.modal} ${isOpen ? styles.open : styles.closed}`}
			>
				{/* Chat Container */}
				<div
					className={`${styles.chatContainer} ${
						isOpen ? styles.open : styles.closed
					}`}
				>
					<div ref={chatRef} className={styles.chatInner}>
						<div className={styles.chatContent}>
							{/* Chat Header */}
							<div className={styles.chatHeader}>
								<div className={styles.headerTitle}>
									<button
										className={styles.closeButton}
										onClick={() => {
											scrollToTop();
											setIsOpen(false);
										}}
									>
										<IoClose size={25} />
									</button>
									<h1 className={styles.title}>ИИ чат помощник</h1>
								</div>
								{userInfo && (
									<button
										className={styles.logoutButton}
										onClick={handleLogout}
										title="Выйти из аккаунта"
									>
										<IoLogOutOutline size={20} />
										<span>Выйти</span>
									</button>
								)}
							</div>

							{/* Chat Content */}
							{userInfo ? (
								<>
									{/* Messages Container */}
									<div
										ref={messagesScrollRef}
										className={styles.messagesContainer}
									>
										{messages.slice(1).map((item, index) => (
											<div
												key={index}
												className={`${styles.messageItem} ${
													item.role === 'user' ? styles.user : styles.assistant
												}`}
											>
												<span className={styles.messageBubble}>
													{item.content}
												</span>
											</div>
										))}
										{isSending && (
											<div className={styles.loadingWrapper}>
												<div className={styles.loadingDots}>
													<div className={styles.loadingDot}></div>
													<div className={styles.loadingDot}></div>
													<div className={styles.loadingDot}></div>
												</div>
											</div>
										)}
									</div>

									{/* Message Input */}
									<div className={styles.inputContainer}>
										<Textarea
											className={styles.Textarea}
											placeholder="Введите ваше сообщение..."
											size="md"
											radius={16}
											autosize
											maxRows={5}
											disabled={isSending}
											value={inputMessage}
											onChange={(e) => setInputMessage(e.target.value)}
											onKeyDown={(
												e: React.KeyboardEvent<HTMLTextAreaElement>
											) => {
												const isMobile = window.innerWidth < 700;
												if (
													e.key === 'Enter' &&
													!e.shiftKey &&
													!e.altKey &&
													!isMobile
												) {
													e.preventDefault();
													handleSendMessage();
												}
											}}
										/>
										<button
											className={styles.sendMessageButton}
											disabled={isSending}
											onClick={handleSendMessage}
										>
											<BiSolidSend size={20} />
										</button>
									</div>
								</>
							) : (
								// User Registration Form
								<div className={styles.formContainer}>
									<h2 className={styles.title}>
										Заполните форму перед началом разговора
									</h2>
									<form onSubmit={handleSubmit(onUserFormSubmit)}>
										<div className={styles.formGroup}>
											<label className={errors.username ? styles.error : ''}>
												Имя
												<span
													className={`${styles.errorText} ${
														!errors.username ? styles.hidden : styles.visible
													}`}
												>
													обязательно
												</span>
											</label>
											<Input
												placeholder="Ваше имя..."
												size="md"
												radius={16}
												{...register('username', { required: true })}
											/>
										</div>
										<div className={styles.formGroup}>
											<label className={errors.phone ? styles.error : ''}>
												Номер телефона
												<span
													className={`${styles.errorText} ${
														!errors.phone ? styles.hidden : styles.visible
													}`}
												>
													обязательно
												</span>
											</label>
											<Input
												placeholder="Ваш номер телефона..."
												size="md"
												radius={16}
												{...register('phone', {
													required: 'Телефон обязателен',
													pattern: {
														value: /^\+?[0-9]{10,15}$/,
														message: 'Некорректный формат телефона'
													}
												})}
											/>
										</div>
										<div className={styles.formGroup}>
											<label className={errors.email ? styles.error : ''}>
												Email почта (необязательно)
												<span
													className={`${styles.errorText} ${
														!errors.email ? styles.hidden : styles.visible
													}`}
												>
													"Некорректный формат"
												</span>
											</label>
											<Input
												placeholder="Ваш email..."
												size="md"
												radius={16}
												{...register('email', {
													required: false,
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: 'Некорректный формат email'
													}
												})}
											/>
										</div>
										<Button
											type="submit"
											color="red"
											size="md"
											radius={16}
											className={styles.send_button}
										>
											Начать чат
										</Button>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
