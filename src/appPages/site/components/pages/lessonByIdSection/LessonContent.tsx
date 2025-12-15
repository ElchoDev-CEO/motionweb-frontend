'use client';
import { FC, useState, useEffect, useCallback, useRef } from 'react';
import scss from './LessonContent.module.scss';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import {
	Avatar,
	Button,
	FileButton,
	ScrollArea,
	Textarea,
	TextInput,
	Tooltip
} from '@mantine/core';
import { debounce } from 'throttle-debounce';
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import {
	IconCircleDashedCheck,
	IconDownload,
	IconTrashX,
	IconUpload
} from '@tabler/icons-react';
import { BsEmojiGrin } from 'react-icons/bs';
import {
	useCreateLessonContentMutation,
	useCreateLessonHomeworkMutation,
	useDeleteLessonHomeworkByIdMutation,
	useGetLessonContentByLessonIdQuery,
	useGetLessonHomeworkByLessonIdMyQuery,
	useGetLessonHomeworkByLessonIdQuery,
	useGetLessonTypeByLessonIdQuery,
	useUpdateLessonContentByIdMutation
} from '@/redux/api/course';
import { useUploadFileMutation } from '@/redux/api/upload';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import Loader from '@/ui/loader/Loader';
import ZegoControl from '@/shared/zegoCloud/ZegoControl';

// Rich Editor
import { useEditor } from '@tiptap/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import lowlight from '@/constants/lowlight';

// !
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import {
	useGetFeedbackLessonByIdQuery,
	useSendFeedbackLessonMutation
} from '@/redux/api/feedback';
import { BiSolidSend } from 'react-icons/bi';
import { useGetMeQuery } from '@/redux/api/me';
// !

const LessonContent: FC = () => {
	const { courseId, lessonId } = useParams();
	const router = useRouter();
	const { data: getMeData } = useGetMeQuery();
	const {
		data: contentData,
		isLoading,
		refetch
	} = useGetLessonContentByLessonIdQuery(String(lessonId));
	const [createLessonContentMutation] = useCreateLessonContentMutation();
	const [updateLessonContentByIdMutation] =
		useUpdateLessonContentByIdMutation();
	// const {
	// 	data: lessonHomeworkByLessonIdData,
	// 	isLoading: isLoadingLessonHomeworkByLessonIdData
	// } = useGetLessonHomeworkByLessonIdQuery(Number(lessonId));
	const {
		data: lessonHomeworkByLessonIdMyData,
		isLoading: isLoadingLessonHomeworkByLessonIdMyData
	} = useGetLessonHomeworkByLessonIdMyQuery(Number(lessonId));
	const { data: lessonTypeByLessonIdData } = useGetLessonTypeByLessonIdQuery(
		Number(lessonId)
	);
	const [createLessonHomeworkMutation] = useCreateLessonHomeworkMutation();
	const [
		deleteLessonHomeworkByIdMutation,
		{ isLoading: isLoadingDeleteLessonHomeworkById }
	] = useDeleteLessonHomeworkByIdMutation();
	const [uploadFileMutation, { isLoading: isLoadingUploadFile }] =
		useUploadFileMutation();
	const {
		data: feedbackLessonByIdData,
		isLoading: isLoadingFeedbackLessonById
	} = useGetFeedbackLessonByIdQuery(Number(lessonId));
	const [
		sendFeedbackLessonMutation,
		{ isLoading: isLoadingSendFeedbackLesson }
	] = useSendFeedbackLessonMutation();

	const { isEdit } = useEditControlStore();
	const { isAdminOrMentor } = useUserRoleStore();

	const [formData, setFormData] = useState({
		body: '',
		title: '',
		videoUrl: '',
		description: ''
	});
	const [isContentCreated, setIsContentCreated] = useState(false);
	const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
	const [inputFeedback, setInputFeedback] = useState<string>('');
	const isFirstRender = useRef(true);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

	// !!!
	const [numPages, setNumPages] = useState<number | null>(null);
	const pdfUrl =
		'https://vodfgqixtogeqggmxkvz.supabase.co/storage/v1/object/public/file/uploads/2025-02-25_18:03:55_+06:00_javascript_compressed.pdf';

	// !!!

	// Обновление контента с дебаунсом
	const debounceUpdateContent = useCallback(
		debounce(500, async (field: keyof typeof formData, value: string) => {
			if (contentData?.results?.id) {
				await updateLessonContentByIdMutation({
					id: contentData.results.id,
					data: { [field]: value }
				});
			}
		}),
		[contentData?.results?.id]
	);

	// Создание контента с дебаунсом
	const debounceCreateContent = useCallback(
		debounce(500, async (field: keyof typeof formData, value: string) => {
			try {
				const newContent = {
					...formData,
					[field]: value,
					lessonId: Number(lessonId)
				};
				const { data } = await createLessonContentMutation(newContent);
				if (data) {
					setIsContentCreated(true);
				}
			} catch (error) {
				console.error('Ошибка при создании контента:', error);
			}
		}),
		[contentData?.results?.id]
	);

	// Универсальный обработчик изменения полей
	const handleFieldChange = (field: keyof typeof formData, value: string) => {
		setFormData((prevData) => ({ ...prevData, [field]: value }));
		if (!isLoading) {
			if (!contentData?.results && !isContentCreated) {
				debounceCreateContent(field, value);
			} else {
				debounceUpdateContent(field, value);
			}
		}
	};

	const editor = useEditor({
		extensions: [
			StarterKit.configure({ codeBlock: false }),
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			CodeBlockLowlight.configure({ lowlight })
		],
		content: contentData?.results ? contentData.results.body : '',
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			if (!isFirstRender.current) {
				handleFieldChange('body', editor.getHTML());
			}
			isFirstRender.current = false;
		}
	});

	useEffect(() => {
		if (editor) {
			editor.setEditable(isEdit);
			isFirstRender.current = true;
		}
	}, [isEdit, editor]);

	useEffect(() => {
		refetch();
	}, [lessonId]);

	useEffect(() => {
		if (contentData?.results) {
			setFormData({
				body: contentData.results.body || '',
				title: contentData.results.title || '',
				videoUrl: contentData.results.videoUrl || '',
				description: contentData.results.description || ''
			});
			setIsContentCreated(true);
			if (editor) {
				editor.commands.setContent(contentData.results.body);
			}
		}
	}, [contentData]);

	const handleUploadHomeWorkFile = async (file: File | null) => {
		if (!file) {
			console.error('Файл не выбран');
			return;
		}
		const formData = new FormData();
		formData.append('file', file);
		try {
			const { data } = await uploadFileMutation(formData);
			if (!data) {
				throw new Error('Ошибка при загрузке файла');
			}
			await createLessonHomeworkMutation({
				lessonId: Number(lessonId),
				name: data.name,
				link: data.url
			});
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	const handleDownloadFile = (url: string, filename: string) => {
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDeleteHomeWorkFile = async (id: number) => {
		await deleteLessonHomeworkByIdMutation(id);
	};

	const handleGoToCheckingHW = () => {
		const lastRoute = localStorage.getItem('lastRoute');
		router.push(`${lastRoute}/hw`);
	};

	const handleSendMessage = async () => {
		if (!inputFeedback || inputFeedback.trim().length < 20) {
			toast.error('Отзыв должен содержать минимум 20 символов.');
			return;
		}

		setInputFeedback('');
		setEmojiPicker(false);
		await sendFeedbackLessonMutation({
			lessonId: Number(lessonId),
			comment: inputFeedback!
		});
	};

	// useEffect(() => {
	// 	const updateHeight = () => {
	// 		setScrollAreaHeight(window.innerHeight * 0.89);
	// 		console.log(window.innerHeight * 0.89);
	// 	};
	// 	updateHeight();
	// 	window.addEventListener('resize', updateHeight);
	// 	return () => {
	// 		window.removeEventListener('resize', updateHeight);
	// 	};
	// }, []);

	useEffect(() => {
		// Function to calculate the available height dynamically
		const updateHeight = () => {
			const headerHeight = document.querySelector('header')?.clientHeight || 0;
			const footerHeight = document.querySelector('footer')?.clientHeight || 0;
			const paddingAndMargins = 30 * 2; // Assuming 16px padding on top and bottom
			const availableHeight =
				window.innerHeight - headerHeight - footerHeight - paddingAndMargins;
			setScrollAreaHeight(availableHeight);
		};
		// Call on mount
		updateHeight();
		setInterval(updateHeight, 1000);
		// Recalculate on window resize
		window.addEventListener('resize', updateHeight);
		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', updateHeight);
		};
	}, []);

	return (
		<section className={scss.LessonContent}>
			<ScrollArea
				h={scrollAreaHeight}
				offsetScrollbars={true}
				scrollbarSize={5}
				scrollHideDelay={250}
			>
				<div className={scss.container}>
					<div className={scss.content}>
						<div className={scss.top}>
							<h1 className={scss.title}>Лекция</h1>
							<ZegoControl courseId={Number(courseId)} />
						</div>
						{isLoading ? (
							<Loader />
						) : (
							<>
								<div className={scss.lecture}>
									<>
										{isEdit ? (
											<TextInput
												label="VideoUrl"
												value={formData.videoUrl}
												onChange={(e) =>
													handleFieldChange('videoUrl', e.target.value)
												}
											/>
										) : (
											<>
												{formData.videoUrl && (
													<ReactPlayer
														className={scss.player}
														src={formData.videoUrl}
														controls={true}
														width="100%"
														height="550px"
													/>
												)}
											</>
										)}
										{isEdit ? (
											<TextInput
												label="PDF"
												value={formData.title}
												onChange={(e) =>
													handleFieldChange('title', e.target.value)
												}
											/>
										) : (
											<>
												{/* <h1 className={scss.title}>{formData.title}</h1> */}
												{/* <Document
													file={pdfUrl}
													onLoadSuccess={({ numPages }) =>
														setNumPages(numPages)
													}
												>
													{Array.from(new Array(numPages), (el, index) => (
														<Page key={index} pageNumber={index + 1} />
													))}
												</Document> */}
												{formData.title && (
													<iframe
														src={formData.title}
														width="100%"
														height="600px"
														style={{ border: 'none' }}
													></iframe>
												)}
											</>
										)}
										{isEdit ? (
											<Textarea
												label="Description"
												placeholder="Description"
												value={formData.description}
												onChange={(e) =>
													handleFieldChange('description', e.target.value)
												}
												autosize
												minRows={2}
												maxRows={4}
											/>
										) : (
											<>
												<p className={scss.description}>
													{formData.description}
												</p>
											</>
										)}
										{isEdit ? (
											<>
												<label>Html Document</label>
												<RichTextEditor editor={editor}>
													<RichTextEditor.Toolbar>
														<RichTextEditor.ControlsGroup>
															<RichTextEditor.Bold />
															<RichTextEditor.Italic />
															<RichTextEditor.Underline />
															<RichTextEditor.Strikethrough />
															<RichTextEditor.ClearFormatting />
															<RichTextEditor.Highlight />
															<RichTextEditor.Code />
														</RichTextEditor.ControlsGroup>

														<RichTextEditor.ControlsGroup>
															<RichTextEditor.H1 />
															<RichTextEditor.H2 />
															<RichTextEditor.H3 />
															<RichTextEditor.H4 />
														</RichTextEditor.ControlsGroup>

														<RichTextEditor.ControlsGroup>
															<RichTextEditor.Blockquote />
															<RichTextEditor.Hr />
															<RichTextEditor.BulletList />
															<RichTextEditor.OrderedList />
															<RichTextEditor.Subscript />
															<RichTextEditor.Superscript />
														</RichTextEditor.ControlsGroup>

														<RichTextEditor.ControlsGroup>
															<RichTextEditor.Link />
															<RichTextEditor.Unlink />
														</RichTextEditor.ControlsGroup>

														<RichTextEditor.ControlsGroup>
															<RichTextEditor.AlignLeft />
															<RichTextEditor.AlignCenter />
															<RichTextEditor.AlignJustify />
															<RichTextEditor.AlignRight />
														</RichTextEditor.ControlsGroup>

														<RichTextEditor.ControlsGroup>
															<RichTextEditor.Undo />
															<RichTextEditor.Redo />
														</RichTextEditor.ControlsGroup>
													</RichTextEditor.Toolbar>

													<RichTextEditor.Content />
												</RichTextEditor>
											</>
										) : (
											formData.body &&
											formData.body.trim() !== '' &&
											formData.body !== '<p></p>' && (
												<>
													{isEdit && <label>Html Document</label>}
													<RichTextEditor editor={editor}>
														<RichTextEditor.Content />
													</RichTextEditor>
												</>
											)
										)}
										{lessonTypeByLessonIdData?.results.type === 'PRACTICE' && (
											<>
												<div className={scss.home_work}>
													<div className={scss.left}>
														{lessonHomeworkByLessonIdMyData?.results.length ===
															0 && (
															<FileButton
																onChange={handleUploadHomeWorkFile}
																accept=".zip,.rar,application/zip"
															>
																{(props) => (
																	<Tooltip
																		arrowOffset={10}
																		arrowSize={4}
																		label="Можно загружать только файлы .zip и .rar"
																		withArrow
																		position="bottom"
																	>
																		<Button
																			size="xs"
																			loading={isLoadingUploadFile}
																			loaderProps={{ type: 'dots' }}
																			rightSection={<IconUpload size={16} />}
																			{...props}
																		>
																			Загрузите файл ДЗ
																		</Button>
																	</Tooltip>
																)}
															</FileButton>
														)}
														{lessonHomeworkByLessonIdMyData?.results.map(
															(item) => (
																<div
																	key={item.id || item.name}
																	className={scss.home_work_file}
																>
																	<p>{item.name}</p>
																	<div className={scss.buttons}>
																		<Button
																			size="xs"
																			onClick={() =>
																				handleDownloadFile(item.link, item.name)
																			}
																			rightSection={<IconDownload size={18} />}
																		>
																			Скачать
																		</Button>
																		<Button
																			size="xs"
																			loading={
																				isLoadingDeleteLessonHomeworkById
																			}
																			loaderProps={{ type: 'dots' }}
																			onClick={() =>
																				handleDeleteHomeWorkFile(item.id)
																			}
																			rightSection={<IconTrashX size={18} />}
																		>
																			Удалить
																		</Button>
																	</div>
																</div>
															)
														)}
													</div>
													<div className={scss.right}>
														{isAdminOrMentor && (
															<Button
																size="xs"
																onClick={handleGoToCheckingHW}
																rightSection={
																	<IconCircleDashedCheck size={18} />
																}
															>
																Проверить ДЗ
															</Button>
														)}
													</div>
												</div>
											</>
										)}
										<div className={scss.feedbackContainer}>
											<h1 className={scss.feedbackHeading}>
												Отзывы по текущему уроку:
											</h1>
											<div className={scss.feedbackList}>
												{isLoadingFeedbackLessonById ? (
													<span className={scss.feedbackMessage}>
														Загрузка...
													</span>
												) : feedbackLessonByIdData?.results?.length ? (
													feedbackLessonByIdData.results.map((item) => (
														<div
															key={item.id}
															className={
																getMeData?.results?.email === item.user.email
																	? `${scss.feedbackItem} ${scss.feedbackItemOwn}`
																	: `${scss.feedbackItem} ${scss.feedbackItemOther}`
															}
														>
															{getMeData?.results?.email !==
																item.user.email && (
																<div className={scss.feedbackAuthor}>
																	<Avatar
																		src={item.user.photo}
																		alt={`${item.user.firstName} ${item.user.lastName}`}
																	/>
																	<h2 className={scss.authorName}>
																		{item.user.firstName} {item.user.lastName}
																	</h2>
																</div>
															)}
															<p
																className={
																	getMeData?.results?.email === item.user.email
																		? `${scss.feedbackText} ${scss.active}`
																		: `${scss.feedbackText}`
																}
															>
																{item.comment}
															</p>
														</div>
													))
												) : (
													<span className={scss.feedbackMessage}>
														Нет отзывов
													</span>
												)}
											</div>
											<div className={scss.feedbackForm}>
												<button
													className={scss.EmojiPickerButton}
													onClick={() => setEmojiPicker(!emojiPicker)}
												>
													<BsEmojiGrin size={25} />
												</button>
												<EmojiPicker
													open={emojiPicker}
													onEmojiClick={(e) => {
														setInputFeedback(inputFeedback + e.emoji);
													}}
													reactionsDefaultOpen={true}
													allowExpandReactions={true}
													style={{
														position: 'absolute',
														left: '0',
														bottom: '50px'
													}}
												/>
												<Textarea
													className={scss.feedbackInput}
													placeholder="Напишите свой отзыв..."
													size="md"
													radius={16}
													autosize
													maxRows={5}
													disabled={isLoadingSendFeedbackLesson}
													value={inputFeedback}
													onFocus={() => {
														setEmojiPicker(false);
													}}
													onChange={(e) => setInputFeedback(e.target.value)}
													onKeyDown={(e) => {
														const isMobile = window.innerWidth < 700;
														if (
															e.key === 'Enter' &&
															!e.shiftKey &&
															!e.altKey &&
															!isMobile
														) {
															e.preventDefault();
															handleSendMessage();
														}
													}}
												/>
												<button
													className={scss.submitButton}
													disabled={isLoadingSendFeedbackLesson}
													onClick={handleSendMessage}
												>
													<BiSolidSend size={20} />
												</button>
											</div>
										</div>
									</>
								</div>
							</>
						)}
					</div>
				</div>
			</ScrollArea>
		</section>
	);
};

export default LessonContent;
