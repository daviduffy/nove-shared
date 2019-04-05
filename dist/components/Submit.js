"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glamor = require("glamor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Submit = function Submit(_ref) {
  var label = _ref.label,
      style = _ref.style;
  return dom("div", {
    className: "F__g F__g--submit"
  }, dom("button", _extends({
    className: "B B--p F__sb"
  }, (0, _glamor.css)(style)), label));
};

Submit.propTypes = {
  label: _propTypes["default"].string,
  style: _propTypes["default"].object.isRequired
};
Submit.defaultProps = {
  label: 'Submit'
};
var _default = Submit;
exports["default"] = _default;