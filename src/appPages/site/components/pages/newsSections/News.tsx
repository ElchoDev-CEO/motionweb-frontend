'use client';
import React, { FC } from 'react';
import scss from './News.module.scss';
import { useScreenRecording } from '@/hooks/useScreenRecording';

const News: FC = () => {
	const {
		status,
		startRecording,
		stopRecording,
		downloadRecording,
		uploadRecording,
		mediaBlobUrl
	} = useScreenRecording();

	return (
		<>
			<section className={scss.News}>
				<div className="container">
					<div className={scss.content}>
						<h3>News</h3>
						<div className={scss.videoControls}>
							<button
								onClick={startRecording}
								disabled={status === 'recording'}
							>
								Start Recording
							</button>
							<button onClick={stopRecording} disabled={status !== 'recording'}>
								Stop Recording
							</button>
							<button
								onClick={() => {
									stopRecording();
									downloadRecording();
								}}
								disabled={status !== 'recording'}
							>
								Stop & Download
							</button>
							<button
								onClick={() => {
									stopRecording();
									downloadRecording();
									uploadRecording();
								}}
								disabled={status !== 'recording'}
							>
								Stop & Download & Upload
							</button>
						</div>
						{mediaBlobUrl && (
							<div className={scss.videoPreview}>
								<h4>Recording Preview:</h4>
								<video src={mediaBlobUrl} controls autoPlay loop />
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default News;
