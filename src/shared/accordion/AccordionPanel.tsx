'use client';
import { FC, useState } from 'react';
import scss from './AccordionPanel.module.scss';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import {
	Accordion,
	Button,
	Input,
	Modal,
	Select,
	Tooltip
} from '@mantine/core';
import {
	IconBrandVscode,
	IconCirclePlus,
	IconEdit,
	IconMovie,
	IconTrash
} from '@tabler/icons-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
	useCreateLessonMutation,
	useDeleteLessonByIdMutation,
	useGetLessonBySectionIdQuery,
	useUpdateLessonByIdMutation
} from '@/redux/api/course';
import Loader from '@/ui/loader/Loader';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useAccordionStore } from '@/stores/useAccordionStore';

interface IAccordionPanelProps {
	sectionId: number;
}

interface ILesson {
	type: string;
	title: string;
}

const AccordionPanel: FC<IAccordionPanelProps> = ({ sectionId }) => {
	const { courseId } = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const [isActive, setIsActive] = useState(false);
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
	const [isOpenEditLessonModal, setIsOpenEditLessonModal] = useState(false);
	const [isOpenDeleteLessonModal, setIsOpenDeleteLessonModal] = useState(false);
	const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
	const [deleteLessonId, setDeleteLessonId] = useState<number | null>(null);
	const { isEdit } = useEditControlStore();
	const { activeSectionItem } = useAccordionStore();

	const {
		data: lessonData,
		isLoading,
		refetch
	} = useGetLessonBySectionIdQuery(String(sectionId), {
		skip: activeSectionItem !== sectionId
	});
	const [createLessonMutation] = useCreateLessonMutation();
	const [updateLessonMutation] = useUpdateLessonByIdMutation();
	const [deleteLessonByIdMutation] = useDeleteLessonByIdMutation();

	// useForm для создания урока
	const {
		register: registerCreate,
		handleSubmit: handleCreateSubmit,
		reset: resetCreate,
		control: controlCreate,
		formState: { isSubmitting: isSubmittingCreate }
	} = useForm<ILesson>();

	// useForm для редактирования урока
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		reset: resetEdit,
		setValue: setValueEdit,
		control: controlEdit,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<ILesson>();

	// useForm для удаления урока
	const {
		handleSubmit: handleDeleteSubmit,
		formState: { isSubmitting: isDeleteSubmitting }
	} = useForm();

	const handleCreateLesson: SubmitHandler<ILesson> = async (data) => {
		try {
			await createLessonMutation({
				sectionId: Number(sectionId),
				type: data.type,
				title: data.title
			});
			setIsOpenCreateModal(false);
			resetCreate();
		} catch (e) {
			console.error(`Error in continue creating course: ${e}`);
		}
	};

	const handleEditLesson: SubmitHandler<ILesson> = async (data) => {
		try {
			await updateLessonMutation({ id: editingLessonId!, data });
			await refetch();
			setEditingLessonId(null);
			setIsOpenEditLessonModal(false);
			resetEdit();
		} catch (e) {
			console.error(`Error while editing lesson: ${e}`);
		}
	};

	const handleDeleteLesson = async () => {
		if (deleteLessonId) {
			await deleteLessonByIdMutation(deleteLessonId);
			await refetch();
			setDeleteLessonId(null);
			setIsOpenDeleteLessonModal(false);
		}
	};

	return (
		<>
			<Accordion.Panel>
				{isLoading ? (
					<Loader />
				) : lessonData?.results.length! > 0 ? (
					<div className={scss.AccordionPanel}>
						{lessonData?.results.map((item) => (
							<button
								key={item.id}
								className={
									pathname === `/courses/${courseId}/lesson/${item.id}`
										? `${scss.AccordionPanel_button} ${scss.active}`
										: `${scss.AccordionPanel_button}`
								}
								onClick={() =>
									router.push(`/courses/${courseId}/lesson/${item.id}`)
								}
							>
								<div className={scss.icon}>
									{item.type === 'THEORY' ? (
										<IconMovie size={18} />
									) : (
										<IconBrandVscode size={18} />
									)}
								</div>
								{item.title.length > 25 ? (
									<Tooltip label={item.title} position="bottom">
										<span className={scss.title} data-full-title={item.title}>
											{item.title.length > 25
												? item.title.slice(0, 20) + '...'
												: item.title}
										</span>
									</Tooltip>
								) : (
									<span className={scss.title} data-full-title={item.title}>
										{item.title}
									</span>
								)}

								{isEdit && (
									<div className={scss.buttons}>
										<div
											className={`${scss.button} ${scss.edit_button}`}
											onClick={(e) => {
												e.stopPropagation();
												setEditingLessonId(item.id);
												setValueEdit('type', item.type);
												setValueEdit('title', item.title);
												setIsOpenEditLessonModal(true);
											}}
										>
											<IconEdit stroke={2} />
										</div>
										<div
											className={`${scss.button} ${scss.delete_button}`}
											onClick={(e) => {
												e.stopPropagation();
												setDeleteLessonId(item.id);
												setIsOpenDeleteLessonModal(true);
											}}
										>
											<IconTrash stroke={2} />
										</div>
									</div>
								)}
							</button>
						))}
					</div>
				) : (
					<p>Нет уроков...</p>
				)}
				{isEdit && (
					<Button
						className={scss.create_lesson_btn}
						variant="outline"
						leftSection={<IconCirclePlus size={18} />}
						onClick={() => setIsOpenCreateModal(true)}
					>
						Создать урок
					</Button>
				)}
			</Accordion.Panel>

			{/* Модальное окно создания урока */}
			<Modal
				opened={isOpenCreateModal}
				onClose={() => setIsOpenCreateModal(false)}
				title="Создание урока"
				centered
			>
				<div className={scss.create_lesson}>
					<form onSubmit={handleCreateSubmit(handleCreateLesson)}>
						<Input
							placeholder="Введите название урока..."
							{...registerCreate('title', { required: true })}
						/>
						<Controller
							name="type"
							control={controlCreate}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									{...field}
									placeholder="Выберите тип урока..."
									data={[
										{ value: 'THEORY', label: 'Теория' },
										{ value: 'PRACTICE', label: 'Практика' }
									]}
									onChange={(value) => field.onChange(value)}
								/>
							)}
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

			{/* Модальное окно редактирования урока */}
			<Modal
				opened={isOpenEditLessonModal}
				onClose={() => setIsOpenEditLessonModal(false)}
				title="Редактирование урока"
				centered
			>
				<div className={scss.edit_lesson}>
					<form onSubmit={handleEditSubmit(handleEditLesson)}>
						<Input
							placeholder="Введите название урока..."
							{...registerEdit('title', { required: true })}
						/>
						<Controller
							name="type"
							control={controlEdit}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									{...field}
									placeholder="Выберите тип урока..."
									data={[
										{ value: 'THEORY', label: 'Теория' },
										{ value: 'PRACTICE', label: 'Практика' }
									]}
									onChange={(value) => field.onChange(value)}
								/>
							)}
						/>
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

			{/* Модальное окно удаления урока */}
			<Modal
				opened={isOpenDeleteLessonModal}
				onClose={() => setIsOpenDeleteLessonModal(false)}
				title="Подтверждение удаления"
				centered
			>
				<div className={scss.delete_lesson}>
					<form onSubmit={handleDeleteSubmit(handleDeleteLesson)}>
						<p>
							Вы уверены, что хотите удалить этот урок? Это действие невозможно
							отменить.
						</p>
						<div className={scss.delete_buttons}>
							<Button
								type="button"
								onClick={() => {
									setDeleteLessonId(null);
									setIsOpenDeleteLessonModal(false);
								}}
								variant="outline"
							>
								Отмена
							</Button>
							<Button
								loading={isDeleteSubmitting}
								loaderProps={{ type: 'dots' }}
								type="submit"
								variant="filled"
							>
								Удалить
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AccordionPanel;
