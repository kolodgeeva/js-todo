import React from 'react';
import Todo from '../Todo';
import PropTypes from "prop-types";

export const Main = ({ todos, onSaveTodo, onDeleteTodo }) => (
  <main>
    <section id="main">
      {todos.map(item => (
        <Todo
          key={item.id}
          todoList={item}
          onSaveTodo={onSaveTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </section>
  </main>
);

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      isDone: PropTypes.bool,
    })),
  })),
  onSaveTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

Main.defaultProps = {
  todos: [],
};
