import { create } from 'zustand';

interface IModalStore {
	startLesson: {
		title: string;
	};
	isOpenFeedback: boolean;

	setStartLesson: (startLesson: { title: string }) => void;
	setIsOpenFeedback: (value: boolean) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
	startLesson: { title: '' },
	isOpenFeedback: false,

	setStartLesson: (value) => set({ startLesson: value }),
	setIsOpenFeedback: (value) => set({ isOpenFeedback: value })
}));
