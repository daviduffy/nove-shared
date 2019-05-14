// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import Row from '../Row';
import { FORM_ORDER } from '../../constants/formInputs';
import { customLayout } from '../../fixtures/forms';
import * as forms from '../../services/contactForm';

// not testing 'remote config' because fetch is performed by SignupRetriever
let wrapper;
const props = { ...customLayout.inputs[2] };

const hydratedInputs = forms.getHydratedInputs({ inputs: customLayout.inputs });
const renormalizedInputs = forms.renormalizeInputs(hydratedInputs);
const row = renormalizedInputs.find(({ id }) => id === 'row');

const inputComponents = forms.getInputConfig({
  // this is the flattened inputs with values in SignupContainer
  formError: false,
  onDateChange: () => {},
  onInputChange: () => {},
  inputs: hydratedInputs,
  windowWidth: 1000
});

const renderedInputs = forms.getRenderedComponents({
  accordionOpen: false,
  inputComponents,
  onAccordionClick: () => {},
  renormalizedInputs: row.items, // this is awkward
  style: {}
});
props.items = renderedInputs;

beforeEach(() => {
  wrapper = shallow(<Row {...props} />);
});

// row
// =================================================================================================
test('should render row normally', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should show items within row', () => {
  expect(wrapper.find('.F__r').children()).toHaveLength(2);
});

test('should display custom row class if present', () => {
  const className = wrapper.find('.F__r').prop('className');
  expect(className).toEqual('F__r F__r--2:1x2');
});
