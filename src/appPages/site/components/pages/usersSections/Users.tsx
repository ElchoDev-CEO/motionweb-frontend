'use client';
import { FC, useState, useMemo, useEffect, useCallback } from 'react';
import scss from './Users.module.scss';
import { debounce } from 'throttle-debounce';
import {
	NativeSelect,
	Table,
	TextInput,
	UnstyledButton,
	Group,
	Center,
	ScrollArea,
	Box,
	Button,
	Avatar,
	Input,
	CloseButton,
	Pagination,
	Select
} from '@mantine/core';
import { useGetUserAllQuery } from '@/redux/api/user';
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconChevronRight
} from '@tabler/icons-react';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { useRouter } from 'nextjs-toploader/app';
import { useGetMeQuery } from '@/redux/api/me';
import Loader from '@/ui/loader/Loader';
import CustomTitle from '@/ui/title/CustomTitle';

type SortableFields =
	| 'firstName&lastName'
	| 'username'
	| 'email'
	| 'phone'
	| 'role'
	| 'createdAt';

const Users: FC = () => {
	const router = useRouter();
	const [filterRole, setFilterRole] = useState<string>('ALL');
	const [searchUser, setSearchUser] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [limit, setLimit] = useState<number>(15);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [sortBy, setSortBy] = useState<SortableFields | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);
	const { isAdminOrMentor, isManager } = useUserRoleStore();

	const { data: session } = useGetMeQuery();
	const { data: userData, isLoading: isLoadingUser } = useGetUserAllQuery({
		current_page: page || undefined,
		per_page: limit || undefined,
		search: searchUser || undefined,
		role: filterRole && filterRole !== 'ALL' ? filterRole : undefined
	});

	const debounceUserSearch = useCallback(
		debounce(300, (value: string) => {
			setSearchUser(value);
		}),
		[]
	);

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.currentTarget.value !== filterRole) {
			setFilterRole(event.currentTarget.value);
		}
	};

	const handleSort = (field: SortableFields) => {
		if (sortBy === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortDirection('asc');
		}
	};

	const sortedData = useMemo(() => {
		if (!userData?.results) return [];
		const sorted = [...userData.results].sort((a, b) => {
			if (!sortBy) return 0;

			// Сортировка по пользователю (firstName и lastName)
			if (sortBy === 'firstName&lastName') {
				const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
				const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
				return sortDirection === 'asc'
					? nameA.localeCompare(nameB)
					: nameB.localeCompare(nameA);
			}

			// Сортировка по username
			if (sortBy === 'username') {
				const nameA = a.username.toLowerCase();
				const nameB = b.username.toLowerCase();
				return sortDirection === 'asc'
					? nameA.localeCompare(nameB)
					: nameB.localeCompare(nameA);
			}

			// Сортировка по role
			if (sortBy === 'role') {
				const roleA = a.role.toLowerCase();
				const roleB = b.role.toLowerCase();
				return sortDirection === 'asc'
					? roleA.localeCompare(roleB)
					: roleB.localeCompare(roleA);
			}

			// Сортировка по email
			if (sortBy === 'email') {
				const emailA = a.email.toLowerCase();
				const emailB = b.email.toLowerCase();
				return sortDirection === 'asc'
					? emailA.localeCompare(emailB)
					: emailB.localeCompare(emailA);
			}

			// Сортировка по createdAt
			if (sortBy === 'createdAt') {
				const startDateA = new Date(a.createdAt);
				const startDateB = new Date(b.createdAt);
				return sortDirection === 'asc'
					? startDateA.getTime() - startDateB.getTime()
					: startDateB.getTime() - startDateA.getTime();
			}

			return 0;
		});
		return sorted;
	}, [userData, sortBy, sortDirection]);

	useEffect(() => {
		if (userData) {
			setTotalPages(userData.total_pages);
		}
	}, [userData, page, limit]);

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

	const rows = sortedData.map((item) => (
		<Table.Tr
			key={item.id}
			style={{
				background: session?.results.email === item.email ? '#00000012' : ''
			}}
		>
			<Table.Td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Avatar src={item.photo} alt={item.firstName} />
				<span>
					{item.firstName} {item.lastName}
				</span>
			</Table.Td>
			<Table.Td>{item.username}</Table.Td>
			<Table.Td>{item.email}</Table.Td>
			{(isAdminOrMentor || isManager) && <Table.Td>{item.phone}</Table.Td>}
			<Table.Td>{item.role}</Table.Td>
			<Table.Td>{item.createdAt.replace(/(\s?\+\d{2}:\d{2})$/, '')}</Table.Td>
			<Table.Td>
				<Button
					variant="outline"
					size="xs"
					rightSection={<IconChevronRight size={18} />}
					onClick={() => router.push(`/users/${item.id}`)}
				>
					Подробнее
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<section className={scss.Users}>
			<div className={scss.container}>
				<div className={scss.content}>
					<CustomTitle
						title="Список"
						spanRight="пользователей"
						color="#000000"
					/>
					<div className={scss.controls}>
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
						<NativeSelect
							data={[
								{ value: 'ALL', label: 'Все пользователи' },
								{ value: 'ADMIN', label: 'Администраторы' },
								{ value: 'MANAGER', label: 'Менеджеры' },
								{ value: 'MENTOR', label: 'Менторы' },
								{ value: 'STUDENT', label: 'Студенты' }
							]}
							value={filterRole}
							onChange={handleRoleChange}
						/>
					</div>
					{isLoadingUser && <Loader />}
					<ScrollArea
						className={scss.ScrollArea}
						h={scrollAreaHeight}
						offsetScrollbars={false}
						scrollbarSize={5}
						scrollHideDelay={250}
					>
						<Box w={1300}>
							{userData?.results?.length ? (
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
												<UnstyledButton onClick={() => handleSort('username')}>
													<Group align="center">
														<span>Имя пользователя</span>
														<Center>
															{sortBy === 'username' ? (
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
												<span>Номер телефона</span>
											</Table.Th>
											<Table.Th className={scss.tableHead}>
												<span>Права</span>
											</Table.Th>
											<Table.Th className={scss.tableHead}>
												<UnstyledButton onClick={() => handleSort('createdAt')}>
													<Group align="center">
														<span>На платформе с</span>
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
	);
};

export default Users;
