import React from 'react';
import PropTypes from 'prop-types';

export const LabeledInput = ({
  id,
  type,
  placeholder,
  className,
  value,
  onChange,
  onKeyPress,
}) => (
  <label htmlFor={id}>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  </label>
);

LabeledInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};

LabeledInput.defaultProps = {
  className: '',
  id: undefined,
  onKeyPress: undefined,
};
