"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InputTextarea = function InputTextarea(_ref) {
  var id = _ref.id,
      label = _ref.label,
      placeholder = _ref.placeholder,
      classes = _ref.classes,
      error = _ref.error,
      value = _ref.value,
      onChange = _ref.onChange,
      options = _ref.options,
      style = _ref.style,
      type = _ref.type,
      valueRequired = _ref.valueRequired,
      rest = _objectWithoutProperties(_ref, ["id", "label", "placeholder", "classes", "error", "value", "onChange", "options", "style", "type", "valueRequired"]);

  return dom("div", {
    className: "F__g".concat(classes ? " ".concat(classes) : ''),
    style: style
  }, label && dom("label", {
    htmlFor: id,
    className: "F__l".concat(valueRequired ? ' F__l--req' : '')
  }, dom("span", null, label)), dom("textarea", _extends({
    className: "F__i F__i--t".concat(error ? ' F__i--err' : ''),
    id: id,
    placeholder: placeholder,
    value: value,
    onChange: onChange
  }, rest)));
};

InputTextarea.propTypes = {
  classes: _propTypes["default"].string,
  id: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  error: _propTypes["default"].bool.isRequired,
  placeholder: _propTypes["default"].string,
  options: _propTypes["default"].bool,
  onChange: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object,
  value: _propTypes["default"].string.isRequired,
  valueRequired: _propTypes["default"].bool
};
InputTextarea.defaultProps = {
  label: '',
  classes: '',
  options: false,
  placeholder: '',
  style: {},
  valueRequired: false
};
var _default = InputTextarea;
exports["default"] = _default;