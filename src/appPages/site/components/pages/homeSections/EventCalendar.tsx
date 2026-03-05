'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import type { DatesSetArg, EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';

import React, { useMemo, useState } from 'react';
import scss from './EventCalendar.module.scss';

import { useGetEventsQuery, mapToCalendarEvents } from '@/redux/api/event';
import type { ICalendarEvent } from '@/redux/api/event/types';
import { useTranslation } from 'react-i18next';

// import EventDetailsModal from './EventDetailsModal';

const typeLabel = (t?: string) => {
	if (t === 'webinar') return 'Вебинар';
	if (t === 'deadline') return 'Дедлайн';
	return 'Другое';
};

const formatDT = (iso: string) => {
	if (!iso) return '';
	return new Date(iso).toLocaleString();
};

const date = {
	today: 'Сегодня',
	todayEn: 'Today',
	todayKg: 'Бүгүн',
	month: 'Месяц',
	monthEn: 'Month',
	monthKg: 'Ай',
	week: 'Неделя',
	weekEn: 'Week',
	weekKg: 'Жума',
	list: 'Список',
	listEn: 'List',
	listKg: 'Тизме'
};

const EventCalendar = () => {
	const { i18n, t } = useTranslation('translated');

	const [range, setRange] = useState<{ from?: string; to?: string }>({});
	const { data, isLoading, isError } = useGetEventsQuery(range);

	const events = useMemo(() => mapToCalendarEvents(data ?? []), [data]);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<ICalendarEvent | null>(null);

	const onDatesSet = (arg: DatesSetArg) => {
		setRange({ from: arg.startStr, to: arg.endStr });
	};

	const openEvent = (ev: ICalendarEvent) => {
		setSelected(ev);
		setOpen(true);
	};

	const onEventClick = (arg: EventClickArg) => {
		const id = String(arg.event.id);
		const found = events.find((e) => e.id === id);
		if (found) openEvent(found);
	};

	const upcoming = useMemo(() => {
		const now = Date.now();

		return [...events]
			.filter((e) => {
				const end = Date.parse(e.end || e.extendedProps.end_date);
				return Number.isFinite(end) ? end >= now : true;
			})
			.sort((a, b) => Date.parse(a.start) - Date.parse(b.start))
			.slice(0, 6);
	}, [events]);

	const allDaysText =
		i18n.language === 'ru'
			? 'Весь день'
			: i18n.language === 'en'
				? 'All days'
				: 'Баардык кундор';
	const today =
		i18n.language === 'ru'
			? date.today
			: i18n.language === 'en'
				? date.todayEn
				: date.todayKg;
	const month =
		i18n.language === 'ru'
			? date.month
			: i18n.language === 'en'
				? date.monthEn
				: date.monthKg;
	const week =
		i18n.language === 'ru'
			? date.week
			: i18n.language === 'en'
				? date.weekEn
				: date.weekKg;
	const list =
		i18n.language === 'ru'
			? date.list
			: i18n.language === 'en'
				? date.listEn
				: date.listKg;
	return (
		<div className={scss.EventCalendar}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.header}>
						<h2 className={scss.title}>{t('home.eventCalendar.theme')}</h2>
						<p className={scss.subtitle}>{t('home.eventCalendar.subtitle')}</p>
					</div>

					{isError && (
						<div className={scss.error}>
							{t('home.eventCalendar.errorMess')}
						</div>
					)}
					{isLoading && <div className={scss.loading}>Загрузка...</div>}

					<div className={scss.grid}>
						<div className={scss.calendarCard}>
							<FullCalendar
								plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
								locale={ruLocale}
								initialView="dayGridMonth"
								events={events}
								height="auto"
								headerToolbar={{
									left: 'prev,next today',
									center: 'title',
									right: 'dayGridMonth,listWeek'
								}}
								buttonText={{
									today: today,
									month: month,
									week: week,
									list: list
								}}
								allDayText={allDaysText}
								noEventsText="Нет событий для отображения"
								datesSet={onDatesSet}
								eventClick={onEventClick}
								dayMaxEvents
								nowIndicator
								eventClassNames={(arg) => {
									const t = (arg.event.extendedProps?.type ??
										'other') as string;
									return ['mw-event', `mw-event--${t}`];
								}}
							/>
						</div>

						<div className={scss.sideCard}>
							<div className={scss.sideHeader}>
								<h3 className={scss.sideTitle}>
									{t('home.eventCalendar.commingEvent')}
								</h3>

								<div className={scss.legend}>
									<span className={`${scss.badge} ${scss.webinar}`}>
										{t('home.eventCalendar.classes.webinar')}
									</span>
									<span className={`${scss.badge} ${scss.deadline}`}>
										{t('home.eventCalendar.classes.deadline')}
									</span>
									<span className={`${scss.badge} ${scss.other}`}>
										{t('home.eventCalendar.classes.other')}
									</span>
								</div>
							</div>

							{upcoming.length ? (
								<div className={scss.upcoming}>
									{upcoming.map((event: ICalendarEvent) => {
										const t = event.extendedProps.type;

										return (
											<div
												key={event.id}
												onClick={() => openEvent(event)}
												className={
													t === 'webinar'
														? `${scss.item} ${scss.item_webinar}`
														: t === 'deadline'
															? `${scss.item} ${scss.item_deadline}`
															: `${scss.item} ${scss.item_other}`
												}
											>
												<div className={scss.itemTop}>
													<span className={scss.itemType}>{typeLabel(t)}</span>
													<span className={scss.itemDate}>
														{formatDT(event.extendedProps.start_date)}
													</span>
												</div>

												<div className={scss.itemTitle}>{event.title}</div>
												<div className={scss.itemDesc}>
													{event.extendedProps.description}
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className={scss.empty}>
									{t('home.eventCalendar.noCommingEvent')}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* <EventDetailsModal
				open={open}
				event={selected}
				onClose={() => {
					setOpen(false);
					setSelected(null);
				}}
			/> */}
		</div>
	);
};

export default EventCalendar;
