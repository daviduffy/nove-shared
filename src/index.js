import Drawer from './components/Drawer';
import InputDate from './components/InputDate';
import InputSelect from './components/InputSelect';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';
import Row from './components/Row';
import Submit from './components/Submit';

import { getRenderedInputs, getInputComponents, getInputs } from './services/contactForm';

const obj = {
  Drawer,
  InputDate,
  InputSelect,
  InputText,
  InputTextarea,
  Row,
  Submit,
  getInputs,
  getInputComponents,
  getRenderedInputs
};

export default obj;
