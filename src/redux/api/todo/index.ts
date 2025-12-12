import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		// Получение списка дел
		getTodos: build.query<TODO.GetTodosRes, TODO.GetTodosReq>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['todo']
		}),
		// Добавление нового дела
		addTodo: build.mutation<TODO.AddTodoRes, TODO.AddTodoReq>({
			query: (newTodo) => ({
				url: '',
				method: 'POST',
				body: newTodo
			}),
			invalidatesTags: ['todo']
		}),
		// Обновление существующего дела
		updateTodo: build.mutation<TODO.UpdateTodoRes, TODO.UpdateTodoReq>({
			query: ({ _id, updatedTodo }) => ({
				url: `/_id`,
				method: 'PATCH',
				body: updatedTodo
			}),
			invalidatesTags: ['todo']
		}),
		// Удаление дела
		deleteTodo: build.mutation<TODO.DeleteTodoRes, TODO.DeleteTodoReq>({
			query: (_id) => ({
				url: `/_id`,
				method: 'DELETE'
			}),
			invalidatesTags: ['todo']
		})
	})
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation
} = api;
