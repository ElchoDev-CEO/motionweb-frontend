import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		uploadFile: build.mutation<
			UPLOAD.UploadFileResponse,
			UPLOAD.UploadFileRequest
		>({
			query: (data) => ({
				url: '/upload/file',
				method: 'POST',
				body: data
			})
			// invalidatesTags: ['me']
		})
	})
});
export const { useUploadFileMutation } = api;
