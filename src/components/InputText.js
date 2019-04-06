// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({
  id,
  label,
  placeholder,
  classes,
  error,
  value,
  options,
  onChange,
  style,
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
    <input
      id={id}
      type={id === 'email' ? 'email' : 'text'}
      className={`F__i${error ? ' F__i--err' : ''}`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  </div>
);
InputText.propTypes = {
  classes: PropTypes.string,
  error: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string.isRequired
};
InputText.defaultProps = {
  label: '',
  classes: '',
  options: false,
  placeholder: '',
  required: false,
  style: {}
};

export default InputText;
