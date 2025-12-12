type DateTime = string;
type UserRole = 'ADMIN' | 'MANAGER' | 'MENTOR' | 'STUDENT';
type UserAuthMethod = 'GOOGLE' | 'GITHUB';
type FilterType = 'desc' | 'asc';

type User = {
	id?: number;
	firstName: string;
	lastName: string;
	role: UserRole;
	specialization: string;
	careerDuration: number;
	careerDescription: string;
	authMethod: UserAuthMethod;
	username: string;
	email: string;
	isActive: boolean;
	photo: string;
	backgroundImage: string;
	phone: string;
	isPhoneVerified: boolean;
	traffic: string;
	createdAt: DateTime;
	updatedAt: DateTime;
	lastLogin: string;
};

type RecordingStatus = 'not started' | 'recording' | 'stopped' | 'error';

type ScreenRecordingContextType = {
	startRecording: () => Promise<void>;
	stopRecording: () => void;
	downloadRecording: () => void;
	uploadRecording: () => void;
	mediaBlobUrl: string | null;
	status: RecordingStatus;
};
