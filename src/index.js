import Drawer from './components/Drawer';
import InputDate from './components/InputDate';
import InputSelect from './components/InputSelect';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';
import Row from './components/Row';
import Signup from './components/Signup';
import Submit from './components/Submit';

import { FORM_INPUTS_DEFAULT, FORM_ORDER } from './constants/formInputs';
import { EVENT_TYPES_COMMON, EVENT_TYPES_ALL } from './constants/eventTypes';
import { STATES } from './constants/states';
import { FORM_STYLES_DEFAULT, FORM_BORDER_PRESETS } from './constants/styles';

import * as utils from './utils/utils';
import * as contactFormServices from './services/contactForm';

const obj = {
  // CONSTANTS
  EVENT_TYPES_ALL,
  EVENT_TYPES_COMMON,
  FORM_STYLES_DEFAULT,
  FORM_BORDER_PRESETS,
  FORM_INPUTS_DEFAULT,
  FORM_ORDER,
  STATES,

  // Components
  Drawer,
  InputDate,
  InputSelect,
  InputText,
  InputTextarea,
  Row,
  Signup,
  Submit,

  // services
  ...contactFormServices,
  ...utils
};

export default obj;
