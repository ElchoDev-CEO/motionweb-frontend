import { create } from 'zustand';

interface IAccordionStore {
	activeSectionItem: number | null;

	setActiveSectionItem: (value: number | null) => void;
}

export const useAccordionStore = create<IAccordionStore>((set) => ({
	activeSectionItem: null,

	setActiveSectionItem: (value) => set({ activeSectionItem: value })
}));
