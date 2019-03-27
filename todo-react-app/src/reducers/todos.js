const defaultTodoState = [];

const todos = (state = defaultTodoState, action) => {
  let newState;
  switch (action.type) {
    case 'LOAD_TODOS_FINISHED':
      return action.todos;
    case 'ADD_TODO_FINISHED':
      return [
        ...state,
        action.todo,
      ];
    case 'SAVE_TODO_FINISHED':
      newState = state;
      newState.forEach((element, index) => {
        if (element.id === action.todo.id) {
          newState[index] = action.todo;
        }
      });
      return newState;
    case 'DELETE_TODO_FINISHED':
      newState = state;
      newState = newState.filter(e => e.id !== action.id);
      return newState;
    default:
      return state;
  }
};
export default todos;
