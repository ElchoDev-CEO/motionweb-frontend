namespace COURSE {
	// course
	type CreateCourseRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			description: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateCourseReq = {
		title: string;
		description: string;
		photo: string;
	};
	type GetCourseParticipantRes = {
		success: boolean;
		message: string;
		results: Array<{
			id: number;
			title: string;
			description: string;
			photo: string;
			status:
				| 'subscription-not-found'
				| 'subscription-has-expired'
				| 'already-have-subscription';
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetCourseParticipantReq = void;
	type UpdateCourseRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			description: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateCourseReq = {
		id: number;
		data: {
			title?: string;
			description?: string;
			photo?: string;
		};
	};
	type DeleteCourseRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			description: string;
			photo: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type DeleteCourseReq = number;

	// call-room
	type CreateCallRoomRes = {
		success: boolean;
		results: {
			id: number;
			courseId: number;
			roomId: string;
			isActive: boolean;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateCallRoomReq = {
		courseId: number;
		roomId: string;
	};
	type GetCallRoomRes = {
		success: boolean;
		results: {
			id: number;
			courseId: number;
			roomId: string;
			isActive: boolean;
			createdAt: string;
			updatedAt: string;
		};
	};
	type GetCallRoomReq = string;
	type DeleteCallRoomRes = {
		success: boolean;
		results: {
			isActive: boolean;
			message: string;
		};
	};
	type DeleteCallRoomReq = number;

	// structure
	type CreateStructureRes = {
		success: boolean;
		results: {
			id: number;
			courseId: number;
			title: string;
			createdAt: string;
			updatedAt: string;
			order: number;
			slug: any;
		};
	};
	type CreateStructureReq = {
		courseId: number;
		title: string;
	};
	type GetStructureCourseIdRes = {
		success: boolean;
		results: Array<{
			id: number;
			courseId: number;
			title: string;
			createdAt: string;
			updatedAt: string;
			order: number;
			slug: any;
		}>;
	};
	type GetStructureCourseIdReq = string;
	type UpdateStructureRes = {
		success: boolean;
		results: {
			id: number;
			courseId: number;
			title: string;
			createdAt: string;
			updatedAt: string;
			order: number;
			slug: any;
		};
	};
	type UpdateStructureReq = {
		id: number;
		data: {
			title: string;
		};
	};
	type DeleteStructureRes = {
		success: boolean;
		results: any;
	};
	type DeleteStructureReq = number;

	// section
	type CreateSectionRes = {
		success: boolean;
		results: {
			id: number;
			structureId: number;
			title: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateSectionReq = {
		structureId: number;
		title: string;
	};
	type GetSectionByStructureIdRes = {
		success: boolean;
		results: Array<{
			id: number;
			structureId: number;
			title: string;
			isUnlocked: boolean;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetSectionByStructureIdReq = string;
	type UpdateSectionRes = {
		success: boolean;
		results: {
			id: number;
			structureId: number;
			title: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateSectionReq = {
		id: number;
		data: {
			title: string;
		};
	};
	type DeleteSectionRes = {
		success: boolean;
		results: any;
	};
	type DeleteSectionReq = number;

	// section-check-level
	type GetSectionCheckLevelGroupUsersRes = {
		success: boolean;
		results: User[];
	};
	type GetSectionCheckLevelGroupUsersReq = number;
	type GetSectionCheckLevelRes = {
		success: boolean;
		results: Array<{
			id: number;
			userId: number;
			sectionId: number;
			createdAt: string;
			updatedAt: string;
			user: User;
		}>;
	};
	type GetSectionCheckLevelReq = number;
	type UpdateSectionCheckLevelRes = {
		success: boolean;
		results: {
			count: number;
		};
	};
	type UpdateSectionCheckLevelReq = {
		sectionId: number;
		data: {
			userIds: Array<number>;
		};
	};

	// lesson
	type CreateLessonRes = {
		success: boolean;
		results: {
			id: number;
			sectionId: number;
			type: string;
			title: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateLessonReq = {
		sectionId: number;
		type: string;
		title: string;
	};
	type GetLessonBySectionIdRes = {
		success: boolean;
		results: Array<{
			id: number;
			sectionId: number;
			type: string;
			title: string;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetLessonBySectionIdReq = string;
	type UpdateLessonRes = {
		success: boolean;
		results: {
			id: number;
			sectionId: number;
			type: string;
			title: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateLessonReq = {
		id: number;
		data: {
			type: string;
			title: string;
		};
	};
	type DeleteLessonRes = {
		success: boolean;
		results: any;
	};
	type DeleteLessonReq = number;

	// lesson-content
	type CreateLessonContentRes = {
		success: boolean;
		results: {
			id: number;
			lessonId: number;
			title: string;
			description: string;
			videoUrl: string;
			body: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateLessonContentReq = {
		lessonId: number;
		title: string;
		description: string;
		videoUrl: string;
		body: string;
	};
	type GetLessonContentByLessonIdRes = {
		success: boolean;
		results: {
			id: number;
			lessonId: number;
			title: string;
			description: string;
			videoUrl: string;
			body: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type GetLessonContentByLessonIdReq = string;
	type UpdateLessonContentRes = {
		success: boolean;
		results: {
			id: number;
			lessonId: number;
			title: string;
			description: string;
			videoUrl: string;
			body: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateLessonContentReq = {
		id: number;
		data: {
			title?: string;
			description?: string;
			videoUrl?: string;
			body?: string;
		};
	};

	// lesson-homework
	type CreateLessonHomeWorkRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			lessonId: number;
			name: string;
			link: string;
			mark: number;
			verified: boolean;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateLessonHomeWorkReq = {
		lessonId: number;
		name: string;
		link: string;
	};
	type GetLessonTypeRes = {
		success: boolean;
		results: {
			type: string;
		};
	};
	type GetLessonTypeReq = number;
	type GetLessonHomeworkRes = {
		success: boolean;
		current_page: number;
		per_page: number;
		total_pages: number;
		total_items: number;
		results: Array<{
			id: number;
			userId: number;
			lessonId: number;
			name: string;
			link: string;
			mark: number;
			verified: boolean;
			createdAt: string;
			updatedAt: string;
			user: {
				id: number;
				firstName: string;
				lastName: string;
				email: string;
				photo: string;
				phone: string;
				participantGroup: Array<{
					group: {
						id: number;
						title: string;
					};
				}>;
			};
		}>;
	};
	type GetLessonHomeworkReq = {
		lessonId: number;
		params: {
			search?: string;
			groupTitle?: string;
			current_page?: number;
			per_page?: number;
		};
	};
	type GetLessonHomeworkMyRes = {
		success: boolean;
		results: Array<{
			id: number;
			userId: number;
			lessonId: number;
			name: string;
			link: string;
			mark: number;
			verified: boolean;
			createdAt: string;
			updatedAt: string;
			user: User;
			lesson: {
				type: string;
			};
		}>;
	};
	type GetLessonHomeworkMyReq = number;
	type UpdateLessonHomeWorkRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			lessonId: number;
			name: string;
			link: string;
			mark: number;
			verified: boolean;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateLessonHomeWorkReq = {
		id: number;
		data: {
			mark?: number;
			verified: boolean;
		};
	};
	type DeleteLessonHomeWorkRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			lessonId: number;
			name: string;
			link: string;
			mark: number;
			verified: boolean;
			createdAt: string;
			updatedAt: string;
		};
	};
	type DeleteLessonHomeWorkReq = number;

	// course-sync-groups
	type GetCourseSyncGroupRes = {
		success: boolean;
		results: Array<{
			id: number;
			courseId: number;
			groupId: number;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetCourseSyncGroupReq = number;
	type UpdateCourseSyncGroupRes = {
		success: boolean;
		results: {
			count: number;
		};
	};
	type UpdateCourseSyncGroupReq = {
		courseId: number;
		data: {
			groupIds: Array<number>;
		};
	};

	// course-sync-telegram
	type GetCourseSyncTelegramRes = {
		success: boolean;
		results: Array<{
			id: number;
			courseId: number;
			telegramGroupInfoId: string;
			joinedAt: string;
			telegramGroupInfo: {
				id: string;
				chatId: string;
				name: string;
				photoUrl: string;
				joinedAt: string;
			};
		}>;
	};
	type GetCourseSyncTelegramReq = number;
	type UpdateCourseSyncTelegramRes = {
		success: boolean;
		results: {
			count: number;
		};
	};
	type UpdateCourseSyncTelegramReq = {
		courseId: number;
		data: {
			telegramGroupInfoIds: Array<string>;
		};
	};

	// subscription
	type CreateCourseSubscriptionRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			courseId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreateCourseSubscriptionReq = {
		courseId: number;
		userId: number;
		endDate: number;
	};
	type GetCourseSubscriptionQueryRes = {
		success: boolean;
		current_page: number;
		per_page: number;
		total_pages: number;
		total_items: number;
		results: Array<{
			id: number;
			userId: number;
			courseId: number;
			groupId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
			user: {
				firstName: string;
				lastName: string;
				email: string;
				photo: string;
				phone: any;
			};
			course: {
				title: string;
				photo: string;
			};
			group: {
				title: string;
				photo: string;
			};
			status: string;
			daysRemaining: number;
		}>;
	};
	type GetCourseSubscriptionQueryReq = {
		current_page?: number;
		per_page?: number;
		sortOrder?: string;
		courseTitle?: string;
		groupTitle?: string;
		user?: string;
	};
	type GetCourseSubscriptionRes = {
		success: boolean;
		results: Array<{
			id: number;
			userId: number;
			courseId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
			user: User;
			status: string;
		}>;
	};
	type GetCourseSubscriptionReq = number;
	type GetCourseSubscriptionUserByIdRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			courseId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
			user: User;
			status: string;
		};
	};
	type GetCourseSubscriptionUserByIdReq = {
		courseId: number;
		userId: number;
	};
	type UpdateCourseSubscriptionByIdRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			courseId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdateCourseSubscriptionByIdReq = {
		id: number;
		data: {
			endDate: number;
		};
	};
	type DeleteCourseSubscriptionByIdRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			courseId: number;
			startDate: string;
			endDate: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type DeleteCourseSubscriptionByIdReq = number;
}
