// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import * as form from '../contactForm';
import { EVENT_TYPES_COMMON } from '../../constants/eventTypes';
import { FORM_ORDER } from '../../constants/formInputs';

const denormJSON = require('../../fixtures/denormalizedContactForm.json');

// test('should return correctly shaped input components', () => {
//   const style = form.getCSS(form.getStyles({}));
//   const inputs = form.getHydratedOrder({ types: EVENT_TYPES_COMMON, order: FORM_ORDER.FULL });
//   const flattenedInputs = form.flattenInputs(inputs);
//   const inputComponents = form.getInputConfig({
//     eventDate: null,
//     formError: '',
//     inputs: flattenedInputs,
//     onAmountChange: () => {},
//     onDateChange: () => {},
//     onEmailBlur: () => {},
//     onInputChange: () => {},
//     onPhoneBlur: () => {},
//     windowWidth: 700
//   });
//   const renderedInputs = form.getRenderedComponents({
//     accordionOpen: true,
//     inputComponents,
//     onAccordionClick: () => {},
//     order: inputs, // this is awkward
//     style
//   });

//   const Name = inputs.find(({ id }) => id === 'name');
//   const Drawer = inputs.find(({ id }) => id === 'drawer');

  // expect(Name.path).toEqual('0');
  // expect(Drawer.path).toEqual('5');
  // expect(Drawer.items.find(({ id }) => id === 'eventLocale').path).toEqual('5/1');
// });

// test('should return wrap input components when wrapped func is passed', () => {
//   const style = form.getCSS(form.getStyles({}));
//   const inputs = form.getHydratedOrder({ types: EVENT_TYPES_COMMON, order: FORM_ORDER.FULL });

//   const hydratedInputs = form.getHydratedOrder({ order: denormJSON.order });
//   const renormalizedInputs = form.renormalizeInputs(hydratedInputs);

//   const flattenedInputs = form.flattenInputs(inputs);
//   const onClickSpy = jest.fn();
//   const wrapped = Component => (
//     <div>
//       {Component}
//       <button onClick={onClickSpy}>{"i'm a button"}</button>
//     </div>
//   );
//   const inputComponents = form.getInputConfig({
//     eventDate: null,
//     formError: '',
//     inputs: flattenedInputs,
//     onAmountChange: () => {},
//     onDateChange: () => {},
//     onEmailBlur: () => {},
//     onInputChange: () => {},
//     onPhoneBlur: () => {},
//     windowWidth: 700
//   });
//   const renderedInputs = form.getRenderedComponents({
//     accordionOpen: true,
//     inputComponents,
//     onAccordionClick: () => {},
//     order: inputs, // this is awkward
//     style,
//     wrapped
//   });

//   const [C] = renderedInputs;
//   const wrapper = shallow(<div>{C}</div>);
//   wrapper.find('button').prop('onClick')();
//   expect(onClickSpy).toHaveBeenCalled();
// });

test('', () => {
  // console.log(form.denormalizeInputs(FORM_ORDER.FULL));
});

test('should hydrate denormalized inputs correctly', () => {
  const hydratedInputs = form.getHydratedOrder({ order: denormJSON.order });

  const [I1, I2, I3, I4, I5, I6] = hydratedInputs;

  expect(I1).toEqual(expect.objectContaining({ path: '0', required: true }));
  expect(I2).toEqual(expect.objectContaining({ path: '1', placeholder: 'your@email.com' }));
  expect(I3).toEqual(expect.objectContaining({ path: '2', id: 'row' }));
  expect(I4).toEqual(expect.objectContaining({ path: '2/0', label: 'Event Type' }));
  expect(I5).toEqual(expect.objectContaining({ path: '2/1', placeholder: 'On or around' }));
  expect(I6).toEqual(expect.objectContaining({ path: '3', id: 'referralSource' }));
});

test('should structure renormalized inputs correctly', () => {
  const hydratedInputs = form.getHydratedOrder({ order: denormJSON.order });
  const renormalizedInputs = form.renormalizeInputs(hydratedInputs);

  const [I1, I2, I3, I4] = renormalizedInputs;

  expect(I1).toEqual(expect.objectContaining({ path: '0', required: true }));
  expect(I2).toEqual(expect.objectContaining({ path: '1', placeholder: 'your@email.com' }));
  expect(I3).toEqual(expect.objectContaining({ path: '2', id: 'row' }));
  expect(I3.items[0]).toEqual(expect.objectContaining({ path: '2/0', label: 'Event Type' }));
  expect(I3.items[1]).toEqual(expect.objectContaining({ path: '2/1', placeholder: 'On or around' }));
  expect(I4).toEqual(expect.objectContaining({ path: '3', id: 'referralSource' }));
});

