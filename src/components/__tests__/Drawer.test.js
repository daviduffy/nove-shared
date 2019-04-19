// External Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Internal Dependencies
import Drawer from '../Drawer';
import { FORM_INPUTS_DEFAULT, FORM_ORDER } from '../../constants/formInputs';
import { customDrawerText, stuffedDrawer } from '../../fixtures/forms';
import * as forms from '../../services/contactForm';

// not testing 'remote config' because fetch is performed by SignupRetriever
let wrapper;
const props = {
  isOpen: false,
  ...FORM_INPUTS_DEFAULT.drawer,
  ...FORM_ORDER.FULL[5],
  onClick: () => {}
};

const hydratedInputs = forms.getHydratedInputs({ inputs: FORM_ORDER.FULL });
const renormalizedInputs = forms.renormalizeInputs(hydratedInputs);
const drawer = renormalizedInputs.find(({ id }) => id === 'drawer');

const inputComponents = forms.getInputConfig({
  // this is the flattened inputs with values in SignupContainer
  formError: false,
  onInputChange: () => {},
  inputs: hydratedInputs,
  windowWidth: 1000
});
// console.log(drawer);
const renderedInputs = forms.getRenderedComponents({
  accordionOpen: false,
  inputComponents,
  onAccordionClick: () => {},
  renormalizedInputs: drawer.items, // this is awkward
  style: {}
});

props.items = renderedInputs;

beforeEach(() => {
  wrapper = shallow(<Drawer {...props} />);
});

// drawer
// =================================================================================================
test('should render drawer normally', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should display normal drawer label and placeholder', () => {
  expect(wrapper.find('#drawer_placeholder').text()).toBe(FORM_INPUTS_DEFAULT.drawer.placeholder);
  expect(wrapper.find('.F__g--more > .F__l').text()).toBe(FORM_INPUTS_DEFAULT.drawer.label);
});

test('should display custom drawer placeholder text and no label', () => {
  const renormalizedInputs = forms.renormalizeInputs(customDrawerText.order);
  const drawer = customDrawerText.order.find(({ id }) => id === 'drawer');
  const customProps = { ...props, placeholder: drawer.placeholder, label: '' };
  wrapper = shallow(<Drawer {...customProps} />);
  // should not output label if label set to empty string
  expect(wrapper.find('.F__g--more > .F__l')).toHaveLength(0);
  expect(wrapper.find('#drawer_placeholder').text()).toBe(drawer.placeholder);
});

test('should show items within drawer', () => {
  expect(wrapper.find('.Acrd__cont').children()).toHaveLength(2);
});

test('should set drawer height correctly when multiple items are in it', () => {
  const renormalizedInputs = forms.renormalizeInputs(stuffedDrawer.order);
  const drawer = stuffedDrawer.order.find(({ id }) => id === 'drawer');
  const customProps = { ...props, ...drawer };
  const maxHeightWhenOpen = (drawer.items.length * 110) + 24;
  wrapper = shallow(<Drawer {...customProps} />);
  expect(wrapper.find('.Acrd__cont-c').prop('style')).toEqual({ maxHeight: 0 });
  const customPropsOpen = { ...customProps, isOpen: true };
  wrapper = shallow(<Drawer {...customPropsOpen} />);
  expect(wrapper.find('.Acrd__cont-c').prop('style')).toEqual({ maxHeight: `${maxHeightWhenOpen}px` });
});
