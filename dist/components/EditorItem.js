"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditorItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditorItem, _React$Component);

  function EditorItem(props) {
    var _this;

    _classCallCheck(this, EditorItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditorItem).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "register", function (e) {
      clearTimeout(_this.complete);
      e.persist();
      _this.complete = setTimeout(function () {
        _this.dispatch(e);
      }, 50);
    });

    _defineProperty(_assertThisInitialized(_this), "dispatch", function (e) {
      var drop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!e.target) return;
      var dropTarget = e.target.parentNode.dataset.path;
      var pageX = e.pageX,
          pageY = e.pageY;

      var _e$target$getBounding = e.target.getBoundingClientRect(),
          left = _e$target$getBounding.left,
          right = _e$target$getBounding.right,
          top = _e$target$getBounding.top,
          bottom = _e$target$getBounding.bottom,
          width = _e$target$getBounding.width,
          height = _e$target$getBounding.height;

      var horizHoverSize = width / 4 > 80 ? width / 4 : 80;
      var vertHoverSize = height / 2;
      var LEFT = pageX > left && pageX < left + horizHoverSize;
      var RIGHT = pageX >= right - horizHoverSize && pageX < right;
      var TOP = pageY > top && pageY < top + vertHoverSize;
      var BOTTOM = pageY >= top + vertHoverSize && pageY < bottom;
      var dropRegion = '';

      if (LEFT) {
        dropRegion = 'LEFT';
      } else if (RIGHT) {
        dropRegion = 'RIGHT';
      } else if (TOP) {
        dropRegion = 'TOP';
      } else if (BOTTOM) {
        dropRegion = 'BOTTOM';
      }

      return {
        dropTarget: dropTarget,
        dropRegion: dropRegion,
        drop: drop
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function (e, id) {
      e.stopPropagation();
      console.log({
        dragElement: _this.props.id
      });
      e.dataTransfer.setData('id', id);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragOver", function (e) {
      e.preventDefault();

      _this.register(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrop", function (e) {
      e.stopPropagation();
      console.log(_this.dispatch(e, true));
    });

    _this.complete = false;
    return _this;
  }

  _createClass(EditorItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          draggable = _this$props.draggable,
          path = _this$props.path,
          onEditorClick = _this$props.onEditorClick,
          production = _this$props.production,
          Component = _this$props.Component,
          nestingType = _this$props.nestingType,
          rest = _objectWithoutProperties(_this$props, ["active", "draggable", "path", "onEditorClick", "production", "Component", "nestingType"]);

      var RenderedComponent = dom(Component, rest);

      if (production) {
        return RenderedComponent;
      }

      var classes = ['F__g', 'EditorItem'];
      if (nestingType) classes.push("EditorItem--".concat(nestingType));
      return dom("div", {
        className: classes.join(' '),
        draggable: draggable,
        onDragStart: this.handleDragStart,
        onDragOver: this.handleDragOver,
        onDrop: this.handleDrop,
        "data-path": path
      }, RenderedComponent, dom("button", {
        className: "B EditorItem__button".concat(active ? ' EditorItem__button--active' : ''),
        onClick: onEditorClick
      }, "\xA0"));
    }
  }]);

  return EditorItem;
}(_react["default"].Component);

EditorItem.propTypes = {
  active: _propTypes["default"].bool.isRequired,
  Component: _propTypes["default"].func.isRequired,
  draggable: _propTypes["default"].bool,
  onEditorClick: _propTypes["default"].func.isRequired,
  production: _propTypes["default"].bool.isRequired,
  path: _propTypes["default"].string.isRequired,
  nestingType: _propTypes["default"].string
};
EditorItem.defaultProps = {
  draggable: false,
  nestingType: ''
};
var _default = EditorItem;
exports["default"] = _default;