"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glamor = require("glamor");

var _Drawer = _interopRequireDefault(require("./Drawer"));

var _EditorItem = _interopRequireDefault(require("./EditorItem"));

var _InputDate = _interopRequireDefault(require("./InputDate"));

var _InputText = _interopRequireDefault(require("./InputText"));

var _InputSelect = _interopRequireDefault(require("./InputSelect"));

var _InputTextarea = _interopRequireDefault(require("./InputTextarea"));

var _Row = _interopRequireDefault(require("./Row"));

var _Submit = _interopRequireDefault(require("./Submit"));

var _css = require("../services/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Signup = function Signup(props) {
  // this getStyles actually creates the 'markup' for CSS in JS
  var style = (0, _css.getStyles)(props.styles, props.order); // this function turns the input objects into JSX. used in the map function below

  var getInputElements = function getInputElements(_ref, i) {
    var _ref$hidden = _ref.hidden,
        hidden = _ref$hidden === void 0 ? false : _ref$hidden,
        id = _ref.id,
        items = _ref.items,
        label = _ref.label,
        options = _ref.options,
        placeholder = _ref.placeholder,
        required = _ref.required,
        type = _ref.type;
    var pathPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var path = "".concat(pathPrefix).concat(i);

    if (id === 'drawer') {
      return dom(_EditorItem["default"], {
        key: path,
        active: props.selectedInput === path,
        Component: _Drawer["default"],
        nestingType: "drawer",
        production: props.production,
        onEditorClick: props.onEditorClick,
        getInputElements: getInputElements,
        isOpen: props.accordionOpen,
        items: items,
        label: label,
        onClick: props.onAccordionClick,
        originIndex: path,
        path: path,
        placeholder: placeholder
      });
    }

    if (id === 'row') {
      return dom(_EditorItem["default"], {
        key: path,
        active: props.selectedInput === path,
        Component: _Row["default"],
        production: props.production,
        nestingType: "row",
        onEditorClick: props.onEditorClick,
        getInputElements: getInputElements,
        items: items,
        originIndex: path,
        path: path,
        type: type
      });
    }

    if (id === 'submit') {
      return dom(_EditorItem["default"], {
        key: path,
        active: props.selectedInput === path,
        Component: _Submit["default"],
        production: props.production,
        onEditorClick: props.onEditorClick,
        label: label,
        path: path,
        style: style.submit
      });
    }

    if (type === 'date') {
      return dom(_EditorItem["default"], {
        key: path,
        active: props.selectedInput === path,
        Component: _InputDate["default"],
        production: props.production,
        onEditorClick: props.onEditorClick,
        draggable: true,
        eventDate: props.eventDate,
        error: required && props.formError && props.eventDate === undefined,
        id: id,
        label: label,
        onDateChange: props.onDateChange,
        path: path,
        placeholder: placeholder,
        required: required,
        windowWidth: props.windowWidth
      });
    }

    var Input = _InputText["default"];
    var dynamicOnChange = props.onInputChange;

    var dynamicOnBlur = function dynamicOnBlur() {};

    if (type === 'select') {
      Input = _InputSelect["default"];
    } else if (type === 'textarea') {
      Input = _InputTextarea["default"];
    } else if (type === 'phone') {
      dynamicOnBlur = props.onPhoneBlur;
    } else if (type === 'email') {
      dynamicOnBlur = props.onEmailBlur;
    } else if (type === 'currency') {
      dynamicOnChange = props.onAmountChange;
    }

    return dom(_EditorItem["default"], {
      key: path,
      active: props.selectedInput === path,
      Component: Input,
      production: props.production,
      onEditorClick: props.onEditorClick,
      classes: "F__g--".concat(id),
      draggable: true,
      error: required && props.formError !== '' && props[id] === '',
      id: id,
      label: label,
      onChange: dynamicOnChange,
      onBlur: dynamicOnBlur,
      options: options ? [['', placeholder]].concat(_toConsumableArray(options)) : false,
      path: path,
      placeholder: placeholder,
      style: _objectSpread({}, hidden ? {
        display: 'none'
      } : {}),
      value: props[id],
      valueRequired: required
    });
  };

  var errorClasses = [].concat(_toConsumableArray(props.formError ? ['F__E--form'] : []), _toConsumableArray(props.emailError ? ['F__E--email'] : []), _toConsumableArray(props.phoneError ? ['F__E--phone'] : []));
  return dom("div", _extends({
    className: "Signup ".concat(props.classes ? props.classes : '').concat(props.order ? ' Signup--custom-order' : '')
  }, (0, _glamor.css)(style.signup)), dom("div", {
    className: "Signup__success".concat(props.signupSuccess ? ' Signup__success--vis' : '')
  }, props.signupSuccess && dom("div", {
    className: "Signup__success--txt"
  }, dom("h2", {
    className: "Signup__success-head h4"
  }, props.signupSuccessHeading), dom("p", {
    className: "Signup__success-msg h4"
  }, props.signupSuccessMessage), dom("button", _extends({}, (0, _glamor.css)(style.submit), {
    className: "Signup__success-b B B--p",
    onClick: props.onSignupComplete
  }), props.signupSuccessButton))), dom("div", {
    className: "F__E".concat(errorClasses.length > 0 ? " F__E--active ".concat(errorClasses.join(' '), " F__E--").concat(errorClasses.length) : '')
  }, props.formError && dom("p", null, props.formError), props.emailError && dom("p", null, props.emailError), props.phoneError && dom("p", null, props.phoneError)), dom("form", {
    className: "F",
    onSubmit: props.onSubmit
  }, props.inputs.map(function (input, index) {
    return getInputElements(input, index);
  })));
};

Signup.propTypes = {
  accordionOpen: _propTypes["default"].bool.isRequired,
  classes: _propTypes["default"].string.isRequired,
  email: _propTypes["default"].string.isRequired,
  emailError: _propTypes["default"].string.isRequired,
  eventDate: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]),
  formError: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string.isRequired,
  inputs: _propTypes["default"].array,
  styles: _propTypes["default"].shape({
    backgroundColor: _propTypes["default"].string,
    borderColor: _propTypes["default"].string,
    drawerColor: _propTypes["default"].string,
    drawerColorBg: _propTypes["default"].string,
    labelColor: _propTypes["default"].string,
    negativeColor: _propTypes["default"].string,
    negativeColorBg: _propTypes["default"].string,
    placeholderColor: _propTypes["default"].string,
    positiveColor: _propTypes["default"].string,
    positiveColorHover: _propTypes["default"].string,
    textColor: _propTypes["default"].string,
    width: _propTypes["default"].string
  }).isRequired,
  order: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].array]),
  onEditorClick: _propTypes["default"].func.isRequired,
  onAccordionClick: _propTypes["default"].func.isRequired,
  onAmountChange: _propTypes["default"].func.isRequired,
  onDateChange: _propTypes["default"].func.isRequired,
  onEmailBlur: _propTypes["default"].func.isRequired,
  onInputChange: _propTypes["default"].func.isRequired,
  onPhoneBlur: _propTypes["default"].func.isRequired,
  onSignupComplete: _propTypes["default"].func.isRequired,
  onSubmit: _propTypes["default"].func.isRequired,
  phoneError: _propTypes["default"].string.isRequired,
  production: _propTypes["default"].bool.isRequired,
  selectedInput: _propTypes["default"].string.isRequired,
  signupSuccess: _propTypes["default"].bool.isRequired,
  signupSuccessButton: _propTypes["default"].string.isRequired,
  signupSuccessHeading: _propTypes["default"].string.isRequired,
  signupSuccessMessage: _propTypes["default"].string.isRequired,
  submitText: _propTypes["default"].string,
  windowWidth: _propTypes["default"].number.isRequired
};
Signup.defaultProps = {
  inputs: [],
  eventDate: undefined,
  order: false,
  submitText: undefined
};
var _default = Signup;
exports["default"] = _default;