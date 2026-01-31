'use client';
import React, { FC, useRef, useState, useEffect, useCallback } from 'react';
import scss from './Profile.module.scss';
import imageCompression from 'browser-image-compression';
import {
	IconCamera,
	IconMail,
	IconPhone,
} from '@tabler/icons-react';
import { MdModeEdit } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaTelegram } from 'react-icons/fa';
import { IoPersonCircleOutline } from "react-icons/io5"; import { BsTwitterX } from "react-icons/bs";
import { Button, Modal, Skeleton, TextInput } from '@mantine/core';
import { FaInstagram } from "react-icons/fa6";
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
	const [hasChanges, setHasChanges] = useState<boolean>(false);
	const [isModal, setIsModal] = useState<boolean>(false)


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
		const formData = new FormData(); // formData is useful for key-value data and allows to send these data to backend
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
					<h1 className={scss.left__title}>
						Профиль
					</h1>
					<div className={scss.content}>
						<div className={scss.left}>
							<div className={scss.cover}>

								<div className={scss.backgroundImage_panel}>
									<Skeleton
										visible={isLoadingGetMe}
										className={scss.skeleton}
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
										size="xs"
										className={scss.bg_btn}
										onClick={handleEditBackgroundClick}
									>
										<MdModeEdit size={40} />
									</Button>
									<input
										ref={backgroundInputRef}
										type="file"
										style={{ display: 'none' }}
										onChange={handleBackgroundChange}
									/>
								</div>
								{/*  Brandset */}
								<div className={scss.left__avatar}>
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
									<div className={scss.text}>
										<span>Ваше фото</span>
										<p>Здест будет отображатся ваше фото</p>
									</div>
								</div>
								<div className={scss.left_bottom}>
									<Button
										className={scss.avatar_btn}
										loading={isLoadingAvatar}
										loaderProps={{ type: 'dots', color: "dark" }}
										leftSection={<IconCamera size={18} />}
										size="xs"
										onClick={handleEditAvatarClick}
									>
										Загрузить фото
									</Button>
									<input
										ref={avatarInputRef}
										type="file"
										style={{ display: 'none' }}
										onChange={handleAvatarChange}
									/>
								</div>
							</div>


							{/* Personal information */}
							<div className={scss.left__personal_info}>
								<span className={scss.title}>Персональная информация</span>

								<div className={scss.info_block}>
									<div className={scss.name}>
										<TextInput
											leftSection={< IoPersonCircleOutline size={20} />}
											label="FirstName"
											value={tempFirstName}
											onChange={handleFirstNameChange}
										/>
									</div>
									<div className={scss.lastname}>
										<TextInput
											leftSection={< IoPersonCircleOutline size={20} />}
											label="LastName"
											value={tempLastName}
											onChange={handleLastNameChange}
										/>
									</div>

									{isUpdating && <p>updating...</p>}
									<div className={scss.email}>
										<span>Email address</span>
										<p>
											<IconMail size={20} color='#7d7d7d' /> {tempEmail}
										</p>
									</div>
									<div className={scss.left__personal_info__number}>
										{tempPhone && (
											<p>
												<IconPhone stroke={2} /> {tempPhone}
											</p>
										)}
									</div>
								</div>
								<div className={scss.right_tg}>
									<div className={scss.telegram}>
										{dataCheckTelegramAuth?.results !== null ? (
											<>
												{!dataCheckTelegramAuth?.results.isActivated ? (
													// <TelegramAuthButton />
													<></>
												) : (
													<div className={scss.profile}>
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
						<div className={scss.right}>
							<div className={scss.bio_description}>
								<span>Bio</span>
								<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum rerum debitis quod, officiis voluptatem corporis repudiandae .
									fdfdfdfsfdsfsfdffsfdsfdsf

								</div>
							</div>
							<div className={scss.interests_hobby}>
								<div>
									<span>Interests/Skills</span>
									<div className={scss.ticket_cover}>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
										<div className={scss.ticket}>
											Framer <RxCross2 />
										</div>
										<div className={scss.ticket}>
											Crypto <RxCross2 />
										</div>
										<div className={scss.ticket}>
											ML learning <RxCross2 />
										</div>
										<div className={scss.ticket}>
											Fullstack <RxCross2 />
										</div>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
									</div>
								</div>
								<button onClick={() => setIsModal(true)}>+ Add more</button>
							</div>
							{isModal && <Modal
								opened={isModal}
								onClose={() => setIsModal(false)}
								withCloseButton={false}
								closeOnClickOutside={true}
								title="Выберите интересы"
								size="xl"
								centered
							>
								<div className={scss.modal}>
									<div className={scss.modal_items}>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
										<div className={scss.ticket}>
											UI Design <RxCross2 />
										</div>
									</div>
								</div>
							</Modal>
							}
							<div className={scss.social_media_acc}>
								<span>Social Media accounts</span>
								<div className={scss.social_cover}>
									<div className={scss.social_item}>
										<BsTwitterX size={22} />
										<span>
											https://twitter.com/Shalt0ni
										</span>
									</div>
									<div className={scss.social_item}>
										<FaInstagram size={22} />
										<span>
											https://instagram.com/Shalt0ni
										</span>
									</div>
									<div className={scss.social_item}>
										<FaLinkedinIn size={22} />
										<span>
											https://wwww.linkedin.com/Shalt0ni
										</span>
									</div>
								</div>
								<button>+ Add more</button>
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