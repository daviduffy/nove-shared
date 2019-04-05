"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// External Dependencies
var Row = function Row(_ref) {
  var items = _ref.items,
      type = _ref.type,
      getInputElements = _ref.getInputElements,
      originIndex = _ref.originIndex,
      pathPrefix = _ref.pathPrefix;
  return dom("div", {
    className: "F__r".concat(type ? " F__r--".concat(type) : '')
  }, items.map(function (subItem, i) {
    return getInputElements(subItem, i, "".concat(originIndex, "/items/"));
  }));
};

Row.propTypes = {
  items: _propTypes["default"].array.isRequired,
  type: _propTypes["default"].string,
  getInputElements: _propTypes["default"].func.isRequired,
  originIndex: _propTypes["default"].string.isRequired,
  pathPrefix: _propTypes["default"].string
};
Row.defaultProps = {
  type: '',
  pathPrefix: ''
};
var _default = Row;
exports["default"] = _default;