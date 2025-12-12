namespace TELEGRAM {
	// telegram
	type GetTelegramGroupAllRes = {
		success: boolean;
		results: Array<{
			id: string;
			chatId: string;
			name: string;
			photoUrl: string;
			joinedAt: string;
		}>;
	};
	type GetTelegramGroupAllReq = void;

	// checkTelegramAuth
	type CheckTelegramAuthRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			telegramId: string;
			username: string;
			firstName: string;
			lastName: string;
			photoUrl: string;
			isActivated: boolean;
			authDate: string;
		};
	};
	type CheckTelegramAuthReq = void;

	// deleteTelegramAuth
	type DeleteTelegramAuthRes = {
		success: boolean;
		results: {
			id: number;
			userId: number;
			telegramId: string;
			username: string;
			firstName: string;
			lastName: string;
			photoUrl: string;
			isActivated: boolean;
			authDate: string;
		};
	};
	type DeleteTelegramAuthReq = void;
}
