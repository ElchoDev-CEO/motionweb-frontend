namespace AUTH {
	type AuthLoginRes = {
		success: boolean;
		message: string;
		results: {
			tokens: {
				accessToken: string;
				accessTokenExpiration: number;
				refreshToken: string;
			};
			doctor: {
				id: number;
				firstName: string;
				lastName: string;
				email: string;
			};
		};
	};
	type AuthLoginReq = {
		idToken: string;
	};

	type AuthLogoutRes = {
		success: boolean;
		message: string;
	};
	type AuthLogoutReq = void;
}
