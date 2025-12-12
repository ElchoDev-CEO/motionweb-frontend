import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllRating: build.query<RATING.GetRatingRes, RATING.GetRatingReq>({
			query: () => ({
				url: '/rating/get-all',
				method: 'GET'
			}),
			providesTags: ['rating']
		})
	})
});
export const { useGetAllRatingQuery } = api;
