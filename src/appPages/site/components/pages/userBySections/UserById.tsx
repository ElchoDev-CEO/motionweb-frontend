'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import scss from './UserById.module.scss';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { Button, TextInput, NativeSelect, Skeleton } from '@mantine/core';
import { debounce } from 'throttle-debounce';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/user';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { IconChevronLeft } from '@tabler/icons-react';

const UserById: FC = () => {
	const { userId } = useParams();
	const router = useRouter();
	const { isEdit } = useEditControlStore();
	const { isAdminOrMentor, isManager } = useUserRoleStore();
	const { data: session } = useGetUserQuery(Number(userId));
	const [updateUserMutation] = useUpdateUserMutation();

	const [isLoadingBackground, setIsLoadingBackground] =
		useState<boolean>(false);
	const [selectedPhoto, setSelectedPhoto] = useState<string>('');
	const [selectedBackgroundImage, setSelectedBackgroundImage] =
		useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
	const [tempFirstName, setTempFirstName] = useState<string>('');
	const [tempLastName, setTempLastName] = useState<string>('');
	const [tempEmail, setTempEmail] = useState<string>('');
	const [tempUsername, setTempUsername] = useState<string>('');
	const [tempPhone, setTempPhone] = useState<string>('');

	const handleUpdateUser = useCallback(
		debounce(1000, async (field: string, value: string) => {
			await updateUserMutation({
				id: Number(userId),
				data: { [field]: value }
			});
		}),
		[userId, updateUserMutation]
	);

	const handleChangeUser = (field: string, value: string) => {
		handleUpdateUser(field, value);
	};

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRole = e.target.value as
			| 'ADMIN'
			| 'MENTOR'
			| 'MANAGER'
			| 'STUDENT';
		setSelectedRole(newRole);
		handleUpdateUser('role', newRole);
	};

	useEffect(() => {
		if (session) {
			const {
				firstName,
				lastName,
				email,
				username,
				phone,
				photo,
				backgroundImage,
				role
			} = session.results;
			setTempFirstName(firstName || '');
			setTempLastName(lastName || '');
			setTempEmail(email || '');
			setTempUsername(username || '');
			setTempPhone(phone || '');
			setSelectedPhoto(photo || '');
			setSelectedBackgroundImage(backgroundImage || '');
			setSelectedRole(role || '');
		}
	}, [session]);

	return (
		<section className={scss.UserById}>
			<div className="container">
				<div className={scss.content}>
					<h1 className={scss.title}>
						Профиль <span>пользователя</span>
					</h1>
					<Button
						onClick={() => router.back()}
						leftSection={<IconChevronLeft size={18} />}
					>
						Назад
					</Button>
					<div className={scss.profile}>
						<div className={scss.top}>
							<Skeleton className={scss.skeleton} visible={isLoadingBackground}>
								<img
									className={scss.backgroundImage}
									src={selectedBackgroundImage || '/bg-default.png'}
									onLoad={() => setIsLoadingBackground(false)}
									alt="Фон"
								/>
							</Skeleton>
						</div>
						<div className={scss.bottom}>
							<img
								className={scss.avatar}
								src={selectedPhoto || '/avatar-default.jpeg'}
								alt={`${tempFirstName} ${tempLastName}`}
								width={150}
								height={150}
							/>
							<div className={scss.userInfo}>
								<TextInput
									label="Имя"
									value={tempFirstName}
									onChange={(e) =>
										handleChangeUser('firstName', e.target.value)
									}
									disabled={!isEdit}
								/>
								<TextInput
									label="Фамилия"
									value={tempLastName}
									onChange={(e) => handleChangeUser('lastName', e.target.value)}
									disabled={!isEdit}
								/>
								<TextInput label="Email" value={tempEmail} disabled />
								<NativeSelect
									label="Роль"
									data={[
										{ value: 'ADMIN', label: 'Админ' },
										{ value: 'MANAGER', label: 'Менеджер' },
										{ value: 'MENTOR', label: 'Ментор' },
										{ value: 'STUDENT', label: 'Студент' }
									]}
									value={selectedRole}
									onChange={handleRoleChange}
									disabled={!isEdit}
								/>
								<TextInput
									label="Имя пользователя"
									value={tempUsername}
									onChange={(e) => handleChangeUser('username', e.target.value)}
									disabled={!isEdit}
								/>
								{(isAdminOrMentor || isManager) && (
									<TextInput
										label="Номер телефона"
										value={tempPhone}
										onChange={(e) => handleChangeUser('phone', e.target.value)}
										disabled={!isEdit}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserById;
