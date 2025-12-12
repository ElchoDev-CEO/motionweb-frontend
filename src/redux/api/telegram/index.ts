import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		//! telegram
		getTelegramGroupAll: build.query<
			TELEGRAM.GetTelegramGroupAllRes,
			TELEGRAM.GetTelegramGroupAllReq
		>({
			query: () => ({
				url: '/telegram/get-telegram-group-all',
				method: 'GET'
			})
			// providesTags: ['telegram']
		}),

		//! checkTelegramAuth
		checkTelegramAuth: build.query<
			TELEGRAM.CheckTelegramAuthRes,
			TELEGRAM.CheckTelegramAuthReq
		>({
			query: () => ({
				url: '/telegram/check-auth',
				method: 'GET'
			}),
			providesTags: ['telegram']
		}),

		//! deleteTelegramAuth
		deleteTelegramAuth: build.mutation<
			TELEGRAM.DeleteTelegramAuthRes,
			TELEGRAM.DeleteTelegramAuthReq
		>({
			query: () => ({
				url: '/telegram/delete-auth',
				method: 'DELETE'
			}),
			invalidatesTags: ['telegram']
		})
	})
});
export const {
	useGetTelegramGroupAllQuery,
	useCheckTelegramAuthQuery,
	useDeleteTelegramAuthMutation
} = api;
