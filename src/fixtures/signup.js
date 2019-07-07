import { FORM_ORDER } from '../constants/formInputs';
import { EVENT_TYPES_COMMON } from '../constants/eventTypes';
import { normal } from './forms';

const config = {
  // adjusted this to simplify
  ...normal
};

const remoteConfig = {
  userID: '__HZV4GVidAWX0LmJtLUhZBd4vKKj2',
  formID: '9c24d9d3-cd1e-4801-b4c6-50165279bdd3'
};

const drawerConfig = {
  userID: '__HZV4GVidAWX0LmJtLUhZBd4vKKj2',
  formID: 'a08c7a93-39b7-426f-9c44-0c9b8cdb0da6'
};

const signupMessageConfig = {
  userID: '__HZV4GVidAWX0LmJtLUhZBd4vKKj2',
  formID: 'f4b25da4-0d0b-45f1-99d1-f6f6d89216e0'
};

const signupContainerDefaultProps = {
  classes: '',
  // this is not required because defaults are assigned in the getHydratedInputs func
  order: FORM_ORDER.MINI,
  signupSuccessButton: 'Okay!',
  signupSuccessHeading: 'Thank you!',
  signupSuccessMessage: 'I\'ll be back in touch soon.',
  styles: false,
  types: EVENT_TYPES_COMMON
};

const signupEmpty = {
  name: '',
  email: '',
  type: '',
  event_date: 0,
  event_venue: '',
  event_locale: '',
  referral_source: '',
  inquiry_text: ''
};

const signupEntries = {
  name: 'Herb Derson',
  email: 'herbert@derson.com',
  type: 'wedding',
  event_date: 1517979307610,
  event_venue: 'Mason and Jar Farms',
  event_locale: 'WA',
  referral_source: 'I found you online',
  inquiry_text: 'I am literally the last person who would ever buy anything what do you think about sending me your pricing guide?'
};

export {
  config,
  drawerConfig,
  signupContainerDefaultProps,
  signupMessageConfig,
  remoteConfig,
  signupEntries,
  signupEmpty as default
};
