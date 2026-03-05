'use client';
import { FC, useState } from 'react';
import scss from './Groups.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import imageCompression from 'browser-image-compression';
import { Button, FileInput, Modal, Skeleton, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconEdit, IconPhoto, IconTrashX } from '@tabler/icons-react';
import {
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useGetGroupAllQuery,
	useGetGroupParticipantQuery,
	useUpdateGroupMutation,
	useUpdateGroupSyncStudentMutation
} from '@/redux/api/group';
import { useUploadFileMutation } from '@/redux/api/upload';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '@/ui/loader/Loader';
import SearchableMultiSelectGroup from '@/shared/searchableMultiSelect/SearchableMultiSelectGroup';
import { useTranslation } from 'react-i18next';

interface IGroup {
	title: string;
	photo: File | null;
}

const Groups: FC = () => {
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const [isEditModalId, setIsEditModalId] = useState<number | null>(null);
	const [deleteGroupId, setDeleteGroupId] = useState<number | null>(null);
	const [isLoadingImage, setIsLoadingImage] = useState<Record<number, boolean>>(
		{}
	);
	const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({});
	const { isEdit } = useEditControlStore();
	const {
		multiSelectValue,
		setMultiSelectValue,
		multiSelectValueTelegram,
		setMultiSelectValueTelegram
	} = useMultiSelectStore();
	const { data: groupParticipantData, isLoading: isLoadingGroupParticipant } =
		useGetGroupParticipantQuery(undefined, { skip: isEdit });
	const { data: groupData, isLoading: isLoadingGroup } = useGetGroupAllQuery(
		undefined,
		{ skip: !isEdit }
	);
	const [uploadFileMutation] = useUploadFileMutation();
	const [createGroupMutation] = useCreateGroupMutation();
	const [updateGroupMutation] = useUpdateGroupMutation();
	const [deleteGroupMutation] = useDeleteGroupMutation();
	const [updateGroupSyncStudentMutation] = useUpdateGroupSyncStudentMutation();
	const router = useRouter();

	const {
		register: registerCreateGroup,
		handleSubmit: handleSubmitCreateGroup,
		setValue: setValueCreateGroup,
		reset: resetCreateGroup,
		formState: { isSubmitting: isSubmittingCreate }
	} = useForm<IGroup>();

	const {
		register: registerEditGroup,
		handleSubmit: handleSubmitEditGroup,
		setValue: setValueEditGroup,
		reset: resetEditGroup,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<IGroup>();

	// Функция для обновления состояния загрузки изображений
	const updateLoadingState = (id: number, isLoading: boolean) => {
		setIsLoadingImage((prevState) => ({ ...prevState, [id]: isLoading }));
	};

	const handleDeleteGroup = async () => {
		if (deleteGroupId === null) return;
		setIsDeleting((prevState) => ({ ...prevState, [deleteGroupId]: true }));
		try {
			await deleteGroupMutation(deleteGroupId);
			setIsOpenDeleteModal(false);
			setDeleteGroupId(null);
		} catch (e) {
			console.error(`Error in deleteGroup: ${e}`);
		}
	};

	const createGroup: SubmitHandler<IGroup> = async (data) => {
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
			await createGroupMutation({
				title: data.title,
				photo: responseImage?.url!
			});
			setIsOpenCreateModal(false);
			resetCreateGroup();
		} catch (e) {
			console.error(`Error in createGroup: ${e}`);
		}
	};

	const editGroup: SubmitHandler<IGroup> = async (data) => {
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
			await updateGroupSyncStudentMutation({
				groupId: isEditModalId!,
				data: { userIds: multiSelectValue }
			});
			await updateGroupMutation({
				id: isEditModalId!,
				data: {
					title: data.title,
					photo: imageUrl
				}
			});
			setIsEditModalId(null);
			setMultiSelectValue(() => []);
			setMultiSelectValueTelegram(() => []);
			setIsOpenEditModal(false);
			resetEditGroup();
		} catch (e) {
			console.error(`Error in editGroup: ${e}`);
		}
	};

	const hasGroupParticipantData = !!groupParticipantData?.results?.length;
	const hasGroupData = !!groupData?.results?.length;

	const { t } = useTranslation('translated');

	return (
		<>
			<section className={scss.Groups}>
				<div className="container">
					<div className={scss.content}>
						{isEdit && (
							<Button
								onClick={() => setIsOpenCreateModal(true)}
								variant="filled"
							>
								{t('myGroups.addBtn')}
							</Button>
						)}
						<div className={scss.list}>
							{!isEdit ? (
								isLoadingGroupParticipant ? (
									<Loader />
								) : hasGroupParticipantData ? (
									groupParticipantData.results.map((item) => (
										<div
											key={item.id}
											className={scss.group}
											onClick={() => router.push(`/groups/${item.id}`)}
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
												</div>
											</div>
										</div>
									))
								) : (
									<p>{t('myGroups.yourGroups')}</p>
								)
							) : isLoadingGroup ? (
								<Loader />
							) : hasGroupData ? (
								groupData.results.map((item) => (
									<div
										key={item.id}
										className={scss.group}
										onClick={() => router.push(`/groups/${item.id}`)}
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
											</div>
											<div className={scss.bottom}>
												<div className={scss.date}>
													<span>
														{t('myGroups.group.createdAt')}: {item.createdAt}
													</span>{' '}
													<span>
														{t('myGroups.group.updatedAt')}: {item.updatedAt}
													</span>{' '}
												</div>
												<div className={scss.buttons}>
													<Button
														onClick={(e) => {
															e.stopPropagation();
															setIsEditModalId(item.id);
															setIsOpenEditModal(true);
															setValueEditGroup('title', item.title);
														}}
														variant="filled"
													>
														<IconEdit size={18} />
													</Button>
													<Button
														onClick={(e) => {
															e.stopPropagation();
															setDeleteGroupId(item.id);
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
								<p>{t('myGroups.groupsNotFound')}</p>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Модалка для создания группы */}
			<Modal
				opened={isOpenCreateModal}
				onClose={() => setIsOpenCreateModal(false)}
				title={t('myGroups.createGroupForm.title')}
				centered
			>
				<div className={scss.create_group}>
					<form onSubmit={handleSubmitCreateGroup(createGroup)}>
						<TextInput
							placeholder={t('myGroups.createGroupForm.nameInput')}
							{...registerCreateGroup('title', { required: true })}
						/>
						<FileInput
							leftSection={<IconPhoto size={18} />}
							placeholder={t('myGroups.createGroupForm.coverGroupInput')}
							onChange={(file) => setValueCreateGroup('photo', file)}
						/>
						<Button
							loading={isSubmittingCreate}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							{t('myGroups.createGroupForm.createBtn')}
						</Button>
					</form>
				</div>
			</Modal>

			{/* Модалка для редактирования группы */}
			<Modal
				opened={isOpenEditModal}
				onClose={() => {
					(setIsOpenEditModal(false), setMultiSelectValue(() => []));
				}}
				title={t('myGroups.updateGroupForm.title')}
				centered
			>
				<div className={scss.update_group}>
					<form onSubmit={handleSubmitEditGroup(editGroup)}>
						<TextInput
							placeholder={t('myGroups.updateGroupForm.nameInput')}
							{...registerEditGroup('title', { required: true })}
						/>
						<FileInput
							leftSection={<IconPhoto size={18} />}
							placeholder={t('myGroups.updateGroupForm.coverCourseInput')}
							onChange={(file) => setValueEditGroup('photo', file)}
						/>
						<SearchableMultiSelectGroup groupId={isEditModalId!} />
						<Button
							loading={isSubmittingEdit}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							{t('myGroups.updateGroupForm.updateBtn')}
						</Button>
					</form>
				</div>
			</Modal>

			{/* Модалка для подтверждения удаления группы */}
			<Modal
				opened={isOpenDeleteModal}
				onClose={() => setIsOpenDeleteModal(false)}
				title={t('myGroups.deleteGroupConfirm.title')}
				centered
			>
				<div className={scss.delete_group}>
					<p>{t('myGroups.deleteGroupConfirm.confirm')}</p>
					<div className={scss.delete_buttons}>
						<Button
							onClick={() => setIsOpenDeleteModal(false)}
							variant="outline"
						>
							{t('myGroups.deleteGroupConfirm.cancelBtn')}
						</Button>
						<Button
							onClick={handleDeleteGroup}
							loading={isDeleting[deleteGroupId || 0]}
							variant="filled"
						>
							{t('myGroups.deleteGroupConfirm.deleteBtn')}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Groups;
