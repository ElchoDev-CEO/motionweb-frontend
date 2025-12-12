'use client';
import { FC, useEffect, useState } from 'react';
import scss from './FeedBack.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Rating, Textarea } from '@mantine/core';
import { useModalStore } from '@/stores/useModalStore';
import {
	useCheckIsFeedbackQuery,
	useSendFeedbackMutation
} from '@/redux/api/feedback';
import axios from 'axios';
import { useGetMeQuery } from '@/redux/api/me';

interface IFormFeedBack {
	rate: number;
	comment: string;
}

export const FeedBack: FC = () => {
	const [rating, setRating] = useState(0);
	const { isOpenFeedback, setIsOpenFeedback } = useModalStore();
	const { data: checkIsFeedbackData } = useCheckIsFeedbackQuery();
	const { data: meData } = useGetMeQuery();
	const [sendFeedbackMutation] = useSendFeedbackMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = useForm<IFormFeedBack>();

	const onSubmit: SubmitHandler<IFormFeedBack> = async (data) => {
		try {
			// Отправка отзыва через основной API
			await sendFeedbackMutation({ ...data, rate: rating });

			// 📝 <b>Комментарий:</b>
			// Формирование сообщения для Telegram с правильным форматированием
			const clientName =
				meData?.results.firstName && meData?.results.lastName
					? `${meData.results.firstName} ${meData.results.lastName}`
					: 'Не указано';

			const clientPhone = meData?.results.phone || 'Не указано';

			const messageText = `
🚀<b>***Отзыв***</b>🚀

<code>${clientName}</code> | <code>${clientPhone}</code>

<code>${data.comment}</code>

⭐ <b>Оценка:</b> ${rating}/5
`.trim();

			await axios.post(
				`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_TOKEN}/sendMessage`,
				{
					chat_id: '-1002329415210',
					parse_mode: 'HTML',
					text: messageText
				}
			);

			reset();
			setRating(0);
			setIsOpenFeedback(false);
		} catch (error) {
			console.error(
				`❌ Ошибка при отправке отзыва: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	};

	useEffect(() => {
		if (checkIsFeedbackData) {
			setIsOpenFeedback(checkIsFeedbackData.results.isMoreThanSevenDays);
		}
	}, [checkIsFeedbackData]);

	// Handle scroll lock when modal is open
	useEffect(() => {
		if (isOpenFeedback) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = '';
			};
		}
	}, [isOpenFeedback]);

	if (!isOpenFeedback) return null;

	return (
		<div className={scss.FeedBack}>
			<div className={scss.container}>
				<div className={scss.content}>
					<div className={scss.modal}>
						<h2 className={scss.title}>
							Оставьте <span>свой отзыв</span>
						</h2>
						<form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
							<div className={scss.textareaContainer}>
								<p className={scss.textareaLabel}>Ваш комментарий</p>
								<Textarea
									// label="Ваш комментарий"
									placeholder="Опишите ваши впечатления..."
									autosize
									minRows={2}
									maxRows={5}
									{...register('comment', { required: true, minLength: 2 })}
									className={scss.textarea}
								/>
							</div>
							<div className={scss.ratingContainer}>
								<p className={scss.ratingLabel}>Ваша оценка:</p>
								<Rating value={rating} onChange={setRating} />
							</div>

							<div className={scss.buttonGroup}>
								<Button
									type="submit"
									// color="primary"
									loading={isSubmitting}
									disabled={rating === 0}
								>
									Отправить
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
