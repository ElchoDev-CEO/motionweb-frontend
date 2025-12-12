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
import { useGetGroupAllQuery } from '@/redux/api/group';
import { useGetCourseSyncGroupQuery } from '@/redux/api/course';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '../../ui/loader/Loader';

interface ISearchableMultiSelectCourse {
	courseId: number;
}

const SearchableMultiSelectCourse: FC<ISearchableMultiSelectCourse> = ({
	courseId
}) => {
	const { data: groupData, isLoading } = useGetGroupAllQuery();
	const { data: courseSyncGroupData } = useGetCourseSyncGroupQuery(courseId, {
		skip: !courseId
	});

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
	});

	const [search, setSearch] = useState('');
	const { multiSelectValue, setMultiSelectValue } = useMultiSelectStore();

	useEffect(() => {
		if (courseSyncGroupData?.results) {
			setMultiSelectValue(() =>
				courseSyncGroupData!.results!.map((item) => item.groupId!)
			);
		}
	}, [courseSyncGroupData]);

	const handleValueSelect = (id: number) =>
		setMultiSelectValue((current) =>
			current.includes(id) ? current.filter((v) => v !== id) : [...current, id]
		);

	const handleValueRemove = (id: number) =>
		setMultiSelectValue((current) => current.filter((v) => v !== id));

	const values = multiSelectValue.map((id) => {
		const group = groupData?.results.find((item) => item.id === id);
		return (
			<Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
				{group?.title}
			</Pill>
		);
	});

	if (isLoading) return <Loader />;

	const options = groupData?.results
		.filter((item) =>
			item.title.toLowerCase().includes(search.trim().toLowerCase())
		)
		.map((item) => (
			<Combobox.Option
				value={item.id.toString()}
				key={item.id}
				active={multiSelectValue.includes(item.id)}
			>
				<Group gap="sm">
					{multiSelectValue.includes(item.id) ? <CheckIcon size={12} /> : null}
					<span>{item.title}</span>
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
								placeholder="Подключить группы..."
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

export default SearchableMultiSelectCourse;
