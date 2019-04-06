import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '../components/Drawer';
import InputDate from '../components/InputDate';
import InputText from '../components/InputText';
import InputSelect from '../components/InputSelect';
import InputTextarea from '../components/InputTextarea';
import Row from '../components/Row';
import Submit from '../components/Submit';

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
