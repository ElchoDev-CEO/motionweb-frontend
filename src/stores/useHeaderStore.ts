import { create } from 'zustand';

interface IHeaderStore {
	isOpen: boolean;
	isOpenDropDownMenuCourses: boolean;
	isOpenDropDownMenuResources: boolean;
	isOpenDropDownTranslate: boolean;

	setIsOpen: (isOpen: boolean) => void;
	setIsOpenDropDownMenuCourses: (isOpenDropDownMenuCourses: boolean) => void;
	setIsOpenDropDownMenuResources: (
		isOpenDropDownMenuResources: boolean
	) => void;
	setIsOpenDropDownTranslate: (isOpenDropDownTranslate: boolean) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
	isOpen: false,
	isOpenDropDownMenuCourses: false,
	isOpenDropDownMenuResources: false,
	isOpenDropDownTranslate: false,

	setIsOpen: (value) => set({ isOpen: value }),
	setIsOpenDropDownMenuCourses: (isOpenDropDownMenuCourses) =>
		set({ isOpenDropDownMenuCourses: isOpenDropDownMenuCourses }),
	setIsOpenDropDownMenuResources: (isOpenDropDownMenuResources) =>
		set({ isOpenDropDownMenuResources: isOpenDropDownMenuResources }),
	setIsOpenDropDownTranslate: (isOpenDropDownTranslate) =>
		set({ isOpenDropDownTranslate: isOpenDropDownTranslate })
}));
