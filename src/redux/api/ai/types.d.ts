namespace AI {
	type CreatePromptRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			prompt: string | null;
			createdAt: string;
			updatedAt: string;
		};
	};
	type CreatePromptReq = {
		title: string;
	};

	type GetAllPromptsRes = {
		success: boolean;
		results: Array<{
			id: number;
			title: string;
			prompt: string;
			createdAt: string;
			updatedAt: string;
		}>;
	};
	type GetAllPromptsReq = void;

	type UpdatePromptRes = {
		success: boolean;
		results: {
			id: number;
			title: string;
			prompt: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	type UpdatePromptReq = {
		id: number;
		data: {
			title?: string;
			prompt?: string;
		};
	};

	type SendMessageAIRes = {
		success: boolean;
		results: {
			content: Array<{
				type: string;
				text: string;
			}>;
		};
	};
	type SendMessageAIReq = {
		conversationHistory: Array<{
			role: string;
			content: string;
		}>;
	};
}
