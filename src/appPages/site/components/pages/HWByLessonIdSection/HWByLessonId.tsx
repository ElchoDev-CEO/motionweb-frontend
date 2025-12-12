'use client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import scss from './HWByLessonId.module.scss';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { debounce } from 'throttle-debounce';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	Avatar,
	Box,
	Button,
	Center,
	CloseButton,
	Group,
	Input,
	Modal,
	Pagination,
	Rating,
	ScrollArea,
	Select,
	Switch,
	Table,
	Tooltip,
	UnstyledButton
} from '@mantine/core';
import {
	IconArrowLeft,
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconDownload,
	IconEdit,
	IconSelector,
	IconX
} from '@tabler/icons-react';
import {
	useGetLessonHomeworkByLessonIdQuery,
	useUpdateLessonHomeworkByIdMutation
} from '@/redux/api/course';
import { useGetGroupAllQuery } from '@/redux/api/group';
import Loader from '@/ui/loader/Loader';
import CustomTitle from '@/ui/title/CustomTitle';

interface IGroupIdTitles {
	id: number;
	title: string;
}

interface IEditUserHW {
	mark: number;
	verified: boolean;
}

interface ICustomUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	photo: string;
	phone: string;
}

type SortableFields =
	| 'firstName&lastName'
	| 'group'
	| 'file'
	| 'mark'
	| 'verified'
	| 'createdAt';

const HWByLessonId: FC = () => {
	const { lessonId } = useParams();
	const router = useRouter();

	const [isOpenEditHWModal, setIsOpenEditHWModal] = useState<boolean>(false);
	const [editingHWId, setEditingHWId] = useState<number | null>(null);
	const [editingUser, setEditingUser] = useState<ICustomUser | null>(null);
	const [checked, setChecked] = useState<boolean>(false);
	const [fileUrl, setFileUrl] = useState<string>('');
	const [filename, setFilename] = useState<string>('');

	const [groupIdTitles, setGroupIdTitles] = useState<IGroupIdTitles[]>([]);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [groupTitle, setGroupTitle] = useState<string>();
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortBy, setSortBy] = useState<SortableFields | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);

	const {
		data: lessonHomeworkByLessonIdData,
		isLoading: isLoadingLessonHomeworkByLessonId
	} = useGetLessonHomeworkByLessonIdQuery({
		lessonId: Number(lessonId),
		params: {
			current_page: currentPage || undefined,
			per_page: perPage || undefined,
			groupTitle: groupTitle || undefined,
			search: searchValue || undefined
		}
	});
	const [updateLessonHomeworkByIdMutation] =
		useUpdateLessonHomeworkByIdMutation();
	const { data: groupAllData, isLoading: isLoadingGroupAll } =
		useGetGroupAllQuery();

	// useForm для редактирования урока
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		reset: resetEdit,
		watch: watchEdit,
		setValue: setValueEdit,
		control: controlEdit,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<IEditUserHW>();

	const handleEditUserHW: SubmitHandler<IEditUserHW> = async (data) => {
		try {
			await updateLessonHomeworkByIdMutation({ id: editingHWId!, data });
			setEditingHWId(null);
			setIsOpenEditHWModal(false);
			setFileUrl('');
			setFilename('');
			resetEdit();
		} catch (e) {
			console.error(`Error while editing HW: ${e}`);
		}
	};

	const handleDownloadFile = () => {
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = filename;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const debounceSearch = useCallback(
		debounce(300, (value: string) => {
			setSearchValue(value);
		}),
		[]
	);

	const handleSort = (field: SortableFields) => {
		if (sortBy === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortDirection('asc');
		}
	};

	const sortedData = useMemo(() => {
		if (!lessonHomeworkByLessonIdData?.results) return [];
		const sorted = [...lessonHomeworkByLessonIdData.results].sort((a, b) => {
			if (!sortBy) return 0;

			// Сортировка по пользователю (firstName и lastName)
			if (sortBy === 'firstName&lastName') {
				const nameA = `${a.user.firstName} ${a.user.lastName}`.toLowerCase();
				const nameB = `${b.user.firstName} ${b.user.lastName}`.toLowerCase();
				return sortDirection === 'asc'
					? nameA.localeCompare(nameB)
					: nameB.localeCompare(nameA);
			}

			// Сортировка по файлу
			if (sortBy === 'file') {
				const fileNameA = a.name.toLowerCase();
				const fileNameB = b.name.toLowerCase();
				return sortDirection === 'asc'
					? fileNameA.localeCompare(fileNameB)
					: fileNameB.localeCompare(fileNameA);
			}

			// Сортировка по остатку дней
			if (sortBy === 'mark') {
				const statusA = a.mark;
				const statusB = b.mark;
				return sortDirection === 'asc' ? statusA - statusB : statusB - statusA;
			}

			// Сортировка по статусу
			if (sortBy === 'verified') {
				return sortDirection === 'asc'
					? Number(a.verified) - Number(b.verified)
					: Number(b.verified) - Number(a.verified);
			}

			// Сортировка по дате загрузки
			if (sortBy === 'createdAt') {
				const statusA = a.createdAt.toLowerCase();
				const statusB = b.createdAt.toLowerCase();
				return sortDirection === 'asc'
					? statusA.localeCompare(statusB)
					: statusB.localeCompare(statusA);
			}

			return 0;
		});
		return sorted;
	}, [lessonHomeworkByLessonIdData, sortBy, sortDirection]);

	useEffect(() => {
		if (groupAllData) {
			setGroupIdTitles(
				groupAllData.results.map((item) => ({
					id: item.id,
					title: item.title
				}))
			);
		}
	}, [groupAllData]);

	useEffect(() => {
		if (lessonHomeworkByLessonIdData) {
			setTotalPages(lessonHomeworkByLessonIdData.total_pages);
		}
	}, [lessonHomeworkByLessonIdData, currentPage, perPage]);

	useEffect(() => {
		// Function to calculate the available height dynamically
		const updateHeight = () => {
			const headerHeight = document.querySelector('header')?.clientHeight || 0;
			const footerHeight = document.querySelector('footer')?.clientHeight || 0;
			const paddingAndMargins = 30 * 2; // Assuming 16px padding on top and bottom
			const availableHeight =
				window.innerHeight -
				headerHeight -
				footerHeight -
				paddingAndMargins -
				165;
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

	const rows = sortedData.map((item, index) => (
		<Table.Tr key={index}>
			<Table.Td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Avatar src={item.user.photo} alt={item.user.firstName} />
				<span>
					{item.user.firstName} {item.user.lastName}
				</span>
			</Table.Td>
			<Table.Td>
				{item.user.participantGroup.map((item) => item.group.title).join(' | ')}
			</Table.Td>
			<Table.Td>{item.name}</Table.Td>
			<Table.Td>{item.mark}</Table.Td>
			<Table.Td>{item.verified ? 'Проверен' : 'Не проверен'}</Table.Td>
			<Table.Td>{item.createdAt.replace(/(\s?\+\d{2}:\d{2})$/, '')}</Table.Td>
			<Table.Td>
				<Button
					variant="outline"
					size="xs"
					rightSection={<IconEdit size={18} />}
					onClick={() => {
						setEditingHWId(item.id);
						setEditingUser(item.user);
						setIsOpenEditHWModal(true);
						setValueEdit('mark', item.mark);
						setValueEdit('verified', item.verified);
						setChecked(item.verified);
						setFileUrl(item.link);
						setFilename(item.name);
					}}
				>
					Изменить
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			<section className={scss.HWByLessonId}>
				<div className={scss.container}>
					<div className={scss.content}>
						<CustomTitle
							title="Проверка"
							spanRight="домашних работ"
							color="#000000"
						/>
						<div className={scss.controls}>
							<div className={scss.filters}>
								<Button
									className={scss.button}
									// variant="outline"
									size="xs"
									leftSection={<IconArrowLeft size={18} />}
									onClick={() => {
										router.back();
									}}
								>
									Назад
								</Button>
								<Select
									placeholder="Выберите группу"
									data={groupIdTitles.map((item) => item.title)}
									value={groupTitle}
									onChange={(value) =>
										setGroupTitle(value !== null ? String(value) : '')
									}
									allowDeselect={true}
								/>
								<Input
									placeholder="Найти пользователя"
									value={searchTerm}
									onChange={(event) => {
										const value = event.currentTarget.value;
										setSearchTerm(value);
										debounceSearch(value);
									}}
									rightSectionPointerEvents="all"
									rightSection={
										<CloseButton
											aria-label="Clear input"
											onClick={() => {
												setSearchTerm('');
												debounceSearch('');
											}}
											style={{ display: searchValue ? undefined : 'none' }}
										/>
									}
								/>
							</div>
							<div className={scss.buttons}></div>
						</div>
						{isLoadingLessonHomeworkByLessonId && <Loader />}
						<ScrollArea
							className={scss.ScrollArea}
							h={scrollAreaHeight}
							offsetScrollbars={false}
							scrollbarSize={5}
							scrollHideDelay={250}
						>
							<Box w={1250}>
								{lessonHomeworkByLessonIdData?.results.length ? (
									<Table striped highlightOnHover withColumnBorders>
										<Table.Thead>
											<Table.Tr>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton
														onClick={() => handleSort('firstName&lastName')}
													>
														<Group align="center">
															<span>Пользователь</span>
															<Center>
																{sortBy === 'firstName&lastName' ? (
																	sortDirection === 'asc' ? (
																		<IconChevronUp size={12} />
																	) : (
																		<IconChevronDown size={12} />
																	)
																) : (
																	<IconSelector size={12} />
																)}
															</Center>
														</Group>
													</UnstyledButton>
												</Table.Th>
												<Table.Th>Группа</Table.Th>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton onClick={() => handleSort('file')}>
														<Group align="center">
															<span>Файл</span>
															<Center>
																{sortBy === 'file' ? (
																	sortDirection === 'asc' ? (
																		<IconChevronUp size={12} />
																	) : (
																		<IconChevronDown size={12} />
																	)
																) : (
																	<IconSelector size={12} />
																)}
															</Center>
														</Group>
													</UnstyledButton>
												</Table.Th>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton onClick={() => handleSort('mark')}>
														<Group align="center">
															<span>Оценка</span>
															<Center>
																{sortBy === 'mark' ? (
																	sortDirection === 'asc' ? (
																		<IconChevronUp size={12} />
																	) : (
																		<IconChevronDown size={12} />
																	)
																) : (
																	<IconSelector size={12} />
																)}
															</Center>
														</Group>
													</UnstyledButton>
												</Table.Th>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton
														onClick={() => handleSort('verified')}
													>
														<Group align="center">
															<span>Статус</span>
															<Center>
																{sortBy === 'verified' ? (
																	sortDirection === 'asc' ? (
																		<IconChevronUp size={12} />
																	) : (
																		<IconChevronDown size={12} />
																	)
																) : (
																	<IconSelector size={12} />
																)}
															</Center>
														</Group>
													</UnstyledButton>
												</Table.Th>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton
														onClick={() => handleSort('createdAt')}
													>
														<Group align="center">
															<span>Загружено</span>
															<Center>
																{sortBy === 'createdAt' ? (
																	sortDirection === 'asc' ? (
																		<IconChevronUp size={12} />
																	) : (
																		<IconChevronDown size={12} />
																	)
																) : (
																	<IconSelector size={12} />
																)}
															</Center>
														</Group>
													</UnstyledButton>
												</Table.Th>
												<Table.Th>Действия</Table.Th>
											</Table.Tr>
										</Table.Thead>
										<Table.Tbody>{rows}</Table.Tbody>
									</Table>
								) : (
									<Center>Нет данных для отображения</Center>
								)}
							</Box>
						</ScrollArea>
						{totalPages !== null && totalPages > 0 && (
							<div className={scss.pagination}>
								<div className={scss.left}>
									<Pagination
										size="sm"
										total={totalPages}
										value={currentPage}
										onChange={(value) => setCurrentPage(value)}
									/>
								</div>
								<div className={scss.right}>
									<Select
										size="xs"
										placeholder="Выберите"
										data={['10', '15', '25', '50', '100']}
										defaultValue={String(perPage)}
										onChange={(value) => setPerPage(Number(value))}
										allowDeselect={false}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Модальное окно редактирования оценки ДЗ */}
			<Modal
				opened={isOpenEditHWModal}
				onClose={() => setIsOpenEditHWModal(false)}
				title="Редактирование оценки ДЗ"
				centered
			>
				<div className={scss.edit_hw}>
					<form
						onSubmit={handleEditSubmit(handleEditUserHW)}
						className={scss.form}
					>
						<div className={scss.block}>
							<div className={scss.editing_user}>
								{editingUser && (
									<>
										<Avatar
											className={scss.avatar}
											src={editingUser.photo}
											alt={editingUser.firstName}
											size="xl"
										/>
										<span>
											{editingUser.firstName} {editingUser.lastName}
										</span>
									</>
								)}
								<Tooltip
									arrowOffset={10}
									arrowSize={5}
									label={filename}
									withArrow
									position="bottom-start"
									offset={3}
								>
									<Button
										onClick={handleDownloadFile}
										rightSection={<IconDownload size={18} />}
									>
										Скачать
									</Button>
								</Tooltip>
							</div>
							<div className={scss.editing_hw}>
								<div className={scss.form_group}>
									<label>Оценка:</label>
									<Rating
										fractions={2}
										count={5}
										defaultValue={watchEdit('mark') / 2}
										onChange={(value) => {
											setValueEdit('mark', value * 2);
										}}
									/>
								</div>
								<div className={scss.form_group}>
									<label>Статус проверки:</label>
									<Switch
										checked={checked}
										onChange={(event) => {
											setChecked(event.currentTarget.checked);
											setValueEdit('verified', event.currentTarget.checked);
										}}
										color="teal"
										size="md"
										thumbIcon={
											checked ? (
												<IconCheck
													size={12}
													color="var(--mantine-color-teal-6)"
													stroke={3}
												/>
											) : (
												<IconX
													size={12}
													color="var(--mantine-color-red-6)"
													stroke={3}
												/>
											)
										}
									/>
								</div>
							</div>
						</div>
						<Button
							className={scss.button}
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
		</>
	);
};

export default HWByLessonId;
