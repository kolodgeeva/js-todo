import React from 'react';
import PropTypes from 'prop-types';
import { RemoveButton } from '../../Button/styled';
import LabeledInput from '../../LabeledInput';

export class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props, titleInput: props.todoList.title };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ titleInput: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const { todoList } = this.state;
      const { onSaveTodo } = this.props;
      todoList.title = e.target.value;
      this.setState({ todoList });
      onSaveTodo(todoList);
    }
  }

  handleRemove() {
    const { onDeleteTodo } = this.props;
    const { todoList } = this.state;
    onDeleteTodo(todoList.id);
  }

  render() {
    const { titleInput } = this.state;
    return (
      <div className="todo-header">
        <div className="todo-header-bar">
          <RemoveButton onClick={this.handleRemove} />
        </div>
        <div className="todo-header-content">
          <LabeledInput
            type="text"
            className="item-title"
            placeholder="Add title"
            value={titleInput}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }
}

TodoHeader.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      isDone: PropTypes.bool,
    })),
  }).isRequired,
  onSaveTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
