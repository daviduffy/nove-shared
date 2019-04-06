// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import InputSelect from '../InputSelect';
import { select as selectProps } from '../../fixtures/input';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<InputSelect {...selectProps} />);
});

test('should render InputSelect correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should not render label in InputSelect', () => {
  const noLabelProps = {
    ...selectProps,
    label: ''
  };
  wrapper = shallow(<InputSelect {...noLabelProps} />);
  expect(wrapper.find('label').exists()).toEqual(false);
});

test('should render with error class when error is present', () => {
  expect(wrapper.find('.F__i--err')).toHaveLength(0);
  const errorProps = {
    ...selectProps,
    error: true
  };
  wrapper = shallow(<InputSelect {...errorProps} />);
  expect(wrapper.find('.F__i--err')).toHaveLength(1);
});

test('should render with required class when required', () => {
  expect(wrapper.find('.F__l--req')).toHaveLength(0);
  const requiredProps = {
    ...selectProps,
    required: true
  };
  wrapper = shallow(<InputSelect {...requiredProps} />);
  expect(wrapper.find('.F__l--req')).toHaveLength(1);
});

test('should not allow type attribute even if type supplied', () => {
  expect(wrapper.find('select')).toHaveLength(1);
  expect(wrapper.find('[type="text"]')).toHaveLength(0);
  const numberProps = {
    ...selectProps,
    type: 'text'
  };
  wrapper = shallow(<InputSelect {...numberProps} />);
  expect(wrapper.find('[type="text"]')).toHaveLength(0);
});
