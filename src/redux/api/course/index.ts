import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		//! course
		createCourse: build.mutation<
			COURSE.CreateCourseRes,
			COURSE.CreateCourseReq
		>({
			query: (data) => ({
				url: '/course/create-course',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['course']
		}),
		getCourseAll: build.query<
			COURSE.GetCourseParticipantRes,
			COURSE.GetCourseParticipantReq
		>({
			query: () => ({
				url: '/course/get-course-all',
				method: 'GET'
			}),
			providesTags: ['course']
		}),
		getCourseParticipant: build.query<
			COURSE.GetCourseParticipantRes,
			COURSE.GetCourseParticipantReq
		>({
			query: () => ({
				url: '/course/get-course',
				method: 'GET'
			}),
			providesTags: ['course']
		}),
		updateCourse: build.mutation<
			COURSE.UpdateCourseRes,
			COURSE.UpdateCourseReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-course/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['course']
		}),
		deleteCourse: build.mutation<
			COURSE.DeleteCourseRes,
			COURSE.DeleteCourseReq
		>({
			query: (id) => ({
				url: `/course/delete-course/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['course']
		}),

		//! call-room
		createCallRoom: build.mutation<
			COURSE.CreateCallRoomRes,
			COURSE.CreateCallRoomReq
		>({
			query: (data) => ({
				url: '/course/create-call-room',
				method: 'POST',
				body: data
			})
			// invalidatesTags: ['call-room']
		}),
		getCallRoom: build.query<COURSE.GetCallRoomRes, COURSE.GetCallRoomReq>({
			query: (courseId) => ({
				url: `/course/get-call-room/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['call-room']
		}),
		deleteCallRoom: build.mutation<
			COURSE.DeleteCallRoomRes,
			COURSE.DeleteCallRoomReq
		>({
			query: (id) => ({
				url: `/course/delete-call-room/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['call-room']
		}),

		//! structure
		createStructure: build.mutation<
			COURSE.CreateStructureRes,
			COURSE.CreateStructureReq
		>({
			query: (data) => ({
				url: '/course/create-structure',
				method: 'POST',
				body: data
			})
			// invalidatesTags: ['course']
		}),
		getStructureCourseId: build.query<
			COURSE.GetStructureCourseIdRes,
			COURSE.GetStructureCourseIdReq
		>({
			query: (courseId) => ({
				url: `/course/get-structure/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['course']
		}),
		updateStructureById: build.mutation<
			COURSE.UpdateStructureRes,
			COURSE.UpdateStructureReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-structure/${id}`,
				method: 'PATCH',
				body: data
			})
			// invalidatesTags: ['course']
		}),
		deleteStructureById: build.mutation<
			COURSE.DeleteStructureRes,
			COURSE.DeleteStructureReq
		>({
			query: (id) => ({
				url: `/course/delete-structure/${id}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['course']
		}),

		//! section
		createSection: build.mutation<
			COURSE.CreateSectionRes,
			COURSE.CreateSectionReq
		>({
			query: (data) => ({
				url: '/course/create-section',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['course']
		}),
		getSectionByStructureId: build.query<
			COURSE.GetSectionByStructureIdRes,
			COURSE.GetSectionByStructureIdReq
		>({
			query: (structureId) => ({
				url: `/course/get-section/${structureId}`,
				method: 'GET'
			}),
			providesTags: ['course', 'get-section-by-structureId']
		}),
		updateSectionById: build.mutation<
			COURSE.UpdateSectionRes,
			COURSE.UpdateSectionReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-section/${id}`,
				method: 'PATCH',
				body: data
			})
			// invalidatesTags: ['course']
		}),
		deleteSectionById: build.mutation<
			COURSE.DeleteSectionRes,
			COURSE.DeleteSectionReq
		>({
			query: (id) => ({
				url: `/course/delete-section/${id}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['course']
		}),

		//! section-check-level
		getSectionCheckLevelGroupUsers: build.query<
			COURSE.GetSectionCheckLevelGroupUsersRes,
			COURSE.GetSectionCheckLevelGroupUsersReq
		>({
			query: (sectionId) => ({
				url: `/course/get-section-check-level-group-users/${sectionId}`,
				method: 'GET'
			}),
			providesTags: ['get-section-check-level']
		}),
		getSectionCheckLevel: build.query<
			COURSE.GetSectionCheckLevelRes,
			COURSE.GetSectionCheckLevelReq
		>({
			query: (sectionId) => ({
				url: `/course/get-section-check-level/${sectionId}/users`,
				method: 'GET'
			}),
			providesTags: ['get-section-check-level']
		}),
		updateSectionCheckLevel: build.mutation<
			COURSE.UpdateSectionCheckLevelRes,
			COURSE.UpdateSectionCheckLevelReq
		>({
			query: ({ sectionId, data }) => ({
				url: `/course/update-section-check-level/${sectionId}/users`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: [
				'get-section-check-level',
				// 'get-section-by-structureId',
				'get-lesson-by-sectionId',
				'get-lesson-content-by-lessonId'
			]
		}),

		//! lesson
		createLesson: build.mutation<
			COURSE.CreateLessonRes,
			COURSE.CreateLessonReq
		>({
			query: (data) => ({
				url: '/course/create-lesson',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['course']
		}),
		getLessonBySectionId: build.query<
			COURSE.GetLessonBySectionIdRes,
			COURSE.GetLessonBySectionIdReq
		>({
			query: (sectionId) => ({
				url: `/course/get-lesson/${sectionId}`,
				method: 'GET'
			}),
			providesTags: ['course', 'get-lesson-by-sectionId']
		}),
		updateLessonById: build.mutation<
			COURSE.UpdateLessonRes,
			COURSE.UpdateLessonReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-lesson/${id}`,
				method: 'PATCH',
				body: data
			})
			// invalidatesTags: ['course']
		}),
		deleteLessonById: build.mutation<
			COURSE.DeleteLessonRes,
			COURSE.DeleteLessonReq
		>({
			query: (id) => ({
				url: `/course/delete-lesson/${id}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['course']
		}),

		//! lesson-content
		createLessonContent: build.mutation<
			COURSE.CreateLessonContentRes,
			COURSE.CreateLessonContentReq
		>({
			query: (data) => ({
				url: '/course/create-lesson-content',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['course']
		}),
		getLessonContentByLessonId: build.query<
			COURSE.GetLessonContentByLessonIdRes,
			COURSE.GetLessonContentByLessonIdReq
		>({
			query: (lessonId) => ({
				url: `/course/get-lesson-content/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['course', 'get-lesson-content-by-lessonId']
		}),
		updateLessonContentById: build.mutation<
			COURSE.UpdateLessonContentRes,
			COURSE.UpdateLessonContentReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-lesson-content/${id}`,
				method: 'PATCH',
				body: data
			})
			// invalidatesTags: ['course']
		}),

		//! lesson-homework
		createLessonHomework: build.mutation<
			COURSE.CreateLessonHomeWorkRes,
			COURSE.CreateLessonHomeWorkReq
		>({
			query: (data) => ({
				url: '/course/create-lesson-homework',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['lesson-homework']
		}),
		getLessonTypeByLessonId: build.query<
			COURSE.GetLessonTypeRes,
			COURSE.GetLessonTypeReq
		>({
			query: (lessonId) => ({
				url: `/course/get-lesson-type/${lessonId}`,
				method: 'GET'
			})
			// providesTags: ['lesson-homework']
		}),
		getLessonHomeworkByLessonId: build.query<
			COURSE.GetLessonHomeworkRes,
			COURSE.GetLessonHomeworkReq
		>({
			query: ({
				lessonId,
				params: { search, current_page, per_page, groupTitle }
			}) => ({
				url: `/course/get-lesson-homework/${lessonId}`,
				method: 'GET',
				params: {
					search,
					groupTitle,
					current_page,
					per_page
				}
			}),
			providesTags: ['lesson-homework']
		}),
		getLessonHomeworkByLessonIdMy: build.query<
			COURSE.GetLessonHomeworkMyRes,
			COURSE.GetLessonHomeworkMyReq
		>({
			query: (lessonId) => ({
				url: `/course/get-lesson-homework/${lessonId}/my`,
				method: 'GET'
			}),
			providesTags: ['lesson-homework']
		}),
		getLessonHomeworkByUserId: build.query<
			COURSE.GetLessonHomeworkMyRes,
			COURSE.GetLessonHomeworkMyRes
		>({
			query: (userId) => ({
				url: `/course/get-lesson-homework/${userId}/user`,
				method: 'GET'
			})
			// providesTags: ['lesson-homework']
		}),
		updateLessonHomeworkById: build.mutation<
			COURSE.UpdateLessonHomeWorkRes,
			COURSE.UpdateLessonHomeWorkReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-lesson-homework/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['lesson-homework']
		}),
		deleteLessonHomeworkById: build.mutation<
			COURSE.DeleteLessonHomeWorkRes,
			COURSE.DeleteLessonHomeWorkReq
		>({
			query: (id) => ({
				url: `/course/delete-lesson-homework/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['lesson-homework']
		}),

		//! course-sync-groups
		getCourseSyncGroup: build.query<
			COURSE.GetCourseSyncGroupRes,
			COURSE.GetCourseSyncGroupReq
		>({
			query: (courseId) => ({
				url: `/course/get-course-sync/${courseId}/groups`,
				method: 'GET'
			}),
			providesTags: ['course']
		}),
		updateCourseSyncGroup: build.mutation<
			COURSE.UpdateCourseSyncGroupRes,
			COURSE.UpdateCourseSyncGroupReq
		>({
			query: ({ courseId, data }) => ({
				url: `/course/update-course-sync/${courseId}/groups`,
				method: 'PATCH',
				body: data
			})
		}),

		//! course-sync-telegram
		getCourseSyncTelegram: build.query<
			COURSE.GetCourseSyncTelegramRes,
			COURSE.GetCourseSyncTelegramReq
		>({
			query: (courseId) => ({
				url: `/course/get-course-sync/${courseId}/telegram`,
				method: 'GET'
			}),
			providesTags: ['course']
		}),
		updateCourseSyncTelegram: build.mutation<
			COURSE.UpdateCourseSyncTelegramRes,
			COURSE.UpdateCourseSyncTelegramReq
		>({
			query: ({ courseId, data }) => ({
				url: `/course/update-course-sync/${courseId}/telegram`,
				method: 'PATCH',
				body: data
			})
		}),

		//! subscription
		createCourseSubscription: build.mutation<
			COURSE.CreateCourseSubscriptionRes,
			COURSE.CreateCourseSubscriptionReq
		>({
			query: (data) => ({
				url: `/course/create-subscription`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['subscription']
		}),
		getCourseSubscriptionQuery: build.query<
			COURSE.GetCourseSubscriptionQueryRes,
			COURSE.GetCourseSubscriptionQueryReq
		>({
			query: ({
				current_page,
				per_page,
				sortOrder,
				courseTitle,
				groupTitle,
				user
			}) => ({
				url: `/course/get-subscription-query`,
				method: 'GET',
				params: {
					current_page,
					per_page,
					sortOrder,
					courseTitle,
					groupTitle,
					user
				}
			}),
			providesTags: ['subscription']
		}),
		getCourseSubscription: build.query<
			COURSE.GetCourseSubscriptionRes,
			COURSE.GetCourseSubscriptionReq
		>({
			query: (courseId) => ({
				url: `/course/get-subscription/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['subscription']
		}),
		getCourseSubscriptionUserById: build.query<
			COURSE.GetCourseSubscriptionUserByIdRes,
			COURSE.GetCourseSubscriptionUserByIdReq
		>({
			query: ({ courseId, userId }) => ({
				url: `/course/get-subscription/${courseId}/user/${userId}`,
				method: 'GET'
			}),
			providesTags: ['subscription']
		}),
		updateCourseSubscriptionById: build.mutation<
			COURSE.UpdateCourseSubscriptionByIdRes,
			COURSE.UpdateCourseSubscriptionByIdReq
		>({
			query: ({ id, data }) => ({
				url: `/course/update-subscription/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['subscription']
		}),
		deleteCourseSubscriptionById: build.mutation<
			COURSE.DeleteCourseSubscriptionByIdRes,
			COURSE.DeleteCourseSubscriptionByIdReq
		>({
			query: (id) => ({
				url: `/course/delete-subscription/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['subscription']
		})
	})
});
export const {
	useCreateCourseMutation,
	useGetCourseAllQuery,
	useGetCourseParticipantQuery,
	useUpdateCourseMutation,
	useDeleteCourseMutation,

	useCreateCallRoomMutation,
	useGetCallRoomQuery,
	useDeleteCallRoomMutation,

	useCreateStructureMutation,
	useGetStructureCourseIdQuery,
	useUpdateStructureByIdMutation,
	useDeleteStructureByIdMutation,

	useGetSectionCheckLevelGroupUsersQuery,
	useGetSectionCheckLevelQuery,
	useUpdateSectionCheckLevelMutation,

	useCreateSectionMutation,
	useGetSectionByStructureIdQuery,
	useLazyGetSectionByStructureIdQuery,
	useUpdateSectionByIdMutation,
	useDeleteSectionByIdMutation,

	useCreateLessonMutation,
	useGetLessonBySectionIdQuery,
	useLazyGetLessonBySectionIdQuery,
	useUpdateLessonByIdMutation,
	useDeleteLessonByIdMutation,

	useCreateLessonContentMutation,
	useGetLessonContentByLessonIdQuery,
	useUpdateLessonContentByIdMutation,

	useCreateLessonHomeworkMutation,
	useGetLessonTypeByLessonIdQuery,
	useGetLessonHomeworkByLessonIdQuery,
	useGetLessonHomeworkByLessonIdMyQuery,
	useGetLessonHomeworkByUserIdQuery,
	useUpdateLessonHomeworkByIdMutation,
	useDeleteLessonHomeworkByIdMutation,

	useGetCourseSyncGroupQuery,
	useUpdateCourseSyncGroupMutation,

	useGetCourseSyncTelegramQuery,
	useUpdateCourseSyncTelegramMutation,

	useCreateCourseSubscriptionMutation,
	useGetCourseSubscriptionQueryQuery,
	useGetCourseSubscriptionQuery,
	useGetCourseSubscriptionUserByIdQuery,
	useUpdateCourseSubscriptionByIdMutation,
	useDeleteCourseSubscriptionByIdMutation
} = api;
