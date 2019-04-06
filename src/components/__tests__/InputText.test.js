// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import InputText from '../InputText';
import { text as textProps } from '../../fixtures/input';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<InputText {...textProps} />);
});

test('should render InputText correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should pass in custom classes if present', () => {
  const classes = 'bubberge';
  expect(wrapper.find(`.${classes}`)).toHaveLength(0);
  const errorProps = {
    ...textProps,
    classes
  };
  wrapper = shallow(<InputText {...errorProps} />);
  expect(wrapper.find(`.${classes}`)).toHaveLength(1);
});

test('should render with error class when error is present', () => {
  expect(wrapper.find('.F__i--err')).toHaveLength(0);
  const errorProps = {
    ...textProps,
    error: true
  };
  wrapper = shallow(<InputText {...errorProps} />);
  expect(wrapper.find('.F__i--err')).toHaveLength(1);
});

test('should render with required class when required', () => {
  expect(wrapper.find('.F__l--req')).toHaveLength(0);
  const requiredProps = {
    ...textProps,
    required: true
  };
  wrapper = shallow(<InputText {...requiredProps} />);
  expect(wrapper.find('.F__l--req')).toHaveLength(1);
});

test('should change to a different input type if type supplied', () => {
  expect(wrapper.find('[type="text"]')).toHaveLength(1);
  expect(wrapper.find('[type="number"]')).toHaveLength(0);
  const numberProps = {
    ...textProps,
    type: 'number'
  };
  wrapper = shallow(<InputText {...numberProps} />);
  expect(wrapper.find('[type="text"]')).toHaveLength(0);
  expect(wrapper.find('[type="number"]')).toHaveLength(1);
});
