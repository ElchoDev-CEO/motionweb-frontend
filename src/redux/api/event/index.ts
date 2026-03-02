import { api as index } from '../index';
import type { IEvent, ICalendarEvent } from './types';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getEvents: build.query<IEvent[], { from?: string; to?: string } | void>({
			query: (params) => ({
				url: '/api/events',
				method: 'GET',
				params: params ?? undefined
			}),
			providesTags: ['Events']
		}),

		createEvent: build.mutation<IEvent, Omit<IEvent, 'id'>>({
			query: (body) => ({
				url: '/api/admin/events',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Events']
		}),

		updateEvent: build.mutation<
			IEvent,
			{ id: string; body: Partial<Omit<IEvent, 'id'>> }
		>({
			query: ({ id, body }) => ({
				url: `/api/admin/events/${id}`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: ['Events']
		}),

		deleteEvent: build.mutation<{ id: string }, string>({
			query: (id) => ({
				url: `/api/admin/events/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Events']
		})
	}),
	overrideExisting: false
});

export const {
	useGetEventsQuery,
	useCreateEventMutation,
	useUpdateEventMutation,
	useDeleteEventMutation
} = api;

// helper (для календаря)
export const mapToCalendarEvents = (events: IEvent[]): ICalendarEvent[] =>
	events.map((e) => ({
		id: e.id,
		title: e.title,
		start: e.start_date,
		end: e.end_date,
		extendedProps: {
			description: e.description,
			type: e.type,
			link: e.link ?? null,
			start_date: e.start_date,
			end_date: e.end_date
		}
	}));
