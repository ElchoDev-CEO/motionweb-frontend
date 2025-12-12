'use client';
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import scss from './StructureAccordion.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import { debounce } from 'throttle-debounce';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Modal, ScrollArea, TextInput } from '@mantine/core';
import { IconEdit, IconLock, IconTrash } from '@tabler/icons-react';
import {
	useCreateSectionMutation,
	useCreateStructureMutation,
	useDeleteStructureByIdMutation,
	useGetStructureCourseIdQuery,
	useUpdateStructureByIdMutation
} from '@/redux/api/course';
import { useEditControlStore } from '@/stores/useEditControlStore';
import SectionAccordion from './SectionAccordion';
import Loader from '@/ui/loader/Loader';

interface IStructureAccordionProps {
	courseId: number;
}

interface IStructure {
	title: string;
}

const StructureAccordion: FC<IStructureAccordionProps> = ({ courseId }) => {
	const router = useRouter();
	const [isOpenEditStructureModal, setIsOpenEditStructureModal] =
		useState(false);
	const [isOpenDeleteStructureModal, setIsOpenDeleteStructureModal] =
		useState(false);
	const [editStructureId, setEditStructureId] = useState<number | null>(null);
	const [deleteStructureId, setDeleteStructureId] = useState<number | null>(
		null
	);
	const [sectionTitles, setSectionTitles] = useState<Record<number, string>>(
		{}
	);
	const [newStructureTitle, setNewStructureTitle] = useState<string>('');
	const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
	const { isEdit } = useEditControlStore();

	const {
		data: structureData,
		isLoading,
		refetch
	} = useGetStructureCourseIdQuery(String(courseId));
	const [createStructureMutation] = useCreateStructureMutation();
	const [updateStructure] = useUpdateStructureByIdMutation();
	const [createSection] = useCreateSectionMutation();
	const [deleteStructureByIdMutation] = useDeleteStructureByIdMutation();

	// useForm для редактирования структуры
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		reset: resetEdit,
		setValue: setValueEdit,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<IStructure>();

	// useForm для удаления структуры
	const {
		handleSubmit: handleDeleteSubmit,
		formState: { isSubmitting: isDeleteSubmitting }
	} = useForm();

	const handleCreateStructure = async () => {
		if (newStructureTitle.trim()) {
			await createStructureMutation({ courseId, title: newStructureTitle });
			setNewStructureTitle('');
			refetch();
		}
	};

	const handleEditStructure: SubmitHandler<IStructure> = async (data) => {
		try {
			await updateStructure({
				id: editStructureId!,
				data
			});
			await refetch();
			setEditStructureId(null);
			setIsOpenEditStructureModal(false);
			resetEdit();
		} catch (e) {
			console.error(`Error while editing structure: ${e}`);
		}
	};

	const handleDeleteStructure = async () => {
		await deleteStructureByIdMutation(deleteStructureId!);
		await refetch();
		setDeleteStructureId(null);
		setIsOpenDeleteStructureModal(false);
	};

	const handleCreateSection = useCallback(
		async (structureId: number) => {
			const title = sectionTitles[structureId]?.trim();
			if (title) {
				await createSection({ structureId, title });
				setSectionTitles((prev) => ({
					...prev,
					[structureId]: ''
				}));
			}
		},
		[sectionTitles, createSection]
	);

	useEffect(() => {
		if (!structureData?.results?.length && !isLoading) {
			localStorage.removeItem('lastRoute');
			localStorage.removeItem('lastAccordionItem');
			router.push('/courses');
		}
	}, [structureData, isLoading, router]);

	useEffect(() => {
		// Function to calculate the available height dynamically
		const updateHeight = () => {
			const headerHeight = document.querySelector('header')?.clientHeight || 0;
			const footerHeight = document.querySelector('footer')?.clientHeight || 0;
			const paddingAndMargins = 30 * 2; // Assuming 16px padding on top and bottom
			const availableHeight =
				window.innerHeight - headerHeight - footerHeight - paddingAndMargins;
			setScrollAreaHeight(availableHeight);
		};
		// Call on mount
		updateHeight();
		setInterval(updateHeight, 1000);
		// Recalculate on window resize
		window.addEventListener('resize', updateHeight);
		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', updateHeight);
		};
	}, []);

	return (
		<>
			<section className={scss.StructureAccordion}>
				<ScrollArea
					h={scrollAreaHeight}
					offsetScrollbars={true}
					scrollbarSize={5}
					scrollHideDelay={250}
				>
					<div className={scss.container}>
						<div className={scss.content}>
							{isLoading ? (
								<Loader />
							) : structureData?.results?.length ? (
								structureData.results.map((item) => (
									<div key={item.id} className={scss.section_by_id}>
										<h1 className={scss.title}>
											{item.title || 'Без названия'}
										</h1>
										{isEdit && (
											<div className={scss.buttons}>
												<div
													className={`${scss.button} ${scss.edit_button}`}
													onClick={(e) => {
														e.stopPropagation();
														setEditStructureId(item.id);
														setValueEdit('title', item.title);
														setIsOpenEditStructureModal(true);
													}}
												>
													<IconEdit stroke={2} />
												</div>
												<div
													className={`${scss.button} ${scss.delete_button}`}
													onClick={(e) => {
														e.stopPropagation();
														setDeleteStructureId(item.id);
														setIsOpenDeleteStructureModal(true);
													}}
												>
													<IconTrash stroke={2} />
												</div>
											</div>
										)}
										<SectionAccordion structureId={item.id} />
										{isEdit && (
											<div className={scss.edit_block}>
												<TextInput
													placeholder="Создать секцию..."
													value={sectionTitles[item.id] || ''}
													onChange={(e) =>
														setSectionTitles((prev) => ({
															...prev,
															[item.id]: e.target.value
														}))
													}
												/>
												<Button
													variant="light"
													onClick={() => handleCreateSection(item.id)}
												>
													+
												</Button>
											</div>
										)}
									</div>
								))
							) : (
								<p className={scss.empty}>Список разделов пуст...</p>
							)}
							{isEdit && (
								<div className={scss.create_structure}>
									<TextInput
										placeholder="Создать структуру..."
										value={newStructureTitle}
										onChange={(e) => setNewStructureTitle(e.target.value)}
									/>
									<Button variant="light" onClick={handleCreateStructure}>
										+
									</Button>
								</div>
							)}
						</div>
					</div>
				</ScrollArea>
			</section>

			{/* Модальное окно редактирования структуры */}
			<Modal
				opened={isOpenEditStructureModal}
				onClose={() => {
					setIsOpenEditStructureModal(false);
				}}
				title="Редактирование структуры"
				centered
			>
				<div className={scss.edit_structure}>
					<form onSubmit={handleEditSubmit(handleEditStructure)}>
						<Input
							placeholder="Введите название структуры..."
							{...registerEdit('title', { required: true })}
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

			{/* Модальное окно удаления структуры */}
			<Modal
				opened={isOpenDeleteStructureModal}
				onClose={() => setIsOpenDeleteStructureModal(false)}
				title="Подтверждение удаления"
				centered
			>
				<div className={scss.delete_structure}>
					<form onSubmit={handleDeleteSubmit(handleDeleteStructure)}>
						<p>
							Вы уверены, что хотите удалить эту структуру? Это действие
							невозможно отменить.
						</p>
						<div className={scss.delete_buttons}>
							<Button
								type="button"
								onClick={() => {
									setDeleteStructureId(null);
									setIsOpenDeleteStructureModal(false);
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

export default StructureAccordion;
