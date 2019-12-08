import React from 'react';
import PropTypes from 'prop-types';
import { FORM_ORDER, FORM_INPUTS_DEFAULT } from '../constants/formInputs';
import { EVENT_TYPES_COMMON } from '../constants/eventTypes';

import Drawer from '../components/Drawer';
import InputDate from '../components/InputDate';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import InputTextarea from '../components/InputTextarea';
import Row from '../components/Row';
import Submit from '../components/Submit';
import { shadeColor, titleize } from '../utils/utils';

// hydrates the inputs array with all props for all inputs.
// formerly getInputs
export const getHydratedInputs = ({ inputs = FORM_ORDER.BASE } = {}) => {
  // used to set required and active attributes.
  // forces name and email to be required and active
  const setRequiredDefaults = ({ id, required = false }) => {
    // these are always active and required
    if (['name', 'email'].includes(id)) {
      return true;
    // if the config passed that this input is required, require it
    } else if (required === true) {
      return true;
    // use config for any keys that aren't in the array above
    } else if (FORM_INPUTS_DEFAULT[id] && typeof FORM_INPUTS_DEFAULT[id].required === 'boolean') {
      return FORM_INPUTS_DEFAULT[id].required;
    }
    // otherwise it probably ain't required
    return false;
  };

  const getSingleInput = ({ id, items, type, label, vanityName, ...rest } = {}, index, pathPrefix = '') => {
    const path = `${pathPrefix}${index}`;
    const defaults = FORM_INPUTS_DEFAULT[id] || {};
    let defaultLabel;
    if (label === undefined && defaults.label) {
      defaultLabel = defaults.label;
    } else if (rest.name) {
      defaultLabel = titleize(rest.name);
    } else {
      defaultLabel = id;
    }

    // create the full-fledged input
    const input = {
      id,
      ...(type ? { type } : {}),
      ...(FORM_INPUTS_DEFAULT[id] || {}), // default label, placeholder, type, options
      path,
      ...(label !== undefined ? { label } : { label: defaultLabel }), // overwrite default label if supplied by user
      ...rest
    };

    // if the field is hidden, never have it be required
    const required = rest.hidden ? false : setRequiredDefaults({ id, required: rest.required });

    // set values if this is an controllable input, and if default value is supplied
    if (!['row', 'drawer', 'submit'].includes(id)) {
      input.value = input.type === 'date' ? undefined : (rest.value || '');
      input.required = required;
    }

    return input;
  };

  // build array from all keys with defaults overridden with any custom attributes
  return inputs.map((obj, index) => getSingleInput(obj, index));
};

// accepts a flat array and props and returns a ready-to-render config for each input
export const getInputConfig = (props) => {
  const getInputElement = ({
    hidden = false,
    id,
    label,
    options,
    path,
    placeholder,
    required,
    type,
    value
  }) => {
    let dynamicOnChange = props.onInputChange;
    let dynamicOnBlur = () => {};
    const config = {
      Component: InputText,
      label,
      id,
      path,
      placeholder,
      value,
      required
    };

    switch (type) {
      case 'date':
        return ({
          ...config,
          Component: InputDate,
          error: (!!required && !!props.formError && props.eventDate === undefined),
          onDateChange: props.onDateChange,
          value: props.eventDate,
          windowWidth: props.windowWidth
        });
      case 'select':
        config.Component = InputSelect;
        config.options = options ? [['', placeholder], ...options] : false;
        break;
      case 'textarea':
        config.Component = InputTextarea;
        break;
      case 'phone':
        dynamicOnBlur = props.onPhoneBlur;
        break;
      case 'email':
        dynamicOnBlur = props.onEmailBlur;
        break;
      case 'currency':
        dynamicOnChange = props.onAmountChange;
        break;
      default:
        break;
    }
    const output = {
      ...config,
      classes: `F__g--${id}`,
      error: required && props.formError !== '' && value === '',
      onChange: dynamicOnChange,
      onBlur: dynamicOnBlur,
      style: ({ ...(hidden ? { display: 'none' } : {}) }),
      required
    };
    return output;
  };
  const { inputs } = props;

  const inputElements = inputs.map(getInputElement);
  return inputElements;
};

export const getRenderedComponents = ({
  accordionOpen,
  onAccordionClick,
  inputComponents,
  renormalizedInputs,
  style,
  wrapped = C => C
}) => {
  const renderInput = (({ id, items, ...rest }, i) => {
    if (['drawer', 'row'].includes(id)) {
      let config;
      let Component;
      switch (id) {
        case 'drawer':
          Component = Drawer;
          config = ({
            ...rest,
            id,
            key: `${id}-${i}`,
            isOpen: accordionOpen,
            onClick: onAccordionClick
          });
          if (items && items.length > 0) config.items = items.map((subItem, ix) => renderInput(subItem, ix));
          break;
        case 'row':
          Component = Row;
          config = ({
            ...rest,
            id,
            key: `${id}-${i}`,
            items: items.map((subItem, ix) => renderInput(subItem, ix))
          });
          break;
        default:
          break;
      }
      return (wrapped(<Component {...config} />));
    }
    if (id === 'submit') {
      return wrapped(<Submit key={i} id={id} style={style.submit} {...rest} />);
    }
    const { Component, ...REST } = inputComponents.find(({ id: arrayID }) => arrayID === id);
    return (
      wrapped(<Component key={i} {...REST} />)
    );
  });
  renderInput.propTypes = {
    id: PropTypes.string.isRequired,
    items: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array
    ])
  };
  renderInput.defaultProps = { items: false };
  return renormalizedInputs.map((item, i) => renderInput(item, i));
};

// No defaults are set here because they are handled in services/forms.js#getCSS
export const getCSS = ({
  borderStyle,
  borderColor,
  buttonTextColor,
  drawerBackgroundColor,
  drawerTextColor,
  inputBackgroundColor,
  inputTextColor,
  labelTextColor,
  negativeColor,
  negativeColorBg,
  positiveColor,
  positiveColorHover,
  placeholderColor,
  width
}) => {
  const unsetStyles = {
    fontWeight: '300px!important',
    color: `${placeholderColor}!important`
  };
  let processedBorderStyle = {};
  if (borderStyle === 'underline') {
    processedBorderStyle = { borderTop: 0, borderRight: 0, borderLeft: 0, borderRadius: 0 };
  } else if (borderStyle === 'none') {
    processedBorderStyle = { border: 0 };
  }
  const signup = {
    '&': { width: `${width}!important` },
    '& .F__l.F__l': { color: labelTextColor },
    '& .F__i.F__i': {
      color: inputTextColor,
      borderColor,
      ...processedBorderStyle,
      backgroundColor: inputBackgroundColor
    },
    '& .F__i.F__i:hover, & .F__i.F__i:focus, & .F__i.F__i:active': {
      color: inputTextColor,
      backgroundColor: inputBackgroundColor
    },
    '& .F__i--err.F__i--err': { borderColor: `${negativeColor}!important` },
    '& .Acrd__trg.Acrd__trg': {
      borderColor,
      backgroundColor: drawerBackgroundColor,
      color: drawerTextColor
    },
    '& .Acrd__trg.Acrd__trg::after': { color: drawerTextColor },
    '& .Acrd__trg.Acrd__trg span': { color: drawerTextColor },
    '& .F__l--req.F__l--req span::after': { color: negativeColor },
    '& .F__E--form.F__E--form, & .F__E--email.F__E--email': {
      color: negativeColor,
      borderColor: negativeColor,
      backgroundColor: negativeColorBg
    },
    '& .F__i--is-unset.F__i--is-unset': unsetStyles,
    '& ::-webkit-input-placeholder': unsetStyles,
    '& ::-moz-placeholder': unsetStyles,
    '& :-ms-input-placeholder': unsetStyles,
    '& ::placeholder': unsetStyles
  };
  const submit = {
    backgroundColor: `${positiveColor}!important`,
    color: `${buttonTextColor}!important`,
    ':hover': { backgroundColor: `${positiveColorHover}!important` },
    ':focus': { backgroundColor: `${positiveColorHover}!important` },
    ':active': { backgroundColor: `${positiveColorHover}!important` }
  };

  return ({
    signup,
    submit
  });
};

export const getStyles = ({
  borderStyle,
  borderColor,
  buttonTextColor,
  drawerBackgroundColor,
  drawerTextColor,
  inputBackgroundColor,
  inputTextColor,
  labelTextColor,
  negativeColor,
  positiveColor,
  placeholderColor,
  width
} = {}) => ({
  borderStyle: ['full', 'underline', 'none'].includes(borderStyle) ? borderStyle : 'full',
  borderColor: borderColor || '#b3b3b3',
  buttonTextColor: buttonTextColor || '#fefefe',
  drawerBackgroundColor: drawerBackgroundColor || '#eeeeee',
  drawerTextColor: drawerTextColor || '#707070',
  inputBackgroundColor: inputBackgroundColor || '#fefefe',
  inputTextColor: inputTextColor || '#444444',
  labelTextColor: labelTextColor || '#444444',
  negativeColor: negativeColor || '#e74c3c',
  negativeColorBg: shadeColor(negativeColor || '#e74c3c', 0.8),
  positiveColor: positiveColor || '#2ecc71',
  positiveColorHover: shadeColor(positiveColor || '#2ecc71', -0.09),
  placeholderColor: placeholderColor || '#b3b3b3',
  width: width || '560px'
});

// un-nests inputs into flattened array
export const flattenInputs = (arr) => {
  const flattenedInputs = arr.reduce((acc, curr) => {
    if (curr.items) {
      let itemsToAdd;
      const hasChildren = curr.items.some(({ items }) => items);
      if (hasChildren) {
        itemsToAdd = flattenInputs(curr.items);
      } else {
        itemsToAdd = curr.items;
      }
      return [...acc, ...itemsToAdd];
    }
    return [...acc, curr];
  }, []);
  return flattenedInputs;
};

// un-nests inputs into flattened array
export const denormalizeInputs = (arr) => {
  const inputs = [];
  const getflattenedInputs = ({ curr, index }) => {

    // if this is a row or the drawer
    if (curr.items) {

      // strip off items to be added to the new flat array
      const { items, ...rest } = curr;

      // push up just the current input
      inputs.push(rest);

      // push up any nested inputs
      items.forEach((CURR, INDEX) => getflattenedInputs({ curr: CURR, index: INDEX }));

    // otherwise just push the input
    } else {
      inputs.push(curr);
    }
  };
  arr.forEach((curr, index) => getflattenedInputs({ curr, index }));
  return inputs;
};

// un-nests inputs into flattened array
export const renormalizeInputs = (arr) => {
  const inputs = [];
  const getNestedInputs = ({ curr }) => {

    // get path to final resting place of current input
    const path = curr.path.split('/').map((val, i) => i % 2 === 0 ? parseInt(val, 10) : val);

    // eslint-disable-next-line
    const [L1, rootParent, L2, parent2, L3] = path;
    let parent, resetItems;

    // top-level item
    if (path.length === 1) {
      return inputs.push(curr);

    // one level of nesting (regular drawer or row)
    } else if (path.length === 3) {
      if (L2 === 0) resetItems = true;
      parent = inputs[L1];

    // two levels of nesting (row inside of drawer)
    } else {
      if (L3 === 0) resetItems = true;
      parent = inputs[L1].items[L2];
    }

    // push current into correct array within parent element
    // resetItems is used to ensures nested array is reset to [] before reconstituting
    const items = [...(resetItems ? [] : parent.items), curr];
    parent.items = items;
  };

  arr.forEach((curr, index) => getNestedInputs({ curr }));
  return inputs;
};
