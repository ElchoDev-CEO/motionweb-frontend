namespace FEEDBACK {
	type CheckIsFeedbackRes = {
		success: boolean;
		results: {
			isMoreThanSevenDays: boolean;
		};
	};
	type CheckIsFeedbackReq = void;

	type GetAllFeedbackRes = {
		success: boolean;
		results: {
			success: boolean;
			results: Array<{
				id: number;
				userId: number;
				rate: number;
				comment: string;
				createdAt: string;
				updatedAt: string;
			}>;
		};
	};
	type GetAllFeedbackReq = void;

	type SendFeedbackRes = {
		success: boolean;
		results: {
			success: boolean;
			results: {
				id: number;
				userId: number;
				rate: number;
				comment: string;
				createdAt: string;
				updatedAt: string;
			};
		};
	};
	type SendFeedbackReq = {
		rate: number;
		comment: string;
	};

	type GetFeedbackLessonRes = {
		success: boolean;
		results: Array<{
			id: number;
			userId: number;
			user: User;
			lessonId: number;
			comment: string;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetFeedbackLessonReq = number;
	type SendFeedbackLessonRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			lessonId: number;
			comment: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type SendFeedbackLessonReq = {
		lessonId: number;
		comment: string;
	};
}
