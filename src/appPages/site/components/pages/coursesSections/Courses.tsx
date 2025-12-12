'use client';
import { FC, useState } from 'react';
import scss from './Courses.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import { Bounce, toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import {
	Button,
	FileInput,
	LoadingOverlay,
	Modal,
	Skeleton,
	TextInput
} from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconEdit, IconPhoto, IconTrashX } from '@tabler/icons-react';
import {
	useCreateCourseMutation,
	useDeleteCourseMutation,
	useGetCourseAllQuery,
	useGetCourseParticipantQuery,
	useUpdateCourseMutation,
	useUpdateCourseSyncGroupMutation,
	useUpdateCourseSyncTelegramMutation
} from '@/redux/api/course';
import { useUploadFileMutation } from '@/redux/api/upload';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '@/ui/loader/Loader';
import SearchableMultiSelect from '@/shared/searchableMultiSelect/SearchableMultiSelectCourse';
import SearchableMultiSelectTelegram from '@/shared/searchableMultiSelect/SearchableMultiSelectTelegram';

interface ICourse {
	title: string;
	description: string;
	photo: File | null;
}

const Courses: FC = () => {
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const [isEditModalId, setIsEditModalId] = useState<number | null>(null);
	const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);
	const [isLoadingImage, setIsLoadingImage] = useState<Record<number, boolean>>(
		{}
	);
	const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({});
	const { isEdit } = useEditControlStore();
	const {
		multiSelectValue,
		multiSelectValueTelegram,
		setMultiSelectValue,
		setMultiSelectValueTelegram
	} = useMultiSelectStore();
	const { data: courseParticipantData, isLoading: isLoadingCourseParticipant } =
		useGetCourseParticipantQuery(undefined, { skip: isEdit });
	const { data: courseData, isLoading: isLoadingCourse } = useGetCourseAllQuery(
		undefined,
		{ skip: !isEdit }
	);
	const [uploadFileMutation] = useUploadFileMutation();
	const [createCourseMutation] = useCreateCourseMutation();
	const [updateCourseMutation] = useUpdateCourseMutation();
	const [deleteCourseMutation] = useDeleteCourseMutation();
	const [updateCourseSyncGroupMutation] = useUpdateCourseSyncGroupMutation();
	const [updateGroupSyncTelegramMutation] =
		useUpdateCourseSyncTelegramMutation();
	const router = useRouter();

	const {
		register: registerCreateCourse,
		handleSubmit: handleSubmitCreateCourse,
		setValue: setValueCreateCourse,
		reset: resetCreateCourse,
		formState: { isSubmitting: isSubmittingCreate }
	} = useForm<ICourse>();

	const {
		register: registerEditCourse,
		handleSubmit: handleSubmitEditCourse,
		setValue: setValueEditCourse,
		reset: resetEditCourse,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<ICourse>();

	// Функция для обновления состояния загрузки изображений
	const updateLoadingState = (id: number, isLoading: boolean) => {
		setIsLoadingImage((prevState) => ({ ...prevState, [id]: isLoading }));
	};

	const handleDeleteCourse = async () => {
		if (deleteCourseId === null) return;
		setIsDeleting((prevState) => ({ ...prevState, [deleteCourseId]: true }));
		try {
			await deleteCourseMutation(deleteCourseId);
			setIsOpenDeleteModal(false);
			setDeleteCourseId(null);
		} catch (e) {
			console.error(`Error in deleteCourse: ${e}`);
		}
	};

	const createCourse: SubmitHandler<ICourse> = async (data) => {
		const imageFile = data.photo;
		if (!imageFile) return;
		const options = {
			maxSizeMB: 1, // Максимальный размер в мегабайтах
			maxWidthOrHeight: 500, // Максимальная ширина или высота
			useWebWorker: true // Использовать Web Worker для улучшения производительности
		};
		let fileToUpload = imageFile;
		if (imageFile.type !== 'image/gif') {
			fileToUpload = await imageCompression(imageFile, options);
		}
		const formData = new FormData();
		formData.append('file', fileToUpload);
		try {
			const { data: responseImage } = await uploadFileMutation(formData);
			await createCourseMutation({
				title: data.title,
				description: data.description,
				photo: responseImage?.url!
			});
			setIsOpenCreateModal(false);
			resetCreateCourse();
		} catch (e) {
			console.error(`Error in createCourse: ${e}`);
		}
	};
	const editCourse: SubmitHandler<ICourse> = async (data) => {
		let imageUrl = undefined;
		const imageFile = data.photo;
		if (imageFile) {
			const options = {
				maxSizeMB: 1, // Максимальный размер в мегабайтах
				maxWidthOrHeight: 1000, // Максимальная ширина или высота
				useWebWorker: true // Использовать Web Worker для улучшения производительности
			};
			let fileToUpload = imageFile;
			if (imageFile.type !== 'image/gif') {
				fileToUpload = await imageCompression(imageFile, options);
			}
			const formData = new FormData();
			formData.append('file', fileToUpload);
			const { data: responseImage } = await uploadFileMutation(formData);
			imageUrl = responseImage?.url!;
		}
		try {
			await updateCourseSyncGroupMutation({
				courseId: isEditModalId!,
				data: { groupIds: multiSelectValue }
			});
			await updateGroupSyncTelegramMutation({
				courseId: isEditModalId!,
				data: { telegramGroupInfoIds: multiSelectValueTelegram }
			});
			await updateCourseMutation({
				id: isEditModalId!,
				data: {
					title: data.title,
					description: data.description,
					photo: imageUrl
				}
			});
			setIsEditModalId(null);
			setMultiSelectValue(() => []);
			setMultiSelectValueTelegram(() => []);
			setIsOpenEditModal(false);
			resetEditCourse();
		} catch (e) {
			console.error(`Error in editCourse: ${e}`);
		}
	};

	const hasCourseParticipantData = !!courseParticipantData?.results?.length;
	const hasCourseData = !!courseData?.results?.length;

	return (
		<>
			<section className={scss.Courses}>
				<div className="container">
					<div className={scss.content}>
						{isEdit && (
							<Button
								onClick={() => setIsOpenCreateModal(true)}
								variant="filled"
							>
								Добавить новый курс
							</Button>
						)}
						<div className={scss.list}>
							{!isEdit ? (
								isLoadingCourseParticipant ? (
									<Loader />
								) : hasCourseParticipantData ? (
									courseParticipantData.results.map((item) => {
										const getStatusMessage = () => {
											switch (item.status) {
												case 'subscription-has-expired':
													return 'Продлите подписку для доступа к курсу';
												case 'subscription-not-found':
													return 'Доступ к курсу открыт, но оплата не произведена';
												default:
													return 'Загрузка...';
											}
										};
										const showLoadingOverlay = !(
											item.status === 'already-have-subscription'
										);
										const handleClick = () => {
											if (item.status === 'already-have-subscription') {
												router.push(`/courses/${item.id}`);
											} else {
												toast.warn(getStatusMessage(), {
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
										};
										return (
											<div
												key={item.id}
												className={scss.course}
												onClick={handleClick}
											>
												<LoadingOverlay
													visible={showLoadingOverlay}
													loaderProps={{ children: getStatusMessage() }}
												/>
												<Skeleton visible={isLoadingImage[item.id]}>
													<img
														src={item.photo}
														alt={item.title}
														loading="lazy"
														onLoad={() => updateLoadingState(item.id, false)}
														onError={() => updateLoadingState(item.id, false)}
													/>
												</Skeleton>
												<div className={scss.info}>
													<div className={scss.about}>
														<h1>{item.title}</h1>
														<p>{item.description}</p>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<p>У вас нет курсов...</p>
								)
							) : isLoadingCourse ? (
								<Loader />
							) : hasCourseData ? (
								courseData.results.map((item) => (
									<div
										key={item.id}
										className={scss.course}
										onClick={() => router.push(`/courses/${item.id}`)}
									>
										<Skeleton visible={isLoadingImage[item.id]}>
											<img
												src={item.photo}
												alt={item.title}
												loading="lazy"
												onLoad={() => updateLoadingState(item.id, false)}
												onError={() => updateLoadingState(item.id, false)}
											/>
										</Skeleton>
										<div className={scss.info}>
											<div className={scss.about}>
												<h1>{item.title}</h1>
												<p>{item.description}</p>
											</div>
											<div className={scss.bottom}>
												<div className={scss.date}>
													<span>Создан: {item.createdAt}</span>
													<span>Обновлен: {item.updatedAt}</span>
												</div>
												<div className={scss.buttons}>
													<Button
														onClick={(e) => {
															e.stopPropagation();
															setIsEditModalId(item.id);
															setIsOpenEditModal(true);
															setValueEditCourse('title', item.title);
															setValueEditCourse(
																'description',
																item.description
															);
														}}
														variant="filled"
													>
														<IconEdit size={18} />
													</Button>
													<Button
														onClick={(e) => {
															e.stopPropagation();
															setDeleteCourseId(item.id);
															setIsOpenDeleteModal(true);
														}}
														loading={isDeleting[item.id]}
														loaderProps={{ type: 'dots' }}
														variant="filled"
													>
														<IconTrashX size={18} />
													</Button>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<p>Курсы не найдены...</p>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Модалка для создания курса */}
			<Modal
				opened={isOpenCreateModal}
				onClose={() => setIsOpenCreateModal(false)}
				title="Создание курса"
				centered
			>
				<div className={scss.create_course}>
					<form onSubmit={handleSubmitCreateCourse(createCourse)}>
						<TextInput
							placeholder="Введите название курса..."
							{...registerCreateCourse('title', { required: true })}
						/>
						<TextInput
							placeholder="Введите описание курса..."
							{...registerCreateCourse('description', { required: true })}
						/>
						<FileInput
							leftSection={<IconPhoto size={18} />}
							placeholder="Выберите обложку для курса..."
							onChange={(file) => setValueCreateCourse('photo', file)}
						/>
						<Button
							loading={isSubmittingCreate}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							Создать
						</Button>
					</form>
				</div>
			</Modal>

			{/* Модалка для редактирования курса */}
			<Modal
				opened={isOpenEditModal}
				onClose={() => {
					setIsOpenEditModal(false), setMultiSelectValue(() => []);
				}}
				title="Редактирование курса"
				centered
			>
				<div className={scss.update_course}>
					<form onSubmit={handleSubmitEditCourse(editCourse)}>
						<TextInput
							placeholder="Введите название курса..."
							{...registerEditCourse('title', { required: true })}
						/>
						<TextInput
							placeholder="Введите описание курса..."
							{...registerEditCourse('description', { required: true })}
						/>
						<FileInput
							leftSection={<IconPhoto size={18} />}
							placeholder="Выберите обложку для курса..."
							onChange={(file) => setValueEditCourse('photo', file)}
						/>
						<SearchableMultiSelect courseId={isEditModalId!} />
						<SearchableMultiSelectTelegram courseId={isEditModalId!} />
						<Button
							loading={isSubmittingEdit}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							Обновить
						</Button>
					</form>
				</div>
			</Modal>

			{/* Модалка для подтверждения удаления курса */}
			<Modal
				opened={isOpenDeleteModal}
				onClose={() => setIsOpenDeleteModal(false)}
				title="Подтверждение удаления"
				centered
			>
				<div className={scss.delete_course}>
					<p>
						Вы уверены, что хотите удалить этот курс? Это действие невозможно
						отменить.
					</p>
					<div className={scss.delete_buttons}>
						<Button
							type="button"
							onClick={() => setIsOpenDeleteModal(false)}
							variant="outline"
						>
							Отмена
						</Button>
						<Button
							onClick={handleDeleteCourse}
							loading={isDeleting[deleteCourseId || 0]}
							variant="filled"
						>
							Удалить
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Courses;
