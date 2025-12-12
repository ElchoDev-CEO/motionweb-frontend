'use client';
import { useModalStore } from '@/stores/useModalStore';
import React, {
	FC,
	createContext,
	useState,
	ReactNode,
	useRef,
	useEffect
} from 'react';

export const ScreenRecordingContext =
	createContext<ScreenRecordingContextType | null>(null);

const ScreenRecordingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
	const [status, setStatus] = useState<RecordingStatus>('not started');
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const { startLesson } = useModalStore();

	if (!MediaRecorder.isTypeSupported('video/mp4')) {
		console.warn('Формат Mp4 может не поддерживаться в этом браузере.');
	}

	const startRecording = async () => {
		try {
			chunksRef.current = [];
			setMediaBlobUrl(null);
			// Запрашиваем доступ к экрану и микрофону
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					frameRate: 30, // ! FPS
					width: { ideal: 1920 },
					height: { ideal: 1080 }
				}
			});
			const audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true
			});
			// Объединяем видео и аудио потоки
			const combinedStream = new MediaStream([
				...stream.getVideoTracks(),
				...audioStream.getAudioTracks()
			]);
			// Создаём MediaRecorder для записи
			const mediaRecorder = new MediaRecorder(combinedStream, {
				mimeType: 'video/mp4',
				videoBitsPerSecond: 5000000 // ! Mbps
			});
			mediaRecorderRef.current = mediaRecorder;
			// Слушаем события dataavailable для сбора данных
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			};
			// Когда запись остановлена, создаём Blob URL
			mediaRecorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
				const url = URL.createObjectURL(blob);
				setMediaBlobUrl(url);
				setStatus('stopped'); // Обновляем статус на "stopped"
				chunksRef.current = []; // Очищаем данные для новой записи
			};
			// Начинаем запись
			setStatus('recording');
			mediaRecorder.start();
		} catch (error) {
			console.error('Ошибка при запуске записи экрана и микрофона:', error);
			setStatus('error');
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			mediaRecorderRef.current.stream
				.getTracks()
				.forEach((track) => track.stop());
			mediaRecorderRef.current = null;
			setStatus('stopped');
		}
	};

	const downloadRecording = () => {
		if (mediaBlobUrl) {
			const a = document.createElement('a');
			a.href = mediaBlobUrl;
			a.download = `${startLesson.title || 'recording'}.mp4`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else {
			console.warn('Нет доступной записи для скачивания.');
		}
	};

	const uploadRecording = () => {};

	useEffect(() => {
		downloadRecording();
	}, [mediaBlobUrl]);

	return (
		<ScreenRecordingContext.Provider
			value={{
				startRecording,
				stopRecording,
				downloadRecording,
				uploadRecording,
				mediaBlobUrl,
				status
			}}
		>
			{children}
		</ScreenRecordingContext.Provider>
	);
};

export default ScreenRecordingProvider;

/*
Теперь в контексте доступен `status`, который может принимать следующие значения:
- `"not started"` — запись не начата.
- `"recording"` — запись идет.
- `"stopped"` — запись остановлена.
- `"error"` — произошла ошибка при записи.
*/
