// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import Row from '../Row';
import { customLayout } from '../../fixtures/forms';
import { getInputs, getInputComponents, getRenderedInputs } from '../../services/contactForm';

// not testing 'remote config' because fetch is performed by SignupRetriever
let wrapper;
const props = { ...customLayout.order[2] };

const inputComponents = getInputComponents({
  // this is the flattened inputs with values in SignupContainer
  formError: false,
  onDateChange: () => {},
  onInputChange: () => {},
  inputs: getInputs({ order: props.items }),
  windowWidth: 1000
});

const renderedInputs = getRenderedInputs({
  accordionOpen: false,
  inputComponents,
  onAccordionClick: () => {},
  order: props.items, // this is awkward
  style: {}
});
props.items = renderedInputs;

beforeEach(() => {
  wrapper = shallow(<Row {...props} />);
});

// row
// =================================================================================================
test.only('should render row normally', () => {
  expect(wrapper).toMatchSnapshot();
});

test.only('should show items within row', () => {
  expect(wrapper.find('.F__r').children()).toHaveLength(2);
});

test.only('should display custom row class if present', () => {
  const className = wrapper.find('.F__r').prop('className');
  expect(className).toEqual('F__r F__r--2:1x2');
});
