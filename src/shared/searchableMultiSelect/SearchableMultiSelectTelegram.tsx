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
import { useGetCourseSyncTelegramQuery } from '@/redux/api/course';
import { useGetTelegramGroupAllQuery } from '@/redux/api/telegram';
import { useMultiSelectStore } from '@/stores/useMultiSelectStore';
import Loader from '../../ui/loader/Loader';

interface ISearchableMultiSelectTelegram {
	courseId: number;
}

const SearchableMultiSelectTelegram: FC<ISearchableMultiSelectTelegram> = ({
	courseId
}) => {
	const { data: telegramGroupAllData, isLoading } =
		useGetTelegramGroupAllQuery();

	const { data: courseSyncUserData } = useGetCourseSyncTelegramQuery(courseId, {
		skip: !courseId
	});

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
	});

	const [search, setSearch] = useState('');
	const { multiSelectValueTelegram, setMultiSelectValueTelegram } =
		useMultiSelectStore();

	useEffect(() => {
		if (courseSyncUserData?.results) {
			setMultiSelectValueTelegram(() =>
				courseSyncUserData!.results!.map((item) => item.telegramGroupInfoId)
			);
		}
	}, [courseSyncUserData]);

	const handleValueSelect = (id: string) => {
		setMultiSelectValueTelegram((current) =>
			current.includes(id)
				? current.filter((v) => String(v) !== String(id))
				: [...current, String(id)]
		);
	};

	const handleValueRemove = (id: string) => {
		setMultiSelectValueTelegram((current) =>
			current.filter((v) => String(v) !== String(id))
		);
	};

	const values = multiSelectValueTelegram.map((id) => {
		const telegram = telegramGroupAllData?.results.find(
			(item) => String(item.id) === String(id)
		);
		return (
			<Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
				{telegram?.name}
			</Pill>
		);
	});

	if (isLoading) return <Loader />;

	const options = telegramGroupAllData?.results
		.filter((item) => {
			const fullName = `${item.name}`.toLowerCase();
			return fullName.includes(search.trim().toLowerCase());
		})
		.map((item) => (
			<Combobox.Option
				value={item.id!.toString()}
				key={item.id}
				active={multiSelectValueTelegram.includes(item.id!)}
			>
				<Group gap="sm">
					{multiSelectValueTelegram.includes(item.id!) ? (
						<CheckIcon size={12} />
					) : null}
					<span>{item.name}</span>
				</Group>
			</Combobox.Option>
		));

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => handleValueSelect(String(val))}
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
								placeholder="Подключить телеграмм группы..."
								onChange={(event) => {
									combobox.updateSelectedOptionIndex();
									setSearch(event.currentTarget.value);
								}}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && search.length === 0) {
										event.preventDefault();
										handleValueRemove(
											multiSelectValueTelegram[
												multiSelectValueTelegram.length - 1
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

export default SearchableMultiSelectTelegram;
