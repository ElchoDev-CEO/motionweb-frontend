namespace USER {
	// user
	type GetUserAllRes = {
		success: boolean;
		current_page: number;
		per_page: number;
		total_pages: number;
		total_items: number;
		results: User[];
	};
	type GetUserAllReq = {
		current_page?: number;
		per_page?: number;
		role?: string;
		sortOrder?: string;
		search?: string;
	};
	type GetUserRes = {
		success: boolean;
		results: User;
	};
	type GetUserReq = number;
	type UpdateUserRes = {
		success: boolean;
		results: User;
	};
	type UpdateUserReq = {
		id: number;
		data: {
			firstName?: string;
			lastName?: string;
			role?: string;
			username?: string;
			phone?: string;
		};
	};
}
