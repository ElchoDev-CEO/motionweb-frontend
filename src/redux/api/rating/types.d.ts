namespace RATING {
	// rating
	type GetRatingRes = {
		status: boolean;
		results: Array<{
			id: number;
			userId: number;
			totalMark: number;
			createdAt: string;
			updatedAt: string;
			user: User;
		}>;
	};
	type GetRatingReq = void;
}
