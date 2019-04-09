import Drawer from './components/Drawer';
import InputDate from './components/InputDate';
import InputSelect from './components/InputSelect';
import InputText from './components/InputText';
import InputTextarea from './components/InputTextarea';
import Row from './components/Row';
import Signup from './components/Signup';
import Submit from './components/Submit';

import * as contactFormServices from './services/contactForm';

const obj = {
  Drawer,
  InputDate,
  InputSelect,
  InputText,
  InputTextarea,
  Row,
  Signup,
  Submit,
  ...contactFormServices
};

export default obj;
