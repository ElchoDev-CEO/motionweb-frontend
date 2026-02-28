export type EventType = 'webinar' | 'deadline' | 'other';

export interface IEvent {
	id: string;
	title: string;
	description: string;
	start_date: string; // ISO
	end_date: string; // ISO
	type: EventType;
	link?: string | null;
}

// Формат под FullCalendar
export interface ICalendarEvent {
	id: string;
	title: string;
	start: string;
	end: string;
	extendedProps: {
		description: string;
		type: EventType;
		link?: string | null;
		start_date: string;
		end_date: string;
	};
}
