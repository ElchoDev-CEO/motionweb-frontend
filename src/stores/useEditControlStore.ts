import { create } from 'zustand';

interface IAdminControlStore {
	isEdit: boolean;

	setIsEdit: (value: boolean) => void;
}

export const useEditControlStore = create<IAdminControlStore>((set) => ({
	isEdit: false,

	setIsEdit: (value) => set({ isEdit: value })
}));
