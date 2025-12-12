'use client';
import { FC, useEffect, useState } from 'react';
import scss from './ZegoControl.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import { createHmac } from 'crypto';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Modal, Progress, TextInput } from '@mantine/core';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { useModalStore } from '@/stores/useModalStore';
import {
	useCreateCallRoomMutation,
	useDeleteCallRoomMutation,
	useGetCallRoomQuery,
	useGetCourseSyncTelegramQuery
} from '@/redux/api/course';
import Loader from '@/ui/loader/Loader';
import { useScreenRecording } from '@/hooks/useScreenRecording';

interface IZegoControl {
	courseId: number;
}

interface ILesson {
	title: string;
}

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;

const generateFormattedCourseId = (courseId: number): string => {
	if (!process.env.NEXT_PUBLIC_ZEGO_ROOM_SECRET) {
		throw new Error('NEXT_PUBLIC_ZEGO_ROOM_SECRET is not defined');
	}
	// Создаем HMAC для courseId
	const hmac = createHmac('sha256', process.env.NEXT_PUBLIC_ZEGO_ROOM_SECRET);
	hmac.update(courseId.toString());
	let hash = hmac.digest('base64'); // Используем base64, чтобы получить больше букв и цифр
	// Убираем символы, которые не являются буквами или цифрами
	hash = hash.replace(/[^a-zA-Z0-9]/g, '');
	// Форматируем строку в группы по 5 символов
	const formattedHash = `${hash.slice(0, 5)}-${hash.slice(5, 10)}-${hash.slice(10, 15)}`;
	return formattedHash;
};

const ZegoControl: FC<IZegoControl> = ({ courseId }) => {
	const [isOpenStartLessonModal, setIsOpenStartLessonModal] = useState(false);
	const [isRoomActive, setIsRoomActive] = useState<boolean>(false);
	const router = useRouter();
	const encryptedCourseId = generateFormattedCourseId(courseId);
	const { startRecording, mediaBlobUrl } = useScreenRecording();
	const { isAdminOrMentor, isManager } = useUserRoleStore();
	const { startLesson, setStartLesson } = useModalStore();
	const { data: courseSyncTelegramQueryData } = useGetCourseSyncTelegramQuery(
		Number(courseId)
	);
	const {
		data: dataCallRoom,
		isLoading: isLoadingGetCallRoom,
		status: statusGetCallRoom
	} = useGetCallRoomQuery(String(courseId), {
		pollingInterval: 3000
	});
	const [createCallRoomMutation] = useCreateCallRoomMutation();
	const [deleteCallRoomMutation, { isLoading: isLoadingDeleteCallRoo }] =
		useDeleteCallRoomMutation();

	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const {
		register: registerStartLesson,
		handleSubmit: handleSubmitStartLesson,
		reset: resetStartLesson,
		formState: { isSubmitting: isSubmittingStartLesson }
	} = useForm<ILesson>();

	const handleStartLesson: SubmitHandler<ILesson> = async (data) => {
		setStartLesson({ title: `Тема урока: <b>«${data.title}»</b> 😊🎉` });
		await handleCreateCallRoom();
		setIsOpenStartLessonModal(false);
		resetStartLesson();
	};

	const handleCreateCallRoom = async () => {
		try {
			const { data } = await createCallRoomMutation({
				courseId,
				roomId: encryptedCourseId
			});
			localStorage.setItem('roomId', String(data?.results.id));
			startRecording();
			router.push(`/room/${encryptedCourseId}`);
		} catch (error) {
			console.error('Failed to create call room:', error);
		}
	};

	const handleDeleteCallRoom = async () => {
		if (!dataCallRoom?.results?.id) return;
		try {
			// await deleteCallRoomMutation(dataCallRoom.results.id);
			const getRoomId = localStorage.getItem('roomId');
			if (!getRoomId) return;
			try {
				await deleteCallRoomMutation(Number(getRoomId));
			} catch (error) {
				console.error('Failed to delete call room:', error);
			}
		} catch (error) {
			console.error('Failed to delete call room:', error);
		}
	};

	const handleUploadVideoTelegramGroup = async () => {
		if (!mediaBlobUrl) {
			alert('Видео ещё не записано.');
			return;
		}

		if (!courseSyncTelegramQueryData?.results?.length) {
			alert('Нет групп для синхронизации с Telegram.');
			return;
		}

		setIsUploading(true);
		setUploadProgress(0);

		const chatIds = courseSyncTelegramQueryData.results.map(
			(item) => item.telegramGroupInfo.chatId
		);

		try {
			const response = await fetch(mediaBlobUrl);
			const blob = await response.blob();

			for (let i = 0; i < chatIds.length; i++) {
				const chatId = chatIds[i];
				const formData = new FormData();
				formData.append('chat_id', chatId);
				formData.append('video', blob, `${startLesson.title || 'video'}.mp4`);
				formData.append('caption', startLesson.title || 'Без названия');
				formData.append('parse_mode', 'HTML');

				try {
					await axios.post(
						`https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`,
						formData,
						{
							onUploadProgress: (progressEvent) => {
								const progress = Math.round(
									((i + progressEvent.loaded / progressEvent.total!) /
										chatIds.length) *
										100
								);
								setUploadProgress(progress);
							}
						}
					);
					console.log(`Видео успешно отправлено в группу с chat_id: ${chatId}`);
				} catch (error) {
					console.error(
						`Ошибка при отправке видео в группу с chat_id: ${chatId}`,
						error
					);
				}
			}

			alert('Видео успешно загружено во все группы!');
		} catch (error) {
			console.error('Ошибка при обработке или загрузке видео:', error);
			alert('Не удалось загрузить видео.');
		} finally {
			setIsUploading(false);
			setUploadProgress(0);
		}
	};

	useEffect(() => {
		if (statusGetCallRoom === 'fulfilled') {
			setIsRoomActive(dataCallRoom?.results.isActive!);
		}
		if (statusGetCallRoom === 'rejected') {
			setIsRoomActive(false);
		}
	}, [isLoadingGetCallRoom, statusGetCallRoom]);

	if (isLoadingGetCallRoom) return <Loader />;

	return (
		<>
			<div className={scss.ZegoControl}>
				{mediaBlobUrl && (
					<div className={scss.upload_telegram}>
						{/* {isUploading && (
							// mt="sm"
							<Progress value={uploadProgress} size="xl" animated />
						)} */}
						{isUploading ? (
							<Progress.Root size="xl" className={scss.progress}>
								<Progress.Section value={uploadProgress}>
									<Progress.Label>{uploadProgress}%</Progress.Label>
								</Progress.Section>
							</Progress.Root>
						) : (
							<Button
								className={scss.button}
								variant="filled"
								size="xs"
								onClick={handleUploadVideoTelegramGroup}
								disabled={isUploading}
							>
								Отправить видеозапись студентам
							</Button>
						)}
					</div>
				)}
				<Button
					disabled={!isRoomActive}
					variant="filled"
					size="xs"
					onClick={() => router.push(`/room/${encryptedCourseId}`)}
				>
					{isRoomActive ? 'Подключиться к онлайн уроку' : 'Урок ещё не начался'}
				</Button>
				{(isAdminOrMentor || isManager) && !isRoomActive && (
					<Button
						variant="filled"
						size="xs"
						onClick={() => setIsOpenStartLessonModal(true)}
					>
						Начать онлайн урок
					</Button>
				)}
				{(isAdminOrMentor || isManager) && isRoomActive && (
					<Button
						variant="outline"
						size="xs"
						loading={isLoadingDeleteCallRoo}
						loaderProps={{ type: 'dots' }}
						onClick={handleDeleteCallRoom}
					>
						Завершить онлайн урок
					</Button>
				)}
			</div>

			{/* Модалка для начала урока */}
			<Modal
				opened={isOpenStartLessonModal}
				onClose={() => setIsOpenStartLessonModal(false)}
				title="Начало урока"
				centered
			>
				<div className={scss.start_lesson}>
					<form onSubmit={handleSubmitStartLesson(handleStartLesson)}>
						<TextInput
							placeholder="Введите название темы урока..."
							{...registerStartLesson('title', { required: true })}
						/>
						<Button
							loading={isSubmittingStartLesson}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							Начать урок
						</Button>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default ZegoControl;
