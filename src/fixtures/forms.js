import { FORM_ORDER } from '../constants/formInputs';

const version = '4.0.0';

export const customStyles = {
  inputBackgroundColor: 'transparent',
  negativeColor: '#ff9900',
  negativeColorBg: 'red', // automatic
  placeholderColor: 'pink', // doesn't work yet
  width: '100%'
};

export const customField = {
  id: '14112e56-b1a9-4b0a-83ca-976579f70474',
  name: 'special-field',
  type: 'text',
  vanityName: 'Special field'
};

export const normal = {
  name: 'normal',
  selector: '#nove_signup',
  userID: '__HZV4GVidAWX0LmJtLUhZBd4vKKj2',
  inputs: FORM_ORDER.FULL
};

const getLockedToWeddingOrder = (arr) => {
  const newItem = { ...arr.find(({ id }) => id === 'type') };
  newItem.value = 'WEDDING';
  newItem.hidden = true;
  return arr.map(item => item.id === 'type' ? newItem : item);
};

export const lockedToWeddings = {
  name: 'lockedToWeddings',
  inputs: getLockedToWeddingOrder(FORM_ORDER.FULL),
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const getMiniOrder = arr => arr.map(item => ({ ...item, label: '' }));

export const mini = {
  name: 'mini',
  inputs: getMiniOrder(FORM_ORDER.MINI),
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const customLayout = {
  name: 'customLayout',
  id: 'customLayout',
  version,
  inputs: [
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
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const nestedRow = {
  name: 'nestedRow',
  id: 'nestedRow',
  version,
  inputs: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'row', type: '2:1x2', path: '2' },
    { id: 'type', path: '2/row/0' },
    { id: 'eventDate', path: '2/row/1' },
    { id: 'drawer', path: '3' },
    {
      id: 'disconnected',
      path: '3/drawer/0',
      label: 'Dead-end input',
      placeholder: 'Enter a random number'
    },
    { id: 'row', path: '3/drawer/1', type: '2:1x2' },
    { id: 'eventVenue', path: '3/drawer/1/row/0' },
    { id: 'eventLocale', path: '3/drawer/1/row/1' },
    { id: 'referralSource', path: '4' },
    { id: 'message', path: '5' },
    { id: 'submit', path: '6' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const stuffedDrawer = {
  name: 'stuffedDrawer',
  id: 'stuffedDrawer',
  version,
  inputs: [
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

export const customAttributeAndBudget = {
  name: 'form with budget & custom',
  id: 'customAttributeAndBudget',
  version,
  inputs: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'budget', path: '2' },
    {
      ...customField,
      // this is a custom field that was created in settings. this is not an orphan
      path: '3',
      active: true,
      label: 'Custom field',
      placeholder: 'enter a random word'
    },
    { id: 'submit', path: '4' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const customDrawerText = {
  name: 'fixed custom fields',
  id: 'customDrawerText',
  version,
  inputs: [
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
      // this is a custom field that was created in settings. this is not an orphan
      ...customField,
      path: '5/drawer/0',
      label: 'Special Field',
      placeholder: 'enter a random number'
    },
    { id: 'eventVenue', path: '5/drawer/1' },
    { id: 'phone', path: '5/drawer/2' },
    { id: 'eventLocale', path: '6' },
    { id: 'message', path: '7' },
    { id: 'budget', path: '8' },
    { id: 'submit', path: '9' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const doubledAtLastInput = {
  name: 'doubled at last input',
  id: 'doubledAtLastInput',
  version,
  inputs: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'row', path: '2', type: '2:1x2' },
    { id: 'type', path: '2/row/0' },
    { id: 'eventDate', path: '2/row/1' },
    { id: 'drawer', path: '3' },
    { id: 'row', path: '3/drawer/0' },
    { id: 'eventLocale', path: '3/drawer/0/row/0' },
    { id: 'eventVenue', path: '3/drawer/0/row/1' },
    { id: 'referralSource', path: '3/drawer/1' },
    { id: 'message', path: '4' },
    { id: 'row', path: '5' },
    { ...customField, path: '5/row/0' },
    { id: 'c2db3801-6ac8-411f-addf-72bd02ca00e6', label: 'Estimated Budget', path: '5/row/1', placeholder: '$XX,XXX', type: 'currency' },
    { id: 'submit', path: '6' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const customSupportedEventTypes = {
  name: 'custom event types created by user in app settings',
  id: 'customSupportedEventTypes',
  version,
  inputs: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    {
      id: 'type',
      label: 'Event Type',
      options: [
        'ENGAGEMENT',
        'WEDDING',
        ['5163d581-fdb6-40ac-814a-c4e903d0cf7e', 'Birthday'],
        ['14da2eab-02cf-4c32-8663-18f7fbf8b788', 'Private Dining']
      ],
      path: '2',
      placeholder: 'Choose an event type',
      required: true,
      type: 'select'
    },
    { id: 'submit', path: '3' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const orphanInput = {
  name: 'orphan input created in formBuilder',
  id: 'orphanInputCreatedInFormBuilder',
  version,
  inputs: [
    { id: 'name', path: '0' },
    { id: 'email', path: '1' },
    { id: 'type', path: '2' },
    {
      id: '43b819fc-c5f9-49f7-9385-b41ee94ef16c',
      label: 'This is an orphan input',
      orphan: true,
      path: '3',
      placeholder: 'Type something here',
      type: 'text'
    },
    { id: 'submit', path: '4' }
  ],
  selector: '#nove_signup',
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

export const customSubmitStyle = {
  borderStyle: 'underline',
  borderColor: '#ff9900',
  width: '100%'
};

export const customSignupSuccessText = {
  signupSuccessButton: 'word',
  signupSuccessHeading: 'like,',
  signupSuccessMessage: 'thanks, bro',
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};
