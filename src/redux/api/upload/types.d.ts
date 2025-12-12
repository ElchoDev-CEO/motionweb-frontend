namespace UPLOAD {
	type UploadFileResponse = {
		name: string;
		format: string;
		url: string;
		uploadedAt: string;
	};
	type UploadFileRequest = FormData;
}
