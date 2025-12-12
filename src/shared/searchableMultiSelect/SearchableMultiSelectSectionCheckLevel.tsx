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
import {
	useGetSectionCheckLevelGroupUsersQuery,
	useGetSectionCheckLevelQuery
} from '@/redux/api/course';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '../../ui/loader/Loader';

interface ISearchableMultiSelectSectionCheckLevel {
	sectionId: number;
}

const SearchableMultiSelectSectionCheckLevel: FC<
	ISearchableMultiSelectSectionCheckLevel
> = ({ sectionId }) => {
	const { data: sectionCheckLevelGroupUsersData, isLoading } =
		useGetSectionCheckLevelGroupUsersQuery(sectionId, {
			skip: !sectionId
		});
	const { data: sectionCheckLevelData } = useGetSectionCheckLevelQuery(
		sectionId,
		{
			skip: !sectionId
		}
	);

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
	});

	const [search, setSearch] = useState('');
	const {
		multiSelectValueSectionCheckLevel,
		setMultiSelectValueSectionCheckLevel
	} = useMultiSelectStore();

	useEffect(() => {
		if (sectionCheckLevelData?.results) {
			setMultiSelectValueSectionCheckLevel(() =>
				sectionCheckLevelData!.results!.map((item) => item.userId)
			);
		}
	}, [sectionCheckLevelData]);

	const handleValueSelect = (id: number) => {
		setMultiSelectValueSectionCheckLevel((current) =>
			current.includes(id)
				? current.filter((v) => Number(v) !== Number(id))
				: [...current, Number(id)]
		);
	};

	const handleValueRemove = (id: number) => {
		setMultiSelectValueSectionCheckLevel((current) =>
			current.filter((v) => Number(v) !== Number(id))
		);
	};

	const values = multiSelectValueSectionCheckLevel.map((id) => {
		const sectionCheckLevel = sectionCheckLevelGroupUsersData?.results.find(
			(item) => Number(item.id) === Number(id)
		);
		return (
			<Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
				{sectionCheckLevel?.firstName} {sectionCheckLevel?.lastName}
			</Pill>
		);
	});
	console.log(values);

	if (isLoading) return <Loader />;

	const options = sectionCheckLevelGroupUsersData?.results
		.filter((item) => {
			const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
			return fullName.includes(search.trim().toLowerCase());
		})
		.map((item) => (
			<Combobox.Option
				value={item.id!.toString()}
				key={item.id}
				active={multiSelectValueSectionCheckLevel.includes(item.id!)}
			>
				<Group gap="sm">
					{multiSelectValueSectionCheckLevel.includes(item.id!) ? (
						<CheckIcon size={12} />
					) : null}
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
								placeholder="Студенты перешли к новой теме...."
								onChange={(event) => {
									combobox.updateSelectedOptionIndex();
									setSearch(event.currentTarget.value);
								}}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && search.length === 0) {
										event.preventDefault();
										handleValueRemove(
											multiSelectValueSectionCheckLevel[
												multiSelectValueSectionCheckLevel.length - 1
											]
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

export default SearchableMultiSelectSectionCheckLevel;
