'use client';

import { useEffect } from 'react';
import scss from './EventCalendar.module.scss';
import type { ICalendarEvent } from '@/redux/api/event/types';

type Props = {
	open: boolean;
	event: ICalendarEvent | null;
	onClose: () => void;
};

const typeLabel = (t?: string) => {
	if (t === 'webinar') return 'Вебинар';
	if (t === 'deadline') return 'Дедлайн';
	return 'Другое';
};

const formatDT = (iso: string) => {
	if (!iso) return '';
	return new Date(iso).toLocaleString();
};

export default function EventDetailsModal({ open, event, onClose }: Props) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	if (!open || !event) return null;

	const { title } = event;
	const { description, link, type, start_date, end_date } = event.extendedProps;

	return (
		<div className={scss.modalOverlay} onClick={onClose}>
			<div className={scss.modal} onClick={(e) => e.stopPropagation()}>
				<div className={scss.modalTop}>
					<div>
						<div className={scss.modalType}>{typeLabel(type)}</div>
						<h3 className={scss.modalTitle}>{title}</h3>
						<div className={scss.modalTime}>
							{formatDT(start_date)} — {formatDT(end_date)}
						</div>
					</div>

					<button className={scss.modalClose} onClick={onClose}>
						✕
					</button>
				</div>

				<div className={scss.modalBody}>{description}</div>

				<div className={scss.modalActions}>
					{link ? (
						<a
							className={scss.primaryBtn}
							href={link}
							target="_blank"
							rel="noreferrer"
						>
							Открыть ссылку
						</a>
					) : (
						<button className={scss.secondaryBtn} onClick={onClose}>
							Закрыть
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
