// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const InputDate = ({
  error,
  id,
  label,
  onDateChange,
  placeholder,
  required,
  value,
  windowWidth
}) => (
  <div className={`F__g F__g--${id}`}>
    {
      label &&
      <label className={`F__l${required ? ' F__l--req' : ''}`} htmlFor={id}>
        <span>{label}</span>
      </label>
    }
    <DatePicker
      id={id}
      className={`F__i${error ? ' F__i--err' : ''}`}
      valueRequired={required}
      selected={value ? new Date(value) : null}
      placeholderText={placeholder}
      onChange={onDateChange}
      withPortal={windowWidth < 768}
      readOnly={windowWidth < 768}
      autoComplete="off"
    />
  </div>
);

InputDate.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
};
InputDate.defaultProps = {
  value: null,
  label: '',
  placeholder: '',
  required: false
};

export default InputDate;
