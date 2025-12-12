import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<ME.GetMeResponse, ME.GetMeRequest>({
			query: () => ({
				url: '/auth/profile/get',
				method: 'GET'
			}),
			providesTags: ['me']
		}),
		updateMe: build.mutation<ME.PatchUpdateMeResponse, ME.PatchUpdateMeRequest>(
			{
				query: (data) => ({
					url: '/auth/profile/update',
					method: 'PATCH',
					body: data
				}),
				invalidatesTags: ['me']
			}
		)
	})
});
export const { useGetMeQuery, useUpdateMeMutation } = api;
