"use strict";

// External Dependencies
var React = require('react');

var PropTypes = require('prop-types');

var DatePicker = require('react-datepicker');

var InputDate = function InputDate(_ref) {
  var id = _ref.id,
      label = _ref.label,
      required = _ref.required,
      error = _ref.error,
      eventDate = _ref.eventDate,
      placeholder = _ref.placeholder,
      onDateChange = _ref.onDateChange,
      windowWidth = _ref.windowWidth;
  return dom("div", {
    className: "F__g F__g--".concat(id)
  }, label && dom("label", {
    className: "F__l".concat(required ? ' F__l--req' : ''),
    htmlFor: "eventDate"
  }, dom("span", null, label)), dom(DatePicker, {
    id: "eventDate",
    className: "F__i".concat(error ? ' F__i--err' : ''),
    valueRequired: required,
    selected: typeof eventDate === 'string' ? new Date(eventDate) : eventDate,
    placeholderText: placeholder,
    onChange: onDateChange,
    withPortal: windowWidth < 768,
    readOnly: windowWidth < 768,
    autoComplete: "off"
  }));
};

InputDate.propTypes = {
  eventDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
module.exports = {
  InputDate: InputDate
};