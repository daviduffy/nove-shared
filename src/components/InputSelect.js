// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import { titleize } from '../utils/utils';

const InputSelect = ({
  id,
  label,
  classes,
  error,
  value,
  options,
  onChange,
  style,
  type, // purposely stripped and not used
  required,
  ...rest
}) => {
  const inputClasses = [];
  // TODO: maybe find a better way to do this
  if (value === '') {
    inputClasses.push('F__i--is-unset');
  }
  if (error) {
    inputClasses.push('F__i--err');
  }
  return (
    <div className={`F__g${classes ? ` ${classes}` : ''}`} style={style}>
      {
        label &&
        <label htmlFor={id} className={`F__l${required ? ' F__l--req' : ''}`}>
          <span>{label}</span>
        </label>
      }
      <select
        className={`F__i F__i--s ${inputClasses.join(' ')}`}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {
          options && options.map((option) => {
            let value, text;
            if (typeof (option) === 'string') {
              value = option.toUpperCase();
              text = titleize(option);
            } else {
              [value, text] = option;
            }
            return (
              <option key={value} value={value}>{text}</option>
            );
          })
        }
      </select>
    </div>
  );
};
InputSelect.propTypes = {
  classes: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string
};
InputSelect.defaultProps = {
  classes: '',
  error: false,
  id: '',
  label: '',
  required: false,
  style: {},
  value: ''
};

export default InputSelect;
