'use client';
import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import scss from './Profile.module.scss';
import imageCompression from 'browser-image-compression';
import {
	IconCamera,
	IconMail,
	IconMobiledataOff,
	IconPhone,
	IconPhoto
} from '@tabler/icons-react';
import { FaTelegram } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { Button, Modal, Skeleton, TextInput } from '@mantine/core';
import { useGetMeQuery, useUpdateMeMutation } from '@/redux/api/me';
import { useUploadFileMutation } from '@/redux/api/upload';
import {
	useCheckTelegramAuthQuery,
	useDeleteTelegramAuthMutation
} from '@/redux/api/telegram';

const Profile: FC = () => {
	const { data: dataGetMe, isLoading: isLoadingGetMe } = useGetMeQuery();
	const [uploadFileMutation] = useUploadFileMutation();
	const [updateMeMutation] = useUpdateMeMutation();
	const {
		data: dataCheckTelegramAuth,
		isLoading: isLoadingCheckTelegramAuth,
		status: statusCheckTelegramAuth
	} = useCheckTelegramAuthQuery();
	const [deleteTelegramAuthMutation] = useDeleteTelegramAuthMutation();

	const [isOpenTelegramModal, setIsOpenTelegramModal] =
		useState<boolean>(false);
	const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
	const [isLoadingBackground, setIsLoadingBackground] =
		useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const [selectedPhoto, setSelectedPhoto] = useState<string>('');
	const [selectedBackgroundImage, setSelectedBackgroundImage] =
		useState<string>('');
	const [tempFirstName, setTempFirstName] = useState<string>('');
	const [tempLastName, setTempLastName] = useState<string>('');
	const [tempEmail, setTempEmail] = useState<string>('');
	const [tempPhone, setTempPhone] = useState<string>('');

	const avatarInputRef = useRef<HTMLInputElement>(null);
	const backgroundInputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const [hasChanges, setHasChanges] = useState(false);

	const handleUpdate = useCallback(
		async (firstName: string, lastName: string) => {
			setIsUpdating(true);
			await updateMeMutation({ firstName, lastName });
			setIsUpdating(false);
		},
		[updateMeMutation]
	);

	const handleDisconnectTelegramAuth = async () => {
		await deleteTelegramAuthMutation();
	};

	useEffect(() => {
		if (!dataGetMe?.results) return;
		const { firstName, lastName, photo, backgroundImage, email, phone } =
			dataGetMe?.results!;
		setSelectedPhoto(photo);
		setSelectedBackgroundImage(backgroundImage);
		setTempFirstName(firstName);
		setTempLastName(lastName);
		setTempEmail(email);
		setTempPhone(phone || '');
	}, [dataGetMe, isLoadingGetMe]);

	useEffect(() => {
		if (!hasChanges) return;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			handleUpdate(tempFirstName, tempLastName);
			setHasChanges(false);
		}, 700);
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [tempFirstName, tempLastName, hasChanges, handleUpdate]);

	const handleEditAvatarClick = () => {
		if (avatarInputRef.current) {
			avatarInputRef.current.click();
		}
	};

	const handleEditBackgroundClick = () => {
		if (backgroundInputRef.current) {
			backgroundInputRef.current.click();
		}
	};

	const handleAvatarChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const imageFile = event.target.files?.[0];
		if (!imageFile) return;
		const options = {
			maxSizeMB: 1, // Максимальный размер в мегабайтах
			maxWidthOrHeight: 500, // Максимальная ширина или высота
			useWebWorker: true // Использовать Web Worker для улучшения производительности
		};
		setIsLoadingAvatar(true);
		let fileToUpload = imageFile;
		if (imageFile.type !== 'image/gif') {
			fileToUpload = await imageCompression(imageFile, options);
		}
		const formData = new FormData();
		formData.append('file', fileToUpload);
		try {
			const { data } = await uploadFileMutation(formData);
			await updateMeMutation({ photo: data?.url! });
			setSelectedPhoto(data?.url!);
		} catch (e) {
			console.error(`Error uploading avatar: ${e}`);
		}
	};

	const handleBackgroundChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const imageFile = event.target.files?.[0];
		if (!imageFile) return;
		const options = {
			maxSizeMB: 1, // Максимальный размер в мегабайтах
			maxWidthOrHeight: 1440, // Максимальная ширина или высота
			useWebWorker: true // Использовать Web Worker для улучшения производительности
		};
		setIsLoadingBackground(true);
		let fileToUpload = imageFile;
		if (imageFile.type !== 'image/gif') {
			fileToUpload = await imageCompression(imageFile, options);
		}
		const formData = new FormData();
		formData.append('file', fileToUpload);
		const { data } = await uploadFileMutation(formData);
		await updateMeMutation({ backgroundImage: data?.url! });
		setSelectedBackgroundImage(data?.url!);
	};

	const handleFirstNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTempFirstName(event.target.value);
		setHasChanges(true);
	};

	const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTempLastName(event.target.value);
		setHasChanges(true);
	};

	return (
		<>
			<section className={scss.Profile}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.top}>
							<h1 className={scss.title}>
								Your <span>profile</span>
							</h1>
							<div className={scss.backgroundImage_panel}>
								<Skeleton
									visible={isLoadingGetMe}
									className={scss.backgroundImage_skeleton}
								>
									{!isLoadingGetMe && (
										<img
											className={scss.backgroundImage}
											src={selectedBackgroundImage || '/bg-default.png'}
											alt={tempFirstName}
											onLoad={() => setIsLoadingBackground(false)}
										/>
									)}
								</Skeleton>
								<Button
									loading={isLoadingBackground}
									loaderProps={{ type: 'dots' }}
									leftSection={<IconPhoto size={18} />}
									size="xs"
									onClick={handleEditBackgroundClick}
								>
									Edit Background Image
								</Button>
								<input
									ref={backgroundInputRef}
									type="file"
									style={{ display: 'none' }}
									onChange={handleBackgroundChange}
								/>
							</div>
						</div>
						<div className={scss.bottom}>
							<div className={scss.left}>
								<Skeleton
									visible={isLoadingGetMe}
									className={scss.avatar_skeleton}
								>
									{!isLoadingGetMe && (
										<img
											className={scss.avatar}
											src={selectedPhoto || undefined}
											alt={tempFirstName}
											onLoad={() => setIsLoadingAvatar(false)}
										/>
									)}
								</Skeleton>
								<Button
									loading={isLoadingAvatar}
									loaderProps={{ type: 'dots' }}
									leftSection={<IconCamera size={18} />}
									size="xs"
									onClick={handleEditAvatarClick}
								>
									Edit Avatar
								</Button>
								<input
									ref={avatarInputRef}
									type="file"
									style={{ display: 'none' }}
									onChange={handleAvatarChange}
								/>
							</div>
							<div className={scss.right}>
								<div className={scss.right_left}>
									<div className={scss.user_name_block}>
										<TextInput
											label="FirstName"
											value={tempFirstName}
											onChange={handleFirstNameChange}
										/>
										<TextInput
											label="LastName"
											value={tempLastName}
											onChange={handleLastNameChange}
										/>
										{isUpdating && <p>updating...</p>}
									</div>
									<div className={scss.user_contacts_block}>
										<p>
											<IconMail stroke={2} /> {tempEmail}
										</p>
										{tempPhone && (
											<p>
												<IconPhone stroke={2} /> {tempPhone}
											</p>
										)}
									</div>
								</div>
								<div className={scss.right_right}>
									<div className={scss.telegram}>
										{dataCheckTelegramAuth?.results !== null ? (
											<>
												{!dataCheckTelegramAuth?.results.isActivated ? (
													// <TelegramAuthButton />
													<></>
												) : (
													<div className={scss.profile}>
														{/* <h2 className={scss.firstName_lastName}>
															{dataCheckTelegramAuth?.results.firstName}{' '}
															{dataCheckTelegramAuth?.results.lastName}
														</h2>
														<h3 className={scss.username}>
															{dataCheckTelegramAuth?.results.username}
														</h3>
														<Button
															className={scss.button}
															variant="outline"
															size="xs"
															onClick={handleDisconnectTelegramAuth}
															leftSection={<IconMobiledataOff size={18} />}
														>
															Отвязать Telegram
														</Button> */}
														<button
															className={scss.button}
															onClick={() => setIsOpenTelegramModal(true)}
														>
															<FaTelegram className={scss.telegramIcon} />{' '}
															{dataCheckTelegramAuth?.results.username}
														</button>
													</div>
												)}
											</>
										) : (
											// <TelegramAuthButton />
											<></>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Modal
				opened={isOpenTelegramModal}
				onClose={() => setIsOpenTelegramModal(false)}
				withCloseButton={false}
				closeOnClickOutside={true}
				title="Отвязать аккаунт в telegram?"
				size="xs"
				centered
			>
				<div className={scss.isOpenTelegramModal}>
					{dataCheckTelegramAuth?.results !== null && (
						<>
							<div className={scss.top}>
								<img
									className={scss.photo}
									src={dataCheckTelegramAuth?.results.photoUrl}
									alt={dataCheckTelegramAuth?.results.username}
								/>
								<div className={scss.info}>
									<h2 className={scss.firstName_lastName}>
										{dataCheckTelegramAuth?.results.firstName}{' '}
										{dataCheckTelegramAuth?.results.lastName}
									</h2>
									<h3 className={scss.username}>
										{dataCheckTelegramAuth?.results.username}
									</h3>
								</div>
							</div>
							<div className={scss.buttons}>
								<Button
									className={scss.button}
									// variant="outline"
									size="xs"
									onClick={handleDisconnectTelegramAuth}
								>
									Подтвердить
								</Button>
								<Button
									className={scss.button}
									variant="outline"
									size="xs"
									onClick={() => setIsOpenTelegramModal(false)}
								>
									Отменить
								</Button>
							</div>
						</>
					)}
				</div>
			</Modal>
		</>
	);
};

export default Profile;
