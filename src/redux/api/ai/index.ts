import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		createPrompt: build.mutation<AI.CreatePromptRes, AI.CreatePromptReq>({
			query: (data) => ({
				url: '/elcho-ai/create-prompt',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['ai']
		}),
		getAllPrompts: build.query<AI.GetAllPromptsRes, AI.GetAllPromptsReq>({
			query: () => ({
				url: '/elcho-ai/get-all-prompts',
				method: 'GET'
			}),
			providesTags: ['ai']
		}),
		updatePrompt: build.mutation<AI.UpdatePromptRes, AI.UpdatePromptReq>({
			query: ({ id, data }) => ({
				url: `/elcho-ai/update-prompt/${id}`,
				method: 'PATCH',
				body: data
			})
			// invalidatesTags: ['ai']
		}),
		sendMessageAI: build.mutation<AI.SendMessageAIRes, AI.SendMessageAIReq>({
			query: (data) => ({
				url: '/elcho-ai/send-message',
				method: 'POST',
				body: data
			})
			// invalidatesTags: ['ai']
		})
	})
});

export const {
	useCreatePromptMutation,
	useGetAllPromptsQuery,
	useUpdatePromptMutation,
	useSendMessageAIMutation
} = api;
