import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
	prepareHeaders: (headers) => {
		const tokensString = localStorage.getItem('tokens');
		if (tokensString) {
			try {
				const tokens = JSON.parse(tokensString);
				if (typeof tokens === 'object' && tokens && tokens.accessToken) {
					headers.set('Authorization', `Bearer ${tokens.accessToken}`);
				}
			} catch (e) {
				console.error(`Error parsing tokens from localStorage: ${e}`);
			}
		}
		return headers;
	}
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryExtended,
	refetchOnReconnect: true,
	refetchOnFocus: false,
	tagTypes: [
		'auth',
		'me',
		'rating',
		'upload',
		'course',
		'group',
		'user',
		'todo',
		'call-room',
		'lesson-homework',
		'telegram',
		'feedback',
		'feedback-lesson',
		'ai',
		'get-section-by-structureId',
		'get-lesson-by-sectionId',
		'get-lesson-content-by-lessonId',
		'get-section-check-level',
		'subscription'
	],
	endpoints: () => ({})
});
