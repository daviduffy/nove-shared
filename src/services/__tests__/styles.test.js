import { getStyles, getHydratedInputs } from '../contactForm';
import { FORM_INPUTS_DEFAULT, FORM_ORDER } from '../../constants/formInputs';
import { EVENT_TYPES_COMMON } from '../../constants/eventTypes';
import { FORM_STYLES_DEFAULT } from '../../constants/styles';

let outer, inner;

beforeAll(() => {
  outer = [
    {
      id: 'name',
      ...FORM_INPUTS_DEFAULT.name,
      value: ''
    },
    {
      id: 'email',
      ...FORM_INPUTS_DEFAULT.email,
      value: ''
    },
    {
      id: 'type',
      ...FORM_INPUTS_DEFAULT.type,
      value: ''
    },
    {
      id: 'eventDate',
      ...FORM_INPUTS_DEFAULT.eventDate,
      value: undefined
    },
    {
      id: 'referralSource',
      ...FORM_INPUTS_DEFAULT.referralSource,
      value: ''
    },
    {
      id: 'message',
      ...FORM_INPUTS_DEFAULT.message,
      value: ''
    }
  ];
  inner = [
    {
      id: 'eventVenue',
      ...FORM_INPUTS_DEFAULT.eventVenue,
      value: ''
    },
    {
      id: 'eventLocale',
      ...FORM_INPUTS_DEFAULT.eventLocale,
      value: ''
    }
  ];
});

test('should generate FORM_INPUTS_DEFAULT if no config is passed in', () => {
  const order = getHydratedInputs();
  expect(order).toEqual(expect.arrayContaining([
    expect.objectContaining({
      ...FORM_INPUTS_DEFAULT.name
    }),
    expect.objectContaining({
      ...FORM_INPUTS_DEFAULT.email
    })
  ]));
});

test('should change attributes on default inputs', () => {
  const customOrder = FORM_ORDER.BASE.map(item => ({
    ...item,
    label: `hogwash ${item.id}`
  }));
  const order = getHydratedInputs({ inputs: customOrder });
  expect(order).toEqual(expect.arrayContaining([
    expect.objectContaining({
      ...FORM_INPUTS_DEFAULT.name,
      label: 'hogwash name'
    }),
    expect.objectContaining({
      ...FORM_INPUTS_DEFAULT.email,
      label: 'hogwash email'
    })
  ]));
});

test('should output default types if no types are specified', () => {
  const order = getHydratedInputs({ inputs: FORM_ORDER.FULL });
  const type = order.find(({ id }) => id === 'type');
  expect(type.options).toEqual(EVENT_TYPES_COMMON);
});

test('should only output types that are specific by user when specified', () => {
  const types = ['WEDDING'];
  const customOrder = [...FORM_ORDER.FULL];
  customOrder.find(({ id }) => id === 'type').options = types;
  const order = getHydratedInputs({ inputs: customOrder, types });
  const type = order.find(({ id }) => id === 'type');
  expect(type.options).toEqual(types);
});

test('should generate default styles', () => {
  const styles = getStyles();
  expect(styles).toEqual(FORM_STYLES_DEFAULT);
});

test('should generate custom styles when present', () => {
  const customStyles = {
    borderColor: 'red',
    drawerBackgroundColor: 'transparent',
    drawerTextColor: '#00ff00',
    inputBackgroundColor: 'transparent',
    inputTextColor: '#800080',
    labelTextColor: 'orange',
    negativeColor: '#ff9900',
    negativeColorBg: 'red', // automatic
    placeholderColor: 'pink', // doesn't work yet
    positiveColor: '#f9f900'
  };
  // expect(customStyles).toEqual(expect.objectContaining({...FORM_STYLES_DEFAULT}))
  const styles = getStyles(customStyles);
  expect(styles).toEqual({
    ...FORM_STYLES_DEFAULT,
    ...customStyles,
    // automatically darkened
    negativeColorBg: '#ffebcc',
    positiveColorHover: '#e3e300',
    width: '560px'
  });
});

