import { create } from 'zustand';

interface IHeaderStore {
	isOpen: boolean;
	isOpenDropDownMenuCourses: boolean;
	isOpenDropDownMenuResources: boolean;

	setIsOpen: (isOpen: boolean) => void;
	setIsOpenDropDownMenuCourses: (isOpenDropDownMenuCourses: boolean) => void;
	setIsOpenDropDownMenuResources: (
		isOpenDropDownMenuResources: boolean
	) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
	isOpen: false,
	isOpenDropDownMenuCourses: false,
	isOpenDropDownMenuResources: false,

	setIsOpen: (value) => set({ isOpen: value }),
	setIsOpenDropDownMenuCourses: (isOpenDropDownMenuCourses) =>
		set({ isOpenDropDownMenuCourses: isOpenDropDownMenuCourses }),
	setIsOpenDropDownMenuResources: (isOpenDropDownMenuResources) =>
		set({ isOpenDropDownMenuResources: isOpenDropDownMenuResources })
}));
