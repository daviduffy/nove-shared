import { getInputs, getRenderedInputs, getInputComponents, getCSS, getStyles, flattenInputs } from '../contactForm';
import { EVENT_TYPES_COMMON } from '../../constants/eventTypes';
import { FORM_ORDER } from '../../constants/formInputs';

test('should return correctly shaped input components', () => {
  const style = getCSS(getStyles({}));
  const inputs = getInputs({ types: EVENT_TYPES_COMMON, order: FORM_ORDER.FULL });
  const flattenedInputs = flattenInputs(inputs);
  const inputComponents = getInputComponents({
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
  const renderedInputs = getRenderedInputs({
    accordionOpen: true,
    inputComponents,
    onAccordionClick: () => {},
    order: inputs, // this is awkward
    style
  });
  expect(renderedInputs[0].props.path).toEqual('0');
  expect(renderedInputs[5].props.path).toEqual('5');
  expect(renderedInputs[5].props.items[1].props.path).toEqual('5/items/1');
});
