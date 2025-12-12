namespace TODO {
	interface ITodo {
		_id: number;
		title: string;
		image: string;
	}

	type GetTodosRes = ITodo[];
	type GetTodosReq = void;

	type AddTodoRes = ITodo[];
	type AddTodoReq = ITodo;

	type UpdateTodoRes = ITodo[];
	type UpdateTodoReq = {
		_id: number;
		updatedTodo: ITodo;
	};

	type DeleteTodoReq = ITodo[];
	type DeleteTodoRes = number;
}
