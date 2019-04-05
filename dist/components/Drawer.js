"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// External Dependencies
var Drawer = function Drawer(_ref) {
  var isOpen = _ref.isOpen,
      items = _ref.items,
      label = _ref.label,
      onClick = _ref.onClick,
      originIndex = _ref.originIndex,
      getInputElements = _ref.getInputElements,
      placeholder = _ref.placeholder;
  return dom("div", {
    key: "drawer",
    className: "F__g F__g--more"
  }, label && dom("label", {
    className: "F__l"
  }, dom("span", null, label)), dom("div", {
    className: "Acrd".concat(isOpen ? ' Acrd--o' : '')
  }, dom("button", {
    onClick: onClick,
    className: "Acrd__trg"
  }, dom("span", {
    className: "F__l"
  }, dom("span", {
    id: "drawer_placeholder"
  }, placeholder))), dom("div", {
    className: "Acrd__cont-c" // duplicated below
    ,
    style: {
      maxHeight: isOpen && items.length > 0 ? "".concat(items.length * 110 + 24, "px") : 0
    }
  }, dom("div", {
    className: "Acrd__cont"
  }, items.map(function (innerInput, i) {
    return getInputElements(innerInput, i, "".concat(originIndex, "/items/"));
  })))));
};

Drawer.propTypes = {
  getInputElements: _propTypes["default"].func.isRequired,
  isOpen: _propTypes["default"].bool.isRequired,
  items: _propTypes["default"].array.isRequired,
  label: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  originIndex: _propTypes["default"].string,
  placeholder: _propTypes["default"].string
};
Drawer.defaultProps = {
  label: '',
  originIndex: '',
  placeholder: ''
};
var _default = Drawer;
exports["default"] = _default;