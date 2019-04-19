// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';
import { FORM_INPUTS_DEFAULT } from 'nove-common';

// Internal Dependencies
import Submit from '../Submit';
import { customSubmitStyle } from '../../fixtures/forms';
import { getCSS, getStyles } from '../../services/contactForm';

// not testing 'remote config' because fetch is performed by SignupRetriever
let wrapper;
const props = {
  style: getCSS(getStyles(customSubmitStyle)),
  ...FORM_INPUTS_DEFAULT.submit
};

// console.log(props);

beforeEach(() => {
  wrapper = shallow(<Submit {...props} />);
});

// submit
// =================================================================================================
test('should display normal submit label and placeholder', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should display custom submit text', () => {
  const newProps = { ...props, label: 'go' };
  wrapper = shallow(<Submit {...newProps} />);
  expect(wrapper.find('.F__sb').text()).toBe(newProps.label);
});
