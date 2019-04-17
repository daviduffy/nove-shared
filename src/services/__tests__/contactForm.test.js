// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import { getInputs, getRenderedComponents, getInputConfig, getCSS, getStyles, flattenInputs } from '../contactForm';
import { EVENT_TYPES_COMMON } from '../../constants/eventTypes';
import { FORM_ORDER } from '../../constants/formInputs';

test('should return correctly shaped input components', () => {
  const style = getCSS(getStyles({}));
  const inputs = getInputs({ types: EVENT_TYPES_COMMON, order: FORM_ORDER.FULL });
  const flattenedInputs = flattenInputs(inputs);
  const inputComponents = getInputConfig({
    eventDate: null,
    formError: '',
    inputs: flattenedInputs,
    onAmountChange: () => {},
    onDateChange: () => {},
    onEmailBlur: () => {},
    onInputChange: () => {},
    onPhoneBlur: () => {},
    windowWidth: 700
  });
  const renderedInputs = getRenderedComponents({
    accordionOpen: true,
    inputComponents,
    onAccordionClick: () => {},
    order: inputs, // this is awkward
    style
  });

  const Name = inputs.find(({ id }) => id === 'name');
  const Drawer = inputs.find(({ id }) => id === 'drawer');

  expect(Name.path).toEqual('0');
  expect(Drawer.path).toEqual('5');
  expect(Drawer.items.find(({ id }) => id === 'eventLocale').path).toEqual('5/1');
});

test('should return wrap input components when wrapped func is passed', () => {
  const style = getCSS(getStyles({}));
  const inputs = getInputs({ types: EVENT_TYPES_COMMON, order: FORM_ORDER.FULL });
  const flattenedInputs = flattenInputs(inputs);
  const onClickSpy = jest.fn();
  const wrapped = Component => (
    <div>
      {Component}
      <button onClick={onClickSpy}>{"i'm a button"}</button>
    </div>
  );
  const inputComponents = getInputConfig({
    eventDate: null,
    formError: '',
    inputs: flattenedInputs,
    onAmountChange: () => {},
    onDateChange: () => {},
    onEmailBlur: () => {},
    onInputChange: () => {},
    onPhoneBlur: () => {},
    windowWidth: 700
  });
  const renderedInputs = getRenderedComponents({
    accordionOpen: true,
    inputComponents,
    onAccordionClick: () => {},
    order: inputs, // this is awkward
    style,
    wrapped
  });

  const [C] = renderedInputs;
  const wrapper = shallow(<div>{C}</div>);
  wrapper.find('button').prop('onClick')();
  expect(onClickSpy).toHaveBeenCalled();
});
