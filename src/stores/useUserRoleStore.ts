import { create } from 'zustand';

interface IUserRoleStore {
	isAdminOrMentor: boolean;
	isManager: boolean;

	setIsAdminOrMentorRole: (role: string) => void;
	setIsManagerRole: (role: string) => void;
}

export const useUserRoleStore = create<IUserRoleStore>((set) => ({
	isAdminOrMentor: false,
	isManager: false,

	setIsAdminOrMentorRole: (role) =>
		set({ isAdminOrMentor: role === 'ADMIN' || role === 'MENTOR' }),
	setIsManagerRole: (role) => set({ isManager: role === 'MANAGER' })
}));
