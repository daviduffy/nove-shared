import { FORM_INPUTS_DEFAULT, FORM_ORDER } from 'nove-common';

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
    { id: 'name' },
    { id: 'email' },
    {
      id: 'row',
      type: '2:1x2',
      items: [
        { id: 'type' },
        { id: 'eventDate' }
      ]
    },
    {
      id: 'drawer',
      items:
        [
          { id: 'eventVenue' },
          { id: 'eventLocale' }
        ]
    },
    { id: 'referralSource' },
    { id: 'message' },
    { id: 'submit' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const nestedRow = {
  name: 'customLayout',
  order: [
    { id: 'name' },
    { id: 'email' },
    {
      id: 'row',
      type: '2:1x2',
      items: [
        { id: 'type' },
        { id: 'eventDate' }
      ]
    },
    {
      id: 'drawer',
      items:
        [
          {
            id: 'row',
            type: '2:1x2',
            items: [
              { id: 'eventVenue' },
              { id: 'eventLocale' }
            ]
          },
          {
            id: 'disconnected',
            label: 'Dead-end input',
            placeholder: 'Enter a random number'
          }
        ]
    },
    { id: 'referralSource' },
    { id: 'message' },
    { id: 'submit' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};


const stuffedDrawer = {
  name: 'stuffedDrawer',
  order: [
    { id: 'name' },
    { id: 'email' },
    {
      id: 'drawer',
      items:
        [
          { id: 'type' },
          { id: 'eventDate' },
          { id: 'eventVenue' },
          { id: 'eventLocale' },
          { id: 'referralSource' }
        ]
    },
    { id: 'message' },
    { id: 'submit' }
  ],
  selector: '#nove_signup',
  types: ['ENGAGEMENT', 'WEDDING', 'MATERNITY'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customAttributeAndBudget = {
  name: 'form with budget & custom',
  order: [
    { id: 'name' },
    { id: 'email' },
    { id: 'budget' },
    {
      id: '14112e56-b1a9-4b0a-83ca-976579f70474',
      active: true,
      label: 'Custom field',
      name: 'special-field',
      placeholder: 'enter a random word',
      type: 'text',
      vanityName: 'Special field'
    },
    { id: 'submit' }
  ],
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
};

const customDrawerText = {
  name: 'fixed custom fields',
  order: [
    { id: 'name' },
    { id: 'email' },
    { id: 'type' },
    { id: 'eventDate' },
    { id: 'referralSource' },
    {
      id: 'drawer',
      label: '',
      placeholder: 'Enter more information',
      items: [
        {
          id: '14112e56-b1a9-4b0a-83ca-976579f70474',
          name: 'special-field',
          label: 'Special Field',
          placeholder: 'enter a random number',
          type: 'text',
          vanityName: 'Special field'
        },
        { id: 'eventVenue' },
        { id: 'phone' }
      ]
    },
    { id: 'eventLocale' },
    { id: 'message' },
    { id: 'budget' },
    { id: 'submit' }
  ],
  selector: '#nove_signup',
  types: ['WEDDING', 'COMMERCIAL', 'NEWBORN', 'ENGAGEMENT'],
  userID: 'HZV4GVidAWX0LmJtLUhZBd4vKKj2'
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
  defaultStyles,
  customAttributeAndBudget,
  customSignupSuccessText,
  customDrawerText,
  nestedRow,
  lockedToWeddings,
  stuffedDrawer,
  FORM_INPUTS_DEFAULT as default
};
