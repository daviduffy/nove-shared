"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InputSelect = function InputSelect(_ref) {
  var id = _ref.id,
      label = _ref.label,
      classes = _ref.classes,
      error = _ref.error,
      value = _ref.value,
      options = _ref.options,
      onChange = _ref.onChange,
      style = _ref.style,
      type = _ref.type,
      valueRequired = _ref.valueRequired,
      rest = _objectWithoutProperties(_ref, ["id", "label", "classes", "error", "value", "options", "onChange", "style", "type", "valueRequired"]);

  var inputClasses = []; // TODO: maybe find a better way to do this

  if (value === '') {
    inputClasses.push('F__i--is-unset');
  }

  if (error) {
    inputClasses.push('F__i--err');
  }

  return dom("div", {
    className: "F__g".concat(classes ? " ".concat(classes) : ''),
    style: style
  }, label && dom("label", {
    htmlFor: id,
    className: "F__l".concat(valueRequired ? ' F__l--req' : '')
  }, dom("span", null, label)), dom("select", _extends({
    className: "F__i F__i--s ".concat(inputClasses.join(' ')),
    id: id,
    value: value,
    onChange: onChange
  }, rest), options && options.map(function (option) {
    var value, text;

    if (typeof option === 'string') {
      value = option.toUpperCase();
      text = (0, _utils.titleize)(option);
    } else {
      var _option = _slicedToArray(option, 2);

      value = _option[0];
      text = _option[1];
    }

    return dom("option", {
      key: value,
      value: value
    }, text);
  })));
};

InputSelect.propTypes = {
  classes: _propTypes["default"].string,
  error: _propTypes["default"].bool,
  id: _propTypes["default"].string,
  label: _propTypes["default"].string,
  options: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].array]).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object,
  value: _propTypes["default"].string,
  valueRequired: _propTypes["default"].bool
};
InputSelect.defaultProps = {
  classes: '',
  error: false,
  id: '',
  label: '',
  style: {},
  valueRequired: false,
  value: ''
};
var _default = InputSelect;
exports["default"] = _default;