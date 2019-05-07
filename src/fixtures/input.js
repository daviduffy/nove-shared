import { STATES } from '../constants/states';

export const text = {
  id: 'name',
  label: 'Input Label',
  placeholder: 'Name',
  classes: 'F__g--name',
  error: false,
  required: false,
  autoFocus: false,
  value: 'Bim Ellen',
  onChange: () => {}
};
export const textarea = {
  id: 'message',
  classes: 'F__g--name',
  label: 'Input Label',
  placeholder: 'Spill the details, honey',
  value: 'Chicken fatback swine salami. Capicola venison chuck, hamburger picanha meatball ham ball tip kevin tri-tip salami prosciutto.',
  onChange: () => {},
  error: false,
  // these are not props on the component
  required: false,
  autoFocus: false
};
export const select = {
  id: 'message',
  label: 'Input Label',
  classes: 'F__g--name',
  value: '',
  onChange: () => {},
  options: STATES,
  // these are not props on the component
  required: false,
  autoFocus: false
};
