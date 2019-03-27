import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.item;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { handleToggleItemCheckbox } = this.props;
    const { id } = this.state;
    this.setState({ isDone: e.target.checked });
    handleToggleItemCheckbox(id, e.target.checked);
  }

  render() {
    const { id, isDone, description } = this.state;
    return (
      <li className="li-item" data-id={id}>
        <label
          htmlFor={id}
          className="checkbox-container"
        >
          <input
            className="checkbox-item"
            type="checkbox"
            checked={isDone}
            onChange={this.handleChange}
          />
          <span className="label">
            {description}
          </span>
          <span className="check-mark" />
        </label>
      </li>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  handleToggleItemCheckbox: PropTypes.func,
};

TodoItem.defaultProps = {
  handleToggleItemCheckbox: undefined,
}
