'use client';
import { FC, useEffect, useState } from 'react';
import scss from './CourseById.module.scss';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
	Button,
	Input,
	LoadingOverlay,
	Modal,
	Select,
	Text,
	Timeline
} from '@mantine/core';
import {
	useGetStructureCourseIdQuery,
	useGetSectionByStructureIdQuery,
	useGetLessonBySectionIdQuery,
	useCreateStructureMutation,
	useCreateSectionMutation,
	useCreateLessonMutation
} from '@/redux/api/course';
import Loader from '@/ui/loader/Loader';
import { useEditControlStore } from '@/stores/useEditControlStore';
import { useTranslation } from 'react-i18next';

interface IContinueCreatingTheCourse {
	type?: string;
	title: string;
}

const CourseById: FC = () => {
	const { courseId } = useParams();
	const router = useRouter();
	const { t } = useTranslation('course');
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
	const [courseCreationPart, setCourseCreationPart] = useState<number>(-1);
	const { isEdit } = useEditControlStore();
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [isCreatingCourse, setIsCreatingCourse] = useState(false);
	const [isCourseAvailable, setIsCourseAvailable] = useState(false);
	const [currentStructureId, setCurrentStructureId] = useState<number | null>(
		null
	);
	const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
	const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

	const {
		data: structureData,
		isLoading: isStructureLoading,
		status: structureStatus
	} = useGetStructureCourseIdQuery(String(courseId), {
		skip: !isCourseAvailable
	});
	const { data: sectionData, isLoading: isSectionLoading } =
		useGetSectionByStructureIdQuery(String(currentStructureId), {
			skip: !currentStructureId
		});
	const { data: lessonData, isLoading: isLessonLoading } =
		useGetLessonBySectionIdQuery(String(currentSectionId), {
			skip: !currentSectionId
		});
	const [createStructureMutation] = useCreateStructureMutation();
	const [createSectionMutation] = useCreateSectionMutation();
	const [createLessonMutation] = useCreateLessonMutation();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { isSubmitting }
	} = useForm<IContinueCreatingTheCourse>();

	const handleContinueCreatingTheCourse: SubmitHandler<
		IContinueCreatingTheCourse
	> = async (data) => {
		try {
			switch (courseCreationPart) {
				case -1:
					await createStructureMutation({
						courseId: Number(courseId),
						title: data.title
					});
					reset();
					setCourseCreationPart(0);
					break;
				case 0:
					await createSectionMutation({
						structureId: Number(currentStructureId),
						title: data.title
					});
					localStorage.setItem('lastAccordionItem', data.title);
					reset();
					setCourseCreationPart(1);
					break;
				case 1:
					await createLessonMutation({
						sectionId: Number(currentSectionId),
						type: data.type || '',
						title: data.title
					});
					setIsCreatingCourse(true);
					break;
				default:
					break;
			}
		} catch (e) {
			console.error(`Error in continue creating course: ${e}`);
		}
	};

	useEffect(() => {
		const savedRoute = localStorage.getItem('lastRoute');
		const lastCourseIdFromRoute = savedRoute?.split('/')[2];
		if (savedRoute && lastCourseIdFromRoute === courseId) {
			router.push(savedRoute);
		} else {
			setTimeout(() => {
				setIsDataLoading(false);
			}, 3000);
			setIsCourseAvailable(true);
		}
	}, [router, courseId]);

	useEffect(() => {
		if (!isStructureLoading && structureData?.results.length) {
			setCurrentStructureId(structureData.results[0].id);
			setCourseCreationPart(0);
		} else if (
			structureStatus === 'fulfilled' ||
			structureStatus === 'rejected'
		) {
			setTimeout(() => {
				setIsDataLoading(false);
			}, 3000);
		}

		if (!isSectionLoading && sectionData?.results.length) {
			setCurrentSectionId(sectionData.results[0].id);
			setCourseCreationPart(1);
			localStorage.setItem('lastAccordionItem', sectionData.results[0].title);
		} else if (
			structureStatus === 'fulfilled' ||
			structureStatus === 'rejected'
		) {
			setTimeout(() => {
				setIsDataLoading(false);
			}, 3000);
		}

		if (!isLessonLoading && lessonData?.results.length) {
			setCurrentLessonId(lessonData.results[0].id);
		} else if (
			structureStatus === 'fulfilled' ||
			structureStatus === 'rejected'
		) {
			setTimeout(() => {
				setIsDataLoading(false);
			}, 3000);
		}
	}, [
		structureData,
		sectionData,
		lessonData,
		isStructureLoading,
		isSectionLoading,
		isLessonLoading,
		courseCreationPart
	]);

	useEffect(() => {
		if (currentStructureId && currentSectionId && currentLessonId) {
			const newRoute = `/courses/${courseId}/lesson/${currentLessonId}`;
			localStorage.setItem('lastRoute', newRoute);
			router.push(newRoute);
		}
	}, [currentStructureId, currentSectionId, currentLessonId, router, courseId]);

	return (
		<>
			<section className={scss.CourseById}>
				{isDataLoading ? (
					<Loader />
				) : (
					<>
						<p>{t('isEmpty')}</p>
						{isEdit && (
							<>
								<Button
									onClick={() => setIsOpenCreateModal(true)}
									variant="filled"
								>
									{t('continue')}
								</Button>
								<Timeline active={courseCreationPart} bulletSize={25}>
									<Timeline.Item title={t('structure.title')}>
										<Text color="dimmed" size="sm">
											{t('structure.text')}
										</Text>
									</Timeline.Item>
									<Timeline.Item title={t('section.title')}>
										<Text color="dimmed" size="sm">
											{t('section.text')}
										</Text>
									</Timeline.Item>
									<Timeline.Item title={t('lesson.title')}>
										<Text color="dimmed" size="sm">
											{t('lesson.text')}
										</Text>
									</Timeline.Item>
								</Timeline>
							</>
						)}
					</>
				)}
			</section>

			<Modal
				opened={isOpenCreateModal}
				onClose={() => setIsOpenCreateModal(false)}
				title={
					courseCreationPart === -1
						? t('modal.themeStructure')
						: courseCreationPart === 0
							? t('modal.themeSection')
							: t('modal.themeLesson')
				}
				centered
			>
				<div className={scss.create_structure}>
					<form onSubmit={handleSubmit(handleContinueCreatingTheCourse)}>
						{courseCreationPart === -1 && (
							<>
								<Input
									placeholder={t('modal.inputNameStructure')}
									{...register('title', { required: true })}
								/>
								<Button
									loading={isSubmitting}
									loaderProps={{ type: 'dots' }}
									type="submit"
									variant="filled"
								>
									{t('modal.btnText')} -&gt;
								</Button>
							</>
						)}
						{courseCreationPart === 0 && (
							<>
								<Input
									placeholder={t('modal.inputNameSection')}
									{...register('title', { required: true })}
								/>
								<Button
									loading={isSubmitting}
									loaderProps={{ type: 'dots' }}
									type="submit"
									variant="filled"
								>
									{t('modal.btnText')} -&gt;
								</Button>
							</>
						)}
						{courseCreationPart === 1 && (
							<>
								<Input
									placeholder={t('modal.fromLesson.inputNameLesson')}
									{...register('title', { required: true })}
								/>
								<Controller
									name="type"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Select
											{...field}
											placeholder={t('modal.fromLesson.select.defType')}
											data={[
												{
													value: 'THEORY',
													label: t('modal.fromLesson.select.theory')
												},
												{
													value: 'PRACTICE',
													label: t('modal.fromLesson.select.practice')
												}
											]}
											onChange={(value) => field.onChange(value)}
										/>
									)}
								/>
								<Button
									loading={isSubmitting}
									loaderProps={{ type: 'dots' }}
									type="submit"
									variant="filled"
								>
									{t('modal.fromLesson.btnText')}
								</Button>
							</>
						)}
					</form>
				</div>
			</Modal>
			<LoadingOverlay
				visible={isCreatingCourse}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 2 }}
				loaderProps={{ type: 'dots', size: 'xl' }}
			/>
		</>
	);
};

export default CourseById;
