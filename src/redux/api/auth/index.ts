import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		googleLogin: build.mutation<AUTH.AuthLoginRes, AUTH.AuthLoginReq>({
			query: ({ idToken }) => ({
				url: '/auth/google/login',
				method: 'POST',
				body: { idToken }
			})
			// invalidatesTags: ["auth"],
		}),
		logout: build.mutation<AUTH.AuthLogoutRes, AUTH.AuthLogoutReq>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST'
			})
			// invalidatesTags: ["auth"],
		})
	})
});

export const { useGoogleLoginMutation, useLogoutMutation } = api;
