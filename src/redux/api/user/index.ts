import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		// user
		getUserAll: build.query<USER.GetUserAllRes, USER.GetUserAllReq>({
			query: ({ current_page, per_page, role, sortOrder, search }) => ({
				url: `/user/get-user-all`,
				method: 'GET',
				params: {
					current_page,
					per_page,
					role,
					sortOrder,
					search
				}
			}),
			providesTags: ['user']
		}),
		getUser: build.query<USER.GetUserRes, USER.GetUserReq>({
			query: (userId) => ({
				url: `/user/get-user/${userId}`,
				method: 'GET'
			}),
			providesTags: ['user']
		}),
		updateUser: build.mutation<USER.UpdateUserRes, USER.UpdateUserReq>({
			query: ({ id, data }) => ({
				url: `/user/update-user/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['user']
		})
	})
});
export const { useGetUserAllQuery, useGetUserQuery, useUpdateUserMutation } =
	api;
