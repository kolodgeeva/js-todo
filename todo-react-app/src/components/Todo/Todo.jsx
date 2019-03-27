import React from 'react';
import PropTypes from 'prop-types';
import TodoHeader from './TodoHeader';
import TodoItemList from './TodoItemList';

export const Todo = ({ todoList, onDeleteTodo, onSaveTodo }) => (
  <div className="todo-block">
    <TodoHeader todoList={todoList} onDeleteTodo={onDeleteTodo} onSaveTodo={onSaveTodo} />
    <TodoItemList todoList={todoList} onSaveTodo={onSaveTodo} />
  </div>
);

Todo.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      isDone: PropTypes.bool,
    })),
  }).isRequired,
  onSaveTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
