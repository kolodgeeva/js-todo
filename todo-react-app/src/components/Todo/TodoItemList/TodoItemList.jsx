import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';
import LabeledInput from '../../LabeledInput';

export class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: props.todoList, newItemTitle: '' };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleItemCheckbox = this.handleToggleItemCheckbox.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const { todoList } = this.state;
      const { onSaveTodo } = this.props;
      todoList.items.push({
        id: Math.random().toString(),
        isDone: false,
        description: e.target.value,
      });
      onSaveTodo(todoList);
      this.setState({ newItemTitle: '' });
    }
  }

  handleToggleItemCheckbox(id, checked) {
    const { todoList } = this.state;
    const { onSaveTodo } = this.props;
    todoList.items.forEach((element, index) => {
      if (element.id === id) {
        todoList.items[index].isDone = checked;
      }
    });
    onSaveTodo(todoList);
  }

  handleChange(e) {
    this.setState({ newItemTitle: e.target.value });
  }

  render() {
    const { todoList, newItemTitle } = this.state;
    return (
      <ul className="todo-list">
        {todoList.items.map(item => (
          <TodoItem
            key={item.id}
            item={item}
            handleToggleItemCheckbox={this.handleToggleItemCheckbox}
          />
        ))}
        <li>
          <LabeledInput
            className="add-item-btn label"
            type="text"
            placeholder="Add to-do"
            value={newItemTitle}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
        </li>
      </ul>
    );
  }
}

TodoItemList.propTypes = {
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
};
