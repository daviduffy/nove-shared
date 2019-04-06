// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const InputTextarea = ({
  id,
  label,
  placeholder,
  classes,
  error,
  value,
  onChange,
  options,
  style,
  type, // purposely strip from rest operator
  required,
  ...rest
}) => (
  <div className={`F__g${classes ? ` ${classes}` : ''}`} style={style}>
    {
      label &&
      <label htmlFor={id} className={`F__l${required ? ' F__l--req' : ''}`}>
        <span>{label}</span>
      </label>
    }
    <textarea
      className={`F__i F__i--t${error ? ' F__i--err' : ''}`}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);
InputTextarea.propTypes = {
  classes: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string.isRequired
};
InputTextarea.defaultProps = {
  label: '',
  classes: '',
  options: false,
  placeholder: '',
  required: false,
  style: {}
};

export default InputTextarea;
