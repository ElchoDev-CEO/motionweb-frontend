import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		// group
		createGroup: build.mutation<GROUP.CreateGroupRes, GROUP.CreateGroupReq>({
			query: (data) => ({
				url: '/group/create-group',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['group']
		}),
		getGroupAll: build.query<
			GROUP.GetGroupParticipantRes,
			GROUP.GetGroupParticipantReq
		>({
			query: () => ({
				url: '/group/get-group-all',
				method: 'GET'
			}),
			providesTags: ['group']
		}),
		getGroupParticipant: build.query<
			GROUP.GetGroupParticipantRes,
			GROUP.GetGroupParticipantReq
		>({
			query: () => ({
				url: '/group/get-group',
				method: 'GET'
			}),
			providesTags: ['group']
		}),
		updateGroup: build.mutation<GROUP.UpdateGroupRes, GROUP.UpdateGroupReq>({
			query: ({ id, data }) => ({
				url: `/group/update-group/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['group']
		}),
		deleteGroup: build.mutation<GROUP.DeleteGroupRes, GROUP.DeleteGroupReq>({
			query: (id) => ({
				url: `/group/delete-group/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['group']
		}),

		// group-sync-students
		getGroupSyncStudent: build.query<
			GROUP.GetGroupSyncStudentRes,
			GROUP.GetGroupSyncStudentReq
		>({
			query: ({ groupId, user }) => ({
				url: `/group/get-group-sync/${groupId}/students`,
				method: 'GET',
				params: {
					user
				}
			}),
			providesTags: ['group']
		}),
		updateGroupSyncStudent: build.mutation<
			GROUP.UpdateGroupSyncStudentRes,
			GROUP.UpdateGroupSyncStudentReq
		>({
			query: ({ groupId, data }) => ({
				url: `/group/update-group-sync/${groupId}/students`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['get-section-check-level']
		})
	})
});
export const {
	useCreateGroupMutation,
	useGetGroupAllQuery,
	useGetGroupParticipantQuery,
	useUpdateGroupMutation,
	useDeleteGroupMutation,

	useGetGroupSyncStudentQuery,
	useUpdateGroupSyncStudentMutation
} = api;
