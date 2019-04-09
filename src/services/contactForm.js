import React from 'react';
import PropTypes from 'prop-types';
import { FORM_ORDER, FORM_INPUTS_DEFAULT } from '../constants/formInputs';

import Drawer from '../components/Drawer';
import InputDate from '../components/InputDate';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import InputTextarea from '../components/InputTextarea';
import Row from '../components/Row';
import Submit from '../components/Submit';
import { shadeColor } from '../utils/utils';

// hydrates the order array with all props for all inputs.
export const getInputs = ({ types, order = FORM_ORDER.BASE } = {}) => {
  // used to set required and active attributes.
  // forces name and email to be required and active
  const setRequiredDefaults = ({ defaults, id, key }) => {
    // start with false just in case required isn't included in defaults and is omitted in custom
    let attribute = false;
    // these are always active and required
    if (['name', 'email'].includes(id)) {
      attribute = true;
    // use config for any keys that aren't in the array above
    } else if (defaults[id] && typeof defaults[id][key] === 'boolean') {
      attribute = defaults[id][key];
    }
    // set required to whatever the custom state is if there is one
    // if (custom[id] && typeof custom[id][key] === 'boolean') {
    //   attribute = custom[id][key];
    // }
    return attribute;
  };

  const getSingleInput = ({ id, items, type, ...rest }) => {
    // recurse if the current item is a parent of other items
    if (['row', 'drawer'].includes(id)) {
      const subItems = items.map(subObject => getSingleInput(subObject));
      const input = {
        id,
        ...FORM_INPUTS_DEFAULT[id],
        items: subItems,
        ...rest,
        ...(type ? { type } : {})
      };
      return input;
    }

    // create the full-fledged input
    const input = {
      id,
      ...(type ? { type } : {}),
      ...(FORM_INPUTS_DEFAULT[id] || {}),
      ...rest,
      // if the field is hidden, never have it be required
      required: rest.hidden ? false : setRequiredDefaults({ defaults: FORM_INPUTS_DEFAULT, id, key: 'required' })
    };

    // set values if default value is supplied
    input.value = input.type === 'date' ? undefined : (rest.value || '');

    // set types to config types instead of defaults
    if (id === 'type' && !input.options && types) input.options = types;

    return input;
  };

  // build array from all keys with defaults overridden with any custom attributes
  const inputs = order.map(obj => getSingleInput(obj));
  return inputs;
};

export const getRenderedInputs = ({
  accordionOpen,
  onAccordionClick,
  inputComponents,
  order,
  style,
  wrapped = C => C
}) => {
  const renderInput = (({ id, items, ...rest }, i, pathPrefix = '') => {
    const path = `${pathPrefix}${i}`;
    if (items) {
      let config;
      let Component;
      switch (id) {
        case 'drawer':
          Component = Drawer;
          config = ({
            ...rest,
            key: `${id}-${i}`,
            isOpen: accordionOpen,
            items: items.map((subItem, ix) => renderInput(subItem, ix, `${path}/items/`)),
            onClick: onAccordionClick,
            path
          });
          break;
        case 'row':
          Component = Row;
          config = ({
            ...rest,
            key: `${id}-${i}`,
            items: items.map((subItem, ix) => renderInput(subItem, ix, `${path}/items/`)),
            path
          });
          break;
        default:
          break;
      }
      return (wrapped(<Component {...config} />));
    }
    if (id === 'submit') {
      return wrapped(<Submit key={i} style={style.submit} path={path} {...rest} />);
    }
    const { Component, ...REST } = inputComponents.find(({ id: arrayID }) => arrayID === id);
    return (
      wrapped(<Component key={i} path={path} {...REST} />)
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
  return order.map((item, i) => renderInput(item, i));
};

export const getInputComponents = (props) => {
  const getInputElement = ({
    hidden = false,
    id,
    label,
    options,
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
      placeholder,
      value,
      required
    };

    switch (type) {
      case 'date':
        return ({
          ...config,
          Component: InputDate,
          error: (required && props.formError && props.eventDate === undefined),
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

// No defaults are set here because they are handled in services/forms.js#getCSS
export const getCSS = ({
  borderStyle,
  borderColor,
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
