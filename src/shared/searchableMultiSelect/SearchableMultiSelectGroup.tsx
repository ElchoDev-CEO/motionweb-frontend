'use client';
import { FC, useEffect, useState } from 'react';
import {
	CheckIcon,
	Combobox,
	Group,
	Pill,
	PillsInput,
	useCombobox
} from '@mantine/core';
import { useGetGroupSyncStudentQuery } from '@/redux/api/group';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '../../ui/loader/Loader';
import { useGetUserAllQuery } from '@/redux/api/user';

interface ISearchableMultiSelectGroup {
	groupId: number;
}

const SearchableMultiSelectGroup: FC<ISearchableMultiSelectGroup> = ({
	groupId
}) => {
	const { data: userData, isLoading } = useGetUserAllQuery({});
	const { data: groupSyncUserData } = useGetGroupSyncStudentQuery(
		{
			groupId: Number(groupId)
		},
		{
			skip: !groupId
		}
	);

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
	});

	const [search, setSearch] = useState('');
	const { multiSelectValue, setMultiSelectValue } = useMultiSelectStore();

	useEffect(() => {
		if (groupSyncUserData?.results) {
			setMultiSelectValue(() =>
				groupSyncUserData!.results!.map((item) => item.userId!)
			);
		}
	}, [groupSyncUserData]);

	const handleValueSelect = (id: number) =>
		setMultiSelectValue((current) =>
			current.includes(id) ? current.filter((v) => v !== id) : [...current, id]
		);

	const handleValueRemove = (id: number) =>
		setMultiSelectValue((current) => current.filter((v) => v !== id));

	const values = multiSelectValue.map((id) => {
		const user = userData?.results.find((item) => item.id === id);
		return (
			<Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
				{user?.firstName} {user?.lastName}
			</Pill>
		);
	});

	if (isLoading) return <Loader />;

	const options = userData?.results
		.filter((item) => {
			const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
			return fullName.includes(search.trim().toLowerCase());
		})
		.map((item) => (
			<Combobox.Option
				value={item.id!.toString()}
				key={item.id}
				active={multiSelectValue.includes(item.id!)}
			>
				<Group gap="sm">
					{multiSelectValue.includes(item.id!) ? <CheckIcon size={12} /> : null}
					<span>
						{item.firstName} {item.lastName}
					</span>
				</Group>
			</Combobox.Option>
		));

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => handleValueSelect(Number(val))}
			withinPortal={true}
		>
			<Combobox.DropdownTarget>
				<PillsInput onClick={() => combobox.openDropdown()}>
					<Pill.Group>
						{values}

						<Combobox.EventsTarget>
							<PillsInput.Field
								onFocus={() => combobox.openDropdown()}
								onBlur={() => combobox.closeDropdown()}
								value={search}
								placeholder="Подключить студентов..."
								onChange={(event) => {
									combobox.updateSelectedOptionIndex();
									setSearch(event.currentTarget.value);
								}}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && search.length === 0) {
										event.preventDefault();
										handleValueRemove(
											multiSelectValue[multiSelectValue.length - 1]
										);
									}
								}}
							/>
						</Combobox.EventsTarget>
					</Pill.Group>
				</PillsInput>
			</Combobox.DropdownTarget>

			<Combobox.Dropdown>
				<Combobox.Options
					style={{
						maxHeight: '250px',
						overflowY: 'auto'
					}}
				>
					{options!.length > 0 ? (
						options
					) : (
						<Combobox.Empty>Nothing found...</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

export default SearchableMultiSelectGroup;
