import { STATES } from './states';
import { EVENT_TYPES_COMMON } from './eventTypes';

export const budget = {
  label: 'Estimated budget',
  placeholder: '$XXXX',
  type: 'currency'
};
export const drawer = {
  label: 'More Details',
  placeholder: 'Share more details about your event here'
};
export const email = {
  label: 'Email',
  placeholder: 'your@email.com',
  type: 'email'
};
export const eventDate = {
  label: 'Event Date',
  placeholder: 'On or around',
  type: 'date'
};
export const eventLocale = {
  label: 'Event Location',
  placeholder: 'Choose a state',
  type: 'select',
  options: STATES
};
export const eventVenue = {
  label: 'Event Venue',
  placeholder: 'Name of the venue'
};
export const name = {
  label: 'Name',
  placeholder: 'Your name'
};
export const message = {
  label: 'Message',
  placeholder: 'What are the details of your event?',
  type: 'textarea'
};
export const phone = {
  label: 'Phone',
  placeholder: '(###) ###-####',
  type: 'phone'
};
export const referralSource = {
  label: 'Referral Source',
  placeholder: 'Where did you hear about me?'
};
export const row = {
};
export const type = {
  label: 'Event Type',
  placeholder: 'Choose an event type',
  type: 'select',
  options: EVENT_TYPES_COMMON
};
export const submit = {
  label: 'Submit'
};

export const FORM_INPUTS_DEFAULT = {
  name,
  email,
  type,
  eventDate,
  referralSource,
  eventVenue,
  eventLocale,
  phone,
  budget,
  drawer,
  row,
  message,
  submit
};

const PRIMITIVE = [
  { id: 'name' },
  { id: 'email' }
];

const BASE = [
  ...PRIMITIVE,
  { id: 'submit' }
];
const MINI = [
  ...PRIMITIVE,
  { id: 'message' },
  { id: 'submit' }
];
const FULL = [
  ...PRIMITIVE,
  { id: 'type' },
  { id: 'eventDate' },
  { id: 'referralSource' },
  {
    id: 'drawer',
    items: [
      { id: 'eventVenue' },
      { id: 'eventLocale' }
    ]
  },
  { id: 'message' },
  { id: 'submit' }
];

export const FORM_ORDER = {
  BASE,
  MINI,
  FULL
};
