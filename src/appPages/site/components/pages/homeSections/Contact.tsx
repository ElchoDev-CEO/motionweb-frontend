'use client';
import { FC } from 'react';
import scss from './Contact.module.scss';
import Image from 'next/image';
import axios from 'axios';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, Input, InputBase } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { IconChevronRight } from '@tabler/icons-react';
import { Bounce, toast } from 'react-toastify';
import photo from '@/assets/contact.png';

interface IContactForm {
	username: string;
	phone: string;
}

const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const Contact: FC = () => {
	const { register, handleSubmit, control, reset } = useForm<IContactForm>();

	const messageModel = (data: IContactForm) => {
		let message = `<b>***Заявка***</b>\n`;
		message += `Имя: <b>${data.username}</b>\n`;
		message += `Номер телефона: <b>${data.phone}</b>\n`;
		return message;
	};

	const onSubmit: SubmitHandler<IContactForm> = async (data) => {
		const formattedPhone = data.phone.replace(/[\s()-]/g, '');

		await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
			chat_id: CHAT_ID,
			parse_mode: 'html',
			text: messageModel({ ...data, phone: formattedPhone })
		});

		toast('Мы приняли вашу заявку, скоро мы с вами свяжемся!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce
		});

		reset();
	};

	return (
		<>
			<section className={scss.Contact} id="contact-section">
				<div className="container">
					<div className={scss.content}>
						<div className={scss.left}>
							<h1 className={scss.title}>
								Запишись через сайт и получи <span>10% скидку</span> на любой
								курс
							</h1>
							<Image
								className={scss.photo}
								width={500}
								height={500}
								src={photo}
								alt="contact_photo"
							/>
						</div>
						<div className={scss.right}>
							<h1 className={scss.title}>
								Оставьте <span>заявку</span>
							</h1>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Input
									placeholder="Ваше имя"
									size="lg"
									{...register('username', { required: true })}
								/>
								<Controller
									name="phone"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<InputBase
											placeholder="+996 (---) 00-00-00"
											component={IMaskInput}
											mask="+996 (000) 00-00-00"
											size="lg"
											{...field}
										/>
									)}
								/>
								<Button
									type="submit"
									rightSection={<IconChevronRight size={21} stroke={2} />}
									variant="filled"
									color="red"
									size="lg"
								>
									Отправить
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
