import { create } from 'zustand';

interface IMultiSelectStore {
	multiSelectValue: number[];
	multiSelectValueTelegram: string[];
	multiSelectValueSectionCheckLevel: number[];

	setMultiSelectValue: (updater: (current: number[]) => number[]) => void;
	setMultiSelectValueTelegram: (
		updater: (current: string[]) => string[]
	) => void;
	setMultiSelectValueSectionCheckLevel: (
		updater: (current: number[]) => number[]
	) => void;
}

export const useMultiSelectStore = create<IMultiSelectStore>((set) => ({
	multiSelectValue: [],
	multiSelectValueTelegram: [],
	multiSelectValueSectionCheckLevel: [],

	setMultiSelectValue: (updater) =>
		set((state) => ({ multiSelectValue: updater(state.multiSelectValue) })),
	setMultiSelectValueTelegram: (updater) =>
		set((state) => ({
			multiSelectValueTelegram: updater(state.multiSelectValueTelegram)
		})),
	setMultiSelectValueSectionCheckLevel: (updater) =>
		set((state) => ({
			multiSelectValueSectionCheckLevel: updater(
				state.multiSelectValueSectionCheckLevel
			)
		}))
}));
