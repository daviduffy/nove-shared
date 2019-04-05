// External Dependencies
const React = require('react');
const PropTypes = require('prop-types');
const DatePicker = require('react-datepicker');

const InputDate = ({
  id,
  label,
  required,
  error,
  eventDate,
  placeholder,
  onDateChange,
  windowWidth
}) => (
  <div className={`F__g F__g--${id}`}>
    {
      label &&
      <label className={`F__l${required ? ' F__l--req' : ''}`} htmlFor="eventDate">
        <span>{label}</span>
      </label>
    }
    <DatePicker
      id="eventDate"
      className={`F__i${error ? ' F__i--err' : ''}`}
      valueRequired={required}
      selected={typeof eventDate === 'string' ? new Date(eventDate) : eventDate}
      placeholderText={placeholder}
      onChange={onDateChange}
      withPortal={windowWidth < 768}
      readOnly={windowWidth < 768}
      autoComplete="off"
    />
  </div>
);

InputDate.propTypes = {
  eventDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  error: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
};
InputDate.defaultProps = {
  eventDate: undefined,
  label: '',
  path: '',
  placeholder: ''
};

module.exports = { InputDate };
