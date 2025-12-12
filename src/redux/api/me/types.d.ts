namespace ME {
	type GetMeResponse = {
		success: boolean;
		results: User;
	};
	type GetMeRequest = void;

	type PatchUpdateMeResponse = {
		success: boolean;
		results: User;
	};
	type PatchUpdateMeRequest = {
		firstName?: string;
		lastName?: string;
		username?: string;
		photo?: string;
		backgroundImage?: string;
	};
}
