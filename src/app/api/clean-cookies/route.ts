import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		const cookiesStorage = await cookies();
		cookiesStorage.delete('stel_ssid');
		cookiesStorage.delete('stel_token');
		return NextResponse.json({ message: 'Success cleaned cookies' });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error cleaning cookies', error: error },
			{ status: 500 }
		);
	}
};
