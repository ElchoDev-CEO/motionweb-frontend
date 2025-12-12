'use client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import scss from './GroupById.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import { useParams } from 'next/navigation';
import { useGetGroupSyncStudentQuery } from '@/redux/api/group';
import {
	Avatar,
	Box,
	Button,
	Center,
	CloseButton,
	Group,
	Input,
	ScrollArea,
	Table,
	UnstyledButton
} from '@mantine/core';
import {
	IconChevronDown,
	IconChevronRight,
	IconChevronUp,
	IconSelector
} from '@tabler/icons-react';
import CustomTitle from '@/ui/title/CustomTitle';
import { debounce } from 'throttle-debounce';

type SortableFields = 'firstName&lastName' | 'email' | 'joinedAt';

const GroupById: FC = () => {
	const { groupId } = useParams();
	const router = useRouter();
	const [searchUser, setSearchUser] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [limit, setLimit] = useState<number>(100);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number | null>(null);
	const [sortBy, setSortBy] = useState<SortableFields | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);

	const { data: studentData } = useGetGroupSyncStudentQuery({
		groupId: Number(groupId),
		user: searchUser || undefined
	});

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
		if (!studentData?.results) return [];
		const sorted = [...studentData.results].sort((a, b) => {
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

			// Сортировка по joinedAt
			if (sortBy === 'joinedAt') {
				const startDateA = new Date(a.joinedAt);
				const startDateB = new Date(b.joinedAt);
				return sortDirection === 'asc'
					? startDateA.getTime() - startDateB.getTime()
					: startDateB.getTime() - startDateA.getTime();
			}

			return 0;
		});
		return sorted;
	}, [studentData, sortBy, sortDirection]);

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
				paddingAndMargins +
				250;
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
			<Table.Td>{item.user.email}</Table.Td>
			<Table.Td>{item.joinedAt.replace(/(\s?\+\d{2}:\d{2})$/, '')}</Table.Td>
			<Table.Td>
				<Button
					variant="outline"
					size="xs"
					rightSection={<IconChevronRight size={18} />}
					onClick={() => router.push(`/users/${item.userId}`)}
				>
					Подробнее
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<section className={scss.GroupById}>
			<div className="container">
				<div className={scss.content}>
					<CustomTitle
						title="Группа:"
						spanRight={studentData?.group.title}
						color="#000000"
					/>
					<div className={scss.controls}>
						<div className={scss.filters}>
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
							{/* <Button
								onClick={() => setIsOpenCreateModal(true)}
								size="xs"
								rightSection={<FiPlus className={scss.icon} />}
							>
								Заключить контракт
							</Button> */}
						</div>
					</div>
					<ScrollArea
						className={scss.ScrollArea}
						h={scrollAreaHeight}
						offsetScrollbars={false}
						scrollbarSize={5}
						scrollHideDelay={250}
					>
						<Box w={1257}>
							{studentData?.results?.length ? (
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
												<UnstyledButton onClick={() => handleSort('joinedAt')}>
													<Group align="center">
														<span>Дата подключения</span>
														<Center>
															{sortBy === 'joinedAt' ? (
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
				</div>
			</div>
		</section>
	);
};

export default GroupById;
