import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		checkIsFeedback: build.query<
			FEEDBACK.CheckIsFeedbackRes,
			FEEDBACK.CheckIsFeedbackReq
		>({
			query: () => ({
				url: '/feedback/check',
				method: 'GET'
			}),
			providesTags: ['feedback']
		}),
		getAllFeedback: build.query<
			FEEDBACK.GetAllFeedbackRes,
			FEEDBACK.GetAllFeedbackReq
		>({
			query: () => ({
				url: '/feedback/get-all',
				method: 'GET'
			}),
			providesTags: ['feedback']
		}),
		sendFeedback: build.mutation<
			FEEDBACK.SendFeedbackRes,
			FEEDBACK.SendFeedbackReq
		>({
			query: (data) => ({
				url: '/feedback/send',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['feedback']
		}),

		getFeedbackLessonById: build.query<
			FEEDBACK.GetFeedbackLessonRes,
			FEEDBACK.GetFeedbackLessonReq
		>({
			query: (lessonId) => ({
				url: `/feedback/get-lesson/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['feedback-lesson']
		}),
		sendFeedbackLesson: build.mutation<
			FEEDBACK.SendFeedbackLessonRes,
			FEEDBACK.SendFeedbackLessonReq
		>({
			query: (data) => ({
				url: '/feedback/send-lesson',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['feedback-lesson']
		})
	})
});
export const {
	useCheckIsFeedbackQuery,
	useGetAllFeedbackQuery,
	useSendFeedbackMutation,

	useGetFeedbackLessonByIdQuery,
	useSendFeedbackLessonMutation
} = api;
