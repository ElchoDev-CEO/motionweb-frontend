namespace GROUP {
	// group
	type CreateGroupRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateGroupReq = {
		title: string;
		photo: string;
	};
	type GetGroupParticipantRes = {
		success: boolean;
		results: Array<{
			id: number;
			title: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetGroupParticipantReq = void;
	type UpdateGroupRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateGroupReq = {
		id: number;
		data: {
			title?: string;
			photo?: string;
		};
	};
	type DeleteGroupRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type DeleteGroupReq = number;

	// group-sync-student
	type GetGroupSyncStudentRes = {
		success: boolean;
		group: {
			title: string;
			photo: string;
		};
		results: Array<{
			id: number;
			userId: number;
			groupId: number;
			joinedAt: string;
			user: {
				firstName: string;
				lastName?: string;
				email: string;
				photo: string;
				phone: any;
			};
		}>;
	};

	type GetGroupSyncStudentReq = {
		groupId: number;
		user?: string;
	};
	type UpdateGroupSyncStudentRes = {
		success: boolean;
		results: {
			count: number;
		};
	};
	type UpdateGroupSyncStudentReq = {
		groupId: number;
		data: {
			userIds: Array<number>;
		};
	};
}
