import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton, AddTodoButton } from '../Button/styled';
import LabeledInput from '../LabeledInput';
import TodoItem from '../Todo/TodoItem';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleKeyPressItem = this.handleKeyPressItem.bind(this);
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.state = {
      title: '',
      newItemTitle: '',
      items: [],
    };
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleKeyPressItem(e) {
    if (e.key === 'Enter') {
      const { items } = this.state;
      items.push({ id: Math.random().toString(), isDone: false, description: e.target.value });
      this.setState({ items, newItemTitle: '' });
    }
  }

  handleChangeItem(e) {
    this.setState({ newItemTitle: e.target.value });
  }

  handleAddTodo() {
    const { title, items } = this.state;
    const { onAddTodo } = this.props;
    const todo = {
      id: Math.random(),
      title,
      items,
    };

    onAddTodo(todo);

    this.setState({ title: '', newItemTitle: '', items: [] });
  }

  render() {
    const { isSidebarVisible, onToggleSidebarClick } = this.props;
    const { title, items, newItemTitle } = this.state;
    return (
      <div id="sidebar" style={isSidebarVisible ? { right: 0 } : { right: `${-350}px` }}>
        <div className="todo-block">
          <div className="todo-header">
            <div className="todo-header-bar">
              <CloseButton onClick={onToggleSidebarClick} />
            </div>
            <div className="todo-header-content">
              <LabeledInput
                id="new-todo-title"
                type="text"
                placeholder="Add title"
                value={title}
                onChange={this.handleChangeTitle}
              />
            </div>
          </div>
          <ul className="todo-list" id="new-todo-items">
            {items.map(item => (
              <TodoItem
                key={item.id}
                item={item}
              />
            ))}
            <li>
              <LabeledInput
                className="add-item-btn label"
                type="text"
                placeholder="Add to-do"
                value={newItemTitle}
                onChange={this.handleChangeItem}
                onKeyPress={this.handleKeyPressItem}
              />
            </li>
          </ul>
          <AddTodoButton onClick={this.handleAddTodo}>
            Add
          </AddTodoButton>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  onToggleSidebarClick: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};
