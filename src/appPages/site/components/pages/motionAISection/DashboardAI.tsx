'use client';
import {
	FC,
	useCallback,
	useLayoutEffect,
	useState,
	useRef,
	useEffect
} from 'react';
import { debounce } from 'throttle-debounce';
import { Textarea, TextInput, LoadingOverlay } from '@mantine/core';
import { useEditControlStore } from '@/stores/useEditControlStore';
import {
	useCreatePromptMutation,
	useGetAllPromptsQuery,
	useUpdatePromptMutation
} from '@/redux/api/ai';
import { BiSolidSend } from 'react-icons/bi';
import { FiEdit2, FiBook } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';
import styles from './DashboardAI.module.scss';

const DashboardAI: FC = () => {
	const [promptId, setPromptId] = useState<number | null>(null);
	const [promptTitle, setPromptTitle] = useState<string>('');
	const [promptText, setPromptText] = useState<string>('');

	// Используем useRef для хранения актуальных значений, которые будут доступны в debounce
	const promptIdRef = useRef<number | null>(null);
	const promptTitleRef = useRef<string>('');
	const promptTextRef = useRef<string>('');

	const [createPromptMutation, { isLoading: isCreating }] =
		useCreatePromptMutation();
	const {
		data: promptsData,
		isLoading: isLoadingPrompt,
		refetch: refetchPrompt
	} = useGetAllPromptsQuery();
	const [updatePromptMutation, { isLoading: isUpdating }] =
		useUpdatePromptMutation();

	// Обновляем refs при изменении соответствующих состояний
	useLayoutEffect(() => {
		promptIdRef.current = promptId;
		promptTitleRef.current = promptTitle;
		promptTextRef.current = promptText;
	}, [promptId, promptTitle, promptText]);

	const { isEdit } = useEditControlStore();

	// Создаем функцию debounce один раз при монтировании компонента
	const debounceUpdatePromptRef = useRef(
		debounce(500, async () => {
			if (promptIdRef.current) {
				await updatePromptMutation({
					id: promptIdRef.current,
					data: {
						title: promptTitleRef.current,
						prompt: promptTextRef.current
					}
				});
			}
		})
	);

	// Функция для вызова обновления
	const triggerUpdate = useCallback(() => {
		debounceUpdatePromptRef.current();
	}, []);

	useLayoutEffect(() => {
		if (!promptsData) return;
		if (promptsData?.results.length) {
			setPromptId(promptsData.results[0].id);
			setPromptTitle(promptsData.results[0].title);
			setPromptText(promptsData.results[0].prompt);
		}
	}, [promptsData]);

	useEffect(() => {
		refetchPrompt();
	}, []);

	return (
		<section className={styles.dashboardAI}>
			<div className="container">
				<div className={styles.content}>
					<div className={styles.header}>
						<div className={styles.titleContainer}>
							<RiRobot2Fill className={styles.aiIcon} />
							<h1 className={styles.title}>MotionAI</h1>
						</div>
						{isEdit ? (
							<div className={styles.editBadge}>
								<FiEdit2 />
								<span>Режим редактирования</span>
							</div>
						) : (
							<div className={styles.viewBadge}>
								<FiBook />
								<span>Режим просмотра</span>
							</div>
						)}
					</div>

					<div className={styles.promptsContainer}>
						<div className={styles.promptsCard}>
							<div className={styles.cardInner}>
								{isLoadingPrompt ? (
									<div className={styles.loadingState}>
										<div className={styles.loader}></div>
										<p>Загрузка промптов...</p>
									</div>
								) : promptsData?.results.length ? (
									<div className={styles.promptForm}>
										<div className={styles.textGroup}>
											<label htmlFor="title" className={styles.label}>
												Название:
											</label>
											<TextInput
												id="title"
												disabled={!isEdit}
												className={styles.input}
												placeholder="Придумайте название для prompt..."
												value={promptTitle}
												onChange={(e) => {
													setPromptTitle(e.target.value);
													triggerUpdate();
												}}
											/>
										</div>
										<div className={styles.textGroup}>
											<label htmlFor="text" className={styles.label}>
												Текст:
											</label>
											<Textarea
												id="text"
												disabled={!isEdit}
												autosize
												minRows={5}
												className={styles.textarea}
												placeholder="Напишите prompt, чтобы обучить ИИ..."
												value={promptText === null ? '' : promptText}
												onChange={(e) => {
													setPromptText(e.target.value);
													triggerUpdate();
												}}
											/>
										</div>
										{isUpdating && (
											<p className={styles.savingStatus}>
												Сохранение изменений...
											</p>
										)}
									</div>
								) : (
									<div className={styles.createPromptForm}>
										<h3 className={styles.createPromptTitle}>
											Создание нового промпта
										</h3>
										<div className={styles.createInputContainer}>
											<TextInput
												id="not_found_prompt"
												className={styles.createInput}
												placeholder="Введите название нового промпта..."
												rightSection={
													promptTitle !== '' ? (
														<button
															className={styles.sendButton}
															onClick={async () => {
																await createPromptMutation({
																	title: promptTitle
																});
																setPromptText('');
															}}
															disabled={isCreating}
														>
															<BiSolidSend />
														</button>
													) : undefined
												}
												rightSectionPointerEvents="auto"
												value={promptTitle}
												onChange={(e) => {
													setPromptTitle(e.target.value);
												}}
											/>
										</div>
										{isCreating && (
											<p className={styles.savingStatus}>Создание промпта...</p>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardAI;
