import React from 'react';
import PropTypes from 'prop-types';
import { FORM_ORDER, FORM_INPUTS_DEFAULT } from 'nove-common';

import Drawer from '../components/Drawer';
import InputDate from '../components/InputDate';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import InputTextarea from '../components/InputTextarea';
import Row from '../components/Row';
import Submit from '../components/Submit';

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
  // console.log(inputs);
  return inputs;
};

export const getRenderedInputs = ({
  accordionOpen,
  onAccordionClick,
  inputComponents,
  order,
  style
}) => {
  const renderInput = (({ id, items, ...rest }, i) => {
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
            items: items.map(renderInput),
            onClick: onAccordionClick
          });
          break;
        case 'row':
          Component = Row;
          config = ({
            ...rest,
            key: `${id}-${i}`,
            items: items.map(renderInput)
          });
          break;
        default:
          break;
      }
      return (<Component {...config} />);
    }
    if (id === 'submit') return (<Submit key={i} style={style.submit} {...rest} />);
    const { Component, ...REST } = inputComponents.find(({ id: arrayID }) => arrayID === id);
    return (
      <Component key={i} {...REST} />
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
  return order.map(renderInput);
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
    return ({
      ...config,
      classes: `F__g--${id}`,
      error: required && props.formError !== '' && value === '',
      onChange: dynamicOnChange,
      onBlur: dynamicOnBlur,
      style: ({ ...(hidden ? { display: 'none' } : {}) }),
      required
    });
  };
  return props.inputs.map(getInputElement);
};
