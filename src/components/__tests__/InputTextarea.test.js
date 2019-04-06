// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import InputTextarea from '../InputTextarea';
import { textarea as textareaProps } from '../../fixtures/input';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<InputTextarea {...textareaProps} />);
});

test('should render InputTextarea correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should not render label in InputTextarea', () => {
  const noLabelProps = {
    ...textareaProps,
    label: ''
  };
  wrapper = shallow(<InputTextarea {...noLabelProps} />);
  expect(wrapper.find('label').exists()).toEqual(false);
});

test('should render with error class when error is present', () => {
  expect(wrapper.find('.F__i--err')).toHaveLength(0);
  const errorProps = {
    ...textareaProps,
    error: true
  };
  wrapper = shallow(<InputTextarea {...errorProps} />);
  expect(wrapper.find('.F__i--err')).toHaveLength(1);
});

test('should render with required class when required', () => {
  expect(wrapper.find('.F__l--req')).toHaveLength(0);
  const requiredProps = {
    ...textareaProps,
    required: true
  };
  wrapper = shallow(<InputTextarea {...requiredProps} />);
  expect(wrapper.find('.F__l--req')).toHaveLength(1);
});

test('should not allow type attribute even if type supplied', () => {
  expect(wrapper.find('textarea')).toHaveLength(1);
  expect(wrapper.find('[type="text"]')).toHaveLength(0);
  const numberProps = {
    ...textareaProps,
    type: 'text'
  };
  wrapper = shallow(<InputTextarea {...numberProps} />);
  expect(wrapper.find('[type="text"]')).toHaveLength(0);
});
