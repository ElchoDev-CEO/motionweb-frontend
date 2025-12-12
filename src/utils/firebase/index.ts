import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyD3reCWnGyG1lwnm1d_nIwz8ID5nGtXPKA',
	authDomain: 'motionweb-c6638.firebaseapp.com',
	projectId: 'motionweb-c6638',
	storageBucket: 'motionweb-c6638.firebasestorage.app',
	messagingSenderId: '73216673948',
	appId: '1:73216673948:web:7640a42eeed89c7a054559',
	measurementId: 'G-HXLXKT8PDC'
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
auth.languageCode = 'it';
export const googleAuthProvider = new GoogleAuthProvider();
export default app;
