'use client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import scss from './ContractItems.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	Avatar,
	Button,
	Center,
	CloseButton,
	Group,
	Input,
	Pagination,
	ScrollArea,
	Select,
	Table,
	UnstyledButton,
	Modal,
	Box
} from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
// import { DatePicker } from '@mantine/dates';
import { debounce } from 'throttle-debounce';
import {
	useCreateCourseSubscriptionMutation,
	useGetCourseAllQuery,
	useGetCourseSubscriptionQueryQuery,
	useUpdateCourseSubscriptionByIdMutation
} from '@/redux/api/course';
import { useGetGroupAllQuery } from '@/redux/api/group';
import {
	IconChevronDown,
	IconChevronUp,
	IconEdit,
	IconSelector
} from '@tabler/icons-react';
import CustomTitle from '@/ui/title/CustomTitle';
import Loader from '@/ui/loader/Loader';
import { useGetUserAllQuery } from '@/redux/api/user';

interface ICourseIdFirstNameLastName {
	id: number;
	firstName: string;
	lastName: string;
}

interface ICourseIdTitles {
	id: number;
	title: string;
}

interface IGroupIdTitles {
	id: number;
	title: string;
}

interface ICreateSubscription {
	userId: number;
	courseId: number;
	groupId: number;
	endDate: number;
}

interface IEditSubscription {
	endDate: number;
}

type SortableFields =
	| 'firstName&lastName'
	| 'email'
	| 'startDate'
	| 'endDate'
	| 'daysRemaining'
	| 'status';

const ContractItems: FC = () => {
	const [courseIdFirstNameLastName, setCourseIdFirstNameLastName] = useState<
		ICourseIdFirstNameLastName[]
	>([]);
	const [courseIdTitles, setCourseIdTitles] = useState<ICourseIdTitles[]>([]);
	const [groupIdTitles, setGroupIdTitles] = useState<IGroupIdTitles[]>([]);
	const [courseTitles, setCourseTitles] = useState<string[]>([]);
	const [groupTitles, setGroupTitles] = useState<string[]>([]);
	const [courseTitle, setCourseTitle] = useState<string>('');
	const [groupTitle, setGroupTitle] = useState<string>('');
	const [searchUser, setSearchUser] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [limit, setLimit] = useState<number>(100);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [sortBy, setSortBy] = useState<SortableFields | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
	// const [creatingId, setCreatingId] = useState<number | null>(null);
	const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);

	const {
		data: courseSubscriptionData,
		isLoading: isLoadingCourseSubscription
	} = useGetCourseSubscriptionQueryQuery({
		current_page: page || undefined,
		per_page: limit || undefined,
		courseTitle: courseTitle || undefined,
		groupTitle: groupTitle || undefined,
		user: searchUser || undefined
	});
	const [createCourseSubscriptionMutation] =
		useCreateCourseSubscriptionMutation();
	const [updateCourseSubscriptionByIdMutation] =
		useUpdateCourseSubscriptionByIdMutation();
	const { data: userAllData, isLoading: isLoadingUserAll } = useGetUserAllQuery(
		{}
	);
	const { data: courseAllData, isLoading: isLoadingCourseAll } =
		useGetCourseAllQuery();
	const { data: groupAllData, isLoading: isLoadingGroupAll } =
		useGetGroupAllQuery();

	// useForm для создания нового контракта
	const {
		register: registerCreate,
		handleSubmit: handleCreateSubmit,
		reset: resetCreate,
		watch: watchCreate,
		setValue: setValueCreate,
		control: controlCreate,
		formState: { isSubmitting: isSubmittingCreate }
	} = useForm<ICreateSubscription>();

	const handleCreate: SubmitHandler<ICreateSubscription> = async (data) => {
		try {
			await createCourseSubscriptionMutation({
				...data,
				endDate: data.endDate === undefined ? 30 : data.endDate
			});
			setIsOpenCreateModal(false);
			resetCreate();
		} catch (e) {
			console.error(`Error while creating subscription: ${e}`);
		}
	};

	// useForm для редактирования контракта
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		reset: resetEdit,
		watch: watchEdit,
		setValue: setValueEdit,
		control: controlEdit,
		formState: { isSubmitting: isSubmittingEdit }
	} = useForm<IEditSubscription>();

	const handleEdit: SubmitHandler<IEditSubscription> = async (data) => {
		try {
			await updateCourseSubscriptionByIdMutation({
				id: editingId!,
				data: {
					endDate: data.endDate === undefined ? 30 : data.endDate
				}
			});
			setIsOpenEditModal(false);
			setEditingId(null);
			resetEdit();
		} catch (e) {
			console.error(`Error while editing subscription: ${e}`);
		}
	};

	const debounceUserSearch = useCallback(
		debounce(300, (value) => {
			setSearchUser(value);
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
		if (!courseSubscriptionData?.results) return [];
		const sorted = [...courseSubscriptionData.results].sort((a, b) => {
			if (!sortBy) return 0;

			// Сортировка по пользователю (firstName и lastName)
			if (sortBy === 'firstName&lastName') {
				const nameA = `${a.user.firstName} ${a.user.lastName}`.toLowerCase();
				const nameB = `${b.user.firstName} ${b.user.lastName}`.toLowerCase();
				return sortDirection === 'asc'
					? nameA.localeCompare(nameB)
					: nameB.localeCompare(nameA);
			}

			// Сортировка по email
			if (sortBy === 'email') {
				const emailA = a.user.email.toLowerCase();
				const emailB = b.user.email.toLowerCase();
				return sortDirection === 'asc'
					? emailA.localeCompare(emailB)
					: emailB.localeCompare(emailA);
			}

			// Сортировка по startDate
			if (sortBy === 'startDate') {
				const startDateA = new Date(a.startDate);
				const startDateB = new Date(b.startDate);
				return sortDirection === 'asc'
					? startDateA.getTime() - startDateB.getTime()
					: startDateB.getTime() - startDateA.getTime();
			}

			// Сортировка по endDate
			if (sortBy === 'endDate') {
				const endDateA = new Date(a.endDate);
				const endDateB = new Date(b.endDate);
				return sortDirection === 'asc'
					? endDateA.getTime() - endDateB.getTime()
					: endDateB.getTime() - endDateA.getTime();
			}

			// Сортировка по остатку дней
			if (sortBy === 'daysRemaining') {
				const statusA = a.daysRemaining;
				const statusB = b.daysRemaining;
				return sortDirection === 'asc' ? statusA - statusB : statusB - statusA;
			}

			// Сортировка по статусу
			if (sortBy === 'status') {
				const statusA = a.status.toLowerCase();
				const statusB = b.status.toLowerCase();
				return sortDirection === 'asc'
					? statusA.localeCompare(statusB)
					: statusB.localeCompare(statusA);
			}

			return 0;
		});
		return sorted;
	}, [courseSubscriptionData, sortBy, sortDirection]);

	useEffect(() => {
		if (userAllData) {
			setCourseIdFirstNameLastName(
				userAllData.results.map((item) => ({
					id: item.id!,
					firstName: item.firstName,
					lastName: item.lastName
				}))
			);
		}
		if (courseAllData) {
			setCourseIdTitles(
				courseAllData.results.map((item) => ({
					id: item.id,
					title: item.title
				}))
			);
		}
		if (groupAllData) {
			setGroupIdTitles(
				groupAllData.results.map((item) => ({
					id: item.id,
					title: item.title
				}))
			);
		}
	}, [userAllData, courseAllData, groupAllData]);

	useEffect(() => {
		if (courseAllData) {
			setCourseTitles(courseAllData.results.map((course) => course.title));
		}
		if (groupAllData) {
			setGroupTitles(groupAllData.results.map((group) => group.title));
		}
	}, [courseAllData, groupAllData]);

	useEffect(() => {
		if (courseSubscriptionData) {
			setTotalPages(courseSubscriptionData.total_pages);
		}
	}, [courseSubscriptionData, page, limit]);

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

	// const months = Array.from({ length: 12 }, (_, i) => ({
	// 	label: `${i + 1} ${i + 1 === 1 ? 'месяц' : i + 1 < 5 ? 'месяца' : 'месяцев'}`,
	// 	value: String((i + 1) * 30)
	// }));
	// console.log(months);

	const months = [
		{ label: 'Ограничить доступ', value: '0' },
		{ label: '1 месяц', value: '30' },
		{ label: '2 месяца', value: '60' },
		{ label: '3 месяца', value: '90' },
		{ label: '4 месяца', value: '120' },
		{ label: '5 месяцев', value: '150' },
		{ label: '6 месяцев', value: '180' },
		{ label: '7 месяцев', value: '210' },
		{ label: '8 месяцев', value: '240' },
		{ label: '9 месяцев', value: '270' },
		{ label: '10 месяцев', value: '300' },
		{ label: '11 месяцев', value: '330' },
		{ label: '12 месяцев', value: '360' }
	];

	const rows = sortedData.map((item, index) => (
		<Table.Tr key={index}>
			<Table.Td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Avatar src={item.user.photo} alt={item.user.firstName} />
				<span>
					{item.user.firstName} {item.user.lastName}
				</span>
			</Table.Td>
			<Table.Td>{item.user.email}</Table.Td>
			<Table.Td>{item.course.title}</Table.Td>
			<Table.Td>{item.group.title}</Table.Td>
			<Table.Td>{item.startDate.replace(/(\s?\+\d{2}:\d{2})$/, '')}</Table.Td>
			<Table.Td>{item.endDate.replace(/(\s?\+\d{2}:\d{2})$/, '')}</Table.Td>
			<Table.Td>{item.daysRemaining}</Table.Td>
			<Table.Td>{item.status === 'ACTIVE' ? 'Активно' : 'Истек'}</Table.Td>
			<Table.Td>
				<Button
					variant="outline"
					size="xs"
					rightSection={<IconEdit size={18} />}
					onClick={() => {
						setIsOpenEditModal(true);
						setEditingId(item.id);
					}}
				>
					Изменить
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			<section className={scss.ContractItems}>
				<div className={scss.container}>
					<div className={scss.content}>
						<CustomTitle
							title="Список"
							spanRight="контрактов"
							color="#000000"
						/>
						<div className={scss.controls}>
							<div className={scss.filters}>
								<Select
									placeholder="Выберите курс"
									data={courseTitles}
									value={courseTitle}
									onChange={(value) =>
										setCourseTitle(value !== null ? String(value) : '')
									}
									allowDeselect={true}
								/>
								<Select
									placeholder="Выберите группу"
									data={groupTitles}
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
										debounceUserSearch(value);
									}}
									rightSectionPointerEvents="all"
									rightSection={
										<CloseButton
											aria-label="Clear input"
											onClick={() => {
												setSearchTerm('');
												debounceUserSearch('');
											}}
											style={{ display: searchUser ? undefined : 'none' }}
										/>
									}
								/>
							</div>
							<div className={scss.buttons}>
								<Button
									onClick={() => setIsOpenCreateModal(true)}
									size="xs"
									rightSection={<FiPlus className={scss.icon} />}
								>
									Заключить контракт
								</Button>
							</div>
						</div>
						{isLoadingCourseSubscription && <Loader />}
						<ScrollArea
							className={scss.ScrollArea}
							h={scrollAreaHeight}
							offsetScrollbars={false}
							scrollbarSize={5}
							scrollHideDelay={250}
						>
							<Box w={1565}>
								{courseSubscriptionData?.results?.length ? (
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
												<Table.Th className={scss.tableHead}>
													<UnstyledButton onClick={() => handleSort('email')}>
														<Group align="center">
															<span>Почта</span>
															<Center>
																{sortBy === 'email' ? (
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
													<span>Курс</span>
												</Table.Th>
												<Table.Th className={scss.tableHead}>
													<span>Группа</span>
												</Table.Th>
												<Table.Th className={scss.tableHead}>
													<UnstyledButton
														onClick={() => handleSort('startDate')}
													>
														<Group align="center">
															<span>Дата начала</span>
															<Center>
																{sortBy === 'startDate' ? (
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
													<UnstyledButton onClick={() => handleSort('endDate')}>
														<Group align="center">
															<span>Дата окончания</span>
															<Center>
																{sortBy === 'endDate' ? (
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
														onClick={() => handleSort('daysRemaining')}
													>
														<Group align="center">
															<span>Осталось</span>
															<Center>
																{sortBy === 'daysRemaining' ? (
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
													<UnstyledButton onClick={() => handleSort('status')}>
														<Group align="center">
															<span>Статус</span>
															<Center>
																{sortBy === 'status' ? (
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
													<span>Действия</span>
												</Table.Th>
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
										value={page}
										onChange={(value) => setPage(value)}
									/>
								</div>
								<div className={scss.right}>
									<Select
										size="xs"
										placeholder="Выберите"
										data={['10', '15', '25', '50', '100']}
										defaultValue={String(limit)}
										onChange={(value) => setLimit(Number(value))}
										allowDeselect={false}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Модальное окно для создания нового контракта */}
			<Modal
				opened={isOpenCreateModal}
				onClose={() => setIsOpenCreateModal(false)}
				title="Заключение нового контракта"
				centered
			>
				<div className={scss.create_subscription}>
					<form
						onSubmit={handleCreateSubmit(handleCreate)}
						className={scss.form}
					>
						<Select
							placeholder="Выберите пользователя"
							data={courseIdFirstNameLastName.map((item) => ({
								value: String(item.id),
								label: `${item.firstName} ${item.lastName}`
							}))}
							onChange={(value) => {
								setValueCreate('userId', Number(value));
							}}
							allowDeselect={true}
							searchable
						/>
						<Select
							placeholder="Выберите курс"
							data={courseIdTitles.map((item) => ({
								value: String(item.id),
								label: item.title
							}))}
							onChange={(value) => {
								setValueCreate('courseId', Number(value));
							}}
							allowDeselect={true}
							searchable
						/>
						<Select
							placeholder="Выберите группу"
							data={groupIdTitles.map((item) => ({
								value: String(item.id),
								label: item.title
							}))}
							onChange={(value) => {
								setValueCreate('groupId', Number(value));
							}}
							allowDeselect={true}
							searchable
						/>
						<Select
							data={months}
							defaultValue="30"
							onChange={(value) => {
								setValueCreate('endDate', Number(value));
							}}
							allowDeselect={false}
						/>
						<Button
							className={scss.button}
							loading={isSubmittingCreate}
							loaderProps={{ type: 'dots' }}
							type="submit"
							variant="filled"
						>
							Заключить
						</Button>
					</form>
				</div>
			</Modal>

			{/* Модальное окно для редактирования контракта */}
			<Modal
				opened={isOpenEditModal}
				onClose={() => setIsOpenEditModal(false)}
				title="Редактирование контракта"
				centered
			>
				<div className={scss.edit_subscription}>
					<form onSubmit={handleEditSubmit(handleEdit)} className={scss.form}>
						<Select
							placeholder="Выберите"
							data={months}
							defaultValue="30"
							onChange={(value) => {
								setValueEdit('endDate', Number(value));
							}}
							allowDeselect={false}
						/>
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

export default ContractItems;
