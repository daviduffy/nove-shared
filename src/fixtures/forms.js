import { FORM_INPUTS_DEFAULT, FORM_ORDER } from '../constants/formInputs';

const defaultStyles = {
  borderStyle: 'full',
  borderColor: '#b3b3b3',
  drawerBackgroundColor: '#eeeeee',
  drawerTextColor: '#707070',
  inputBackgroundColor: '#fefefe',
  inputTextColor: '#444444',
  labelTextColor: '#444444',
  negativeColor: '#e74c3c',
  negativeColorBg: '#fadbd8',
  positiveColor: '#2ecc71',
  positiveColorHover: '#2aba67',
  placeholderColor: '#b3b3b3',
  width: '560px'
};

const normal = {
  name: 'normal',
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING'],
  userID: '__HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const getLockedToWeddingOrder = (arr) => {
  const newItem = { ...arr.find(({ id }) => id === 'type') };
  newItem.value = 'WEDDING';
  newItem.hidden = true;
  return arr.map(item => item.id === 'type' ? newItem : item);
};
const lockedToWeddings = {
  name: 'lockedToWeddings',
  order: getLockedToWeddingOrder(FORM_ORDER.FULL),
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const getMiniOrder = arr => arr.map(item => ({ ...item, label: '' }));
const mini = {
  name: 'mini',
  order: getMiniOrder(FORM_ORDER.MINI),
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customLayout = {
  name: 'customLayout',
  order: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'row', type: '2:1x2', path: '2' },
    { id: 'type', path: '2/row/0' },
    { id: 'eventDate', path: '2/row/1' },
    { id: 'drawer', path: '3' },
    { id: 'eventVenue', path: '3/drawer/0' },
    { id: 'eventLocale', path: '3/drawer/1' },
    { id: 'referralSource', path: '4' },
    { id: 'message', path: '5' },
    { id: 'submit', path: '6' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const nestedRow = {
  name: 'customLayout',
  order: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'row', type: '2:1x2', path: '2' },
    { id: 'type', path: '2/row/0' },
    { id: 'eventDate', path: '2/row/1' },
    { id: 'drawer', path: '3' },
    { id: 'row', path: '3/drawer/0', type: '2:1x2' },
    { id: 'eventVenue', path: '3/drawer/0/row/0' },
    { id: 'eventLocale', path: '3/drawer/0/row/1' },
    {
      id: 'disconnected',
      path: '3/drawer/1',
      label: 'Dead-end input',
      placeholder: 'Enter a random number'
    },
    { id: 'referralSource', path: '4' },
    { id: 'message', path: '5' },
    { id: 'submit', path: '6' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};


const stuffedDrawer = {
  name: 'stuffedDrawer',
  order: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'drawer', path: '2' },
    { id: 'type', path: '2/drawer/0' },
    { id: 'eventDate', path: '2/drawer/1' },
    { id: 'eventVenue', path: '2/drawer/2' },
    { id: 'eventLocale', path: '2/drawer/3' },
    { id: 'referralSource', path: '2/drawer/4' },
    { id: 'message', path: '3' },
    { id: 'submit', path: '4' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customAttributeAndBudget = {
  name: 'form with budget & custom',
  order: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'budget', path: '2' },
    {
      id: '14112e56-b1a9-4b0a-83ca-976579f70474',
      path: '3',
      active: true,
      label: 'Custom field',
      name: 'special-field',
      placeholder: 'enter a random word',
      type: 'text',
      vanityName: 'Special field'
    },
    { id: 'submit', path: '4' }
  ],
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customDrawerText = {
  name: 'fixed custom fields',
  order: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'type', path: '2' },
    { id: 'eventDate', path: '3' },
    { id: 'referralSource', path: '4' },
    {
      id: 'drawer',
      path: '5',
      label: '',
      placeholder: 'Enter more information'
    },
    {
      id: '14112e56-b1a9-4b0a-83ca-976579f70474',
      path: '5/drawer/0',
      name: 'special-field',
      label: 'Special Field',
      placeholder: 'enter a random number',
      type: 'text',
      vanityName: 'Special field'
    },
    { id: 'eventVenue', path: '5/drawer/1' },
    { id: 'phone', path: '5/drawer/2' },
    { id: 'eventLocale', path: '6' },
    { id: 'message', path: '7' },
    { id: 'budget', path: '8' },
    { id: 'submit', path: '9' }
  ],
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customSubmitStyle = {
  borderStyle: 'underline',
  borderColor: '#ff9900',
  width: '100%'
};

const customSignupSuccessText = {
  signupSuccessButton: 'word',
  signupSuccessHeading: 'like,',
  signupSuccessMessage: 'thanks, bro',
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export {
  mini,
  normal,
  customLayout,
  customSubmitStyle,
  customAttributeAndBudget,
  customSignupSuccessText,
  customDrawerText,
  defaultStyles,
  lockedToWeddings,
  nestedRow,
  stuffedDrawer,
  FORM_INPUTS_DEFAULT as default
};
