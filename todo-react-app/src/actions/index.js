export const toggleSidebar = {
  type: 'TOGGLE_SIDEBAR',
};

export const loadTodos = () => ({ type: 'LOAD_TODOS' });
export const loadTodosFinished = todos => ({
  type: 'LOAD_TODOS_FINISHED',
  todos,
});
export const loadTodosFailed = error => ({
  type: 'LOAD_TODOS_FAILED',
  error,
});

export const addTodo = todo => ({
  type: 'ADD_TODO',
  todo,
});
export const addTodoFinished = todo => ({
  type: 'ADD_TODO_FINISHED',
  todo,
});
export const addTodoFailed = error => ({
  type: 'ADD_TODO_FAILED',
  error,
});

export const saveTodo = todo => ({
  type: 'SAVE_TODO',
  todo,
});
export const saveTodoFinished = todo => ({
  type: 'SAVE_TODO_FINISHED',
  todo,
});
export const saveTodoFailed = error => ({
  type: 'SAVE_TODO_FAILED',
  error,
});

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id,
});
export const deleteTodoFailed = error => ({
  type: 'DELETE_TODO_FAILED',
  error,
});
