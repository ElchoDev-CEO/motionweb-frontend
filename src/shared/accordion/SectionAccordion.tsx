'use client';
import { FC, Fragment, useEffect, useState } from 'react';
import scss from './SectionAccordion.module.scss';
import { usePathname } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Accordion, Button, Input, Modal } from '@mantine/core';
import { IconEdit, IconLock, IconTrash } from '@tabler/icons-react';
import { FiPlayCircle } from 'react-icons/fi';
import {
	useDeleteSectionByIdMutation,
	useGetSectionByStructureIdQuery,
	useUpdateSectionByIdMutation,
	useUpdateSectionCheckLevelMutation
} from '@/redux/api/course';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useAccordionStore } from '@/stores/useAccordionStore';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import AccordionPanel from './AccordionPanel';
import SearchableMultiSelectSectionCheckLevel from '../searchableMultiSelect/SearchableMultiSelectSectionCheckLevel';
import Loader from '@/ui/loader/Loader';

interface ISectionAccordionProps {
	structureId: number;
}

interface ISection {
	title: string;
}

const SectionAccordion: FC<ISectionAccordionProps> = ({ structureId }) => {
	const pathname = usePathname();
	const [isOpenEditSectionModal, setIsOpenEditSectionModal] = useState(false);
	const [isOpenDeleteSectionModal, setIsOpenDeleteSectionModal] =
		useState(false);
	const [editSectionId, setEditSectionId] = useState<number | null>(null);
	const [deleteSectionId, setDeleteSectionId] = useState<number | null>(null);
	const [activeItem, setActiveItem] = useState<string | null>('');
	const {
		data: sectionData,
		isLoading,
		refetch
	} = useGetSectionByStructureIdQuery(String(structureId));
	const [updateSectionByIdMutation] = useUpdateSectionByIdMutation();
	const [deleteSectionByIdMutation] = useDeleteSectionByIdMutation();
	const [updateSectionCheckLevelMutation] =
		useUpdateSectionCheckLevelMutation();
	const { isEdit } = useEditControlStore();
	const { setActiveSectionItem } = useAccordionStore();
	const {
		multiSelectValueSectionCheckLevel,
		setMultiSelectValueSectionCheckLevel
	} = useMultiSelectStore();

	const {
		register: registerEditSection,
		handleSubmit: handleEditSubmit,
		reset: resetEdit,
		setValue,
		formState: { isSubmitting: isEditSubmitting }
	} = useForm<ISection>();

	const {
		handleSubmit: handleDeleteSubmit,
		formState: { isSubmitting: isDeleteSubmitting }
	} = useForm();

	const handleAccordionChange = (value: string | null) => {
		setActiveItem(value);
		if (value) {
			localStorage.setItem('lastAccordionItem', value);
		}
	};

	const handleEditSection: SubmitHandler<ISection> = async (data) => {
		await updateSectionByIdMutation({ id: editSectionId!, data });
		await updateSectionCheckLevelMutation({
			sectionId: editSectionId!,
			data: {
				userIds: multiSelectValueSectionCheckLevel
			}
		});
		await refetch();
		localStorage.setItem('lastAccordionItem', data.title);
		setActiveItem(data.title);
		setEditSectionId(null);
		setIsOpenEditSectionModal(false);
		resetEdit();
	};

	const handleDeleteSection = async () => {
		if (deleteSectionId) {
			await deleteSectionByIdMutation(deleteSectionId);
			await refetch();
			setDeleteSectionId(null);
			setIsOpenDeleteSectionModal(false);
		}
	};

	useEffect(() => {
		localStorage.setItem('lastRoute', pathname);
	}, [pathname]);

	useEffect(() => {
		if (!isLoading && sectionData?.results) {
			const lastAccordionItem = localStorage.getItem('lastAccordionItem') || '';
			const foundItem = sectionData.results.find(
				(item) => item.title === lastAccordionItem
			);
			if (foundItem?.title === lastAccordionItem) {
				setActiveSectionItem(foundItem?.id || null);
			}
		}
	}, [sectionData, isLoading]);

	useEffect(() => {
		const savedValue = localStorage.getItem('lastAccordionItem');
		if (savedValue) {
			setActiveItem(savedValue);
		}
	}, []);

	const items = isLoading ? (
		<Loader />
	) : sectionData?.results.length! > 0 ? (
		sectionData?.results.map((item) => (
			<Fragment key={item.id}>
				<Accordion.Item value={item.title}>
					<Accordion.Control
						onClick={() => setActiveSectionItem(item.id)}
						icon={
							item.isUnlocked ? (
								<FiPlayCircle className={scss.svg_unlock} />
							) : (
								<IconLock className={scss.svg_lock} stroke={2} />
							)
						}
						disabled={isEdit ? false : !item.isUnlocked}
					>
						<div className={scss.AccordionSection}>
							<span className={scss.title}>{item.title}</span>
							{isEdit && (
								<div className={scss.buttons}>
									<div
										className={`${scss.button} ${scss.edit_button}`}
										onClick={(e) => {
											e.stopPropagation();
											setEditSectionId(item.id);
											setValue('title', item.title);
											setIsOpenEditSectionModal(true);
										}}
									>
										<IconEdit stroke={2} />
									</div>
									<div
										className={`${scss.button} ${scss.delete_button}`}
										onClick={(e) => {
											e.stopPropagation();
											setDeleteSectionId(item.id);
											setIsOpenDeleteSectionModal(true);
										}}
									>
										<IconTrash stroke={2} />
									</div>
								</div>
							)}
						</div>
					</Accordion.Control>
					<AccordionPanel sectionId={item.id} />
				</Accordion.Item>
			</Fragment>
		))
	) : (
		<p>Временно пустой...</p>
	);

	return (
		<>
			<Accordion value={activeItem} onChange={handleAccordionChange}>
				{items}
			</Accordion>

			<Modal
				opened={isOpenEditSectionModal}
				onClose={() => {
					setIsOpenEditSectionModal(false);
					setMultiSelectValueSectionCheckLevel(() => []);
				}}
				title="Редактирование секции"
				centered
			>
				<div className={scss.edit_lesson}>
					<form onSubmit={handleEditSubmit(handleEditSection)}>
						<Input
							placeholder="Введите название секции..."
							{...registerEditSection('title', { required: true })}
						/>
						<SearchableMultiSelectSectionCheckLevel
							sectionId={editSectionId!}
						/>
						<Button
							loading={isEditSubmitting}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							Обновить
						</Button>
					</form>
				</div>
			</Modal>

			<Modal
				opened={isOpenDeleteSectionModal}
				onClose={() => setIsOpenDeleteSectionModal(false)}
				title="Подтверждение удаления"
				centered
			>
				<div className={scss.delete_structure}>
					<form onSubmit={handleDeleteSubmit(handleDeleteSection)}>
						<p>
							Вы уверены, что хотите удалить эту секцию? Это действие невозможно
							отменить.
						</p>
						<div className={scss.delete_buttons}>
							<Button
								type="button"
								onClick={() => {
									setDeleteSectionId(null);
									setIsOpenDeleteSectionModal(false);
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

export default SectionAccordion;
