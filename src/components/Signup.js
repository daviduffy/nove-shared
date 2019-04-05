// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import { css } from 'glamor';
import Drawer from './Drawer';
import EditorItem from './EditorItem';
import InputDate from './InputDate';
import InputText from './InputText';
import InputSelect from './InputSelect';
import InputTextarea from './InputTextarea';
import Row from './Row';
import Submit from './Submit';
import { getStyles } from '../services/css';

const Signup = (props) => {
  // this getStyles actually creates the 'markup' for CSS in JS
  const style = getStyles(props.styles, props.order);

  // this function turns the input objects into JSX. used in the map function below
  const getInputElements = ({
    hidden = false,
    id,
    items,
    label,
    options,
    placeholder,
    required,
    type
  }, i, pathPrefix = '') => {
    const path = `${pathPrefix}${i}`;
    if (id === 'drawer') {
      return (
        <EditorItem
          key={path}
          active={props.selectedInput === path}
          Component={Drawer}
          nestingType="drawer"
          production={props.production}
          onEditorClick={props.onEditorClick}

          getInputElements={getInputElements}
          isOpen={props.accordionOpen}
          items={items}
          label={label}
          onClick={props.onAccordionClick}
          originIndex={path}
          path={path}
          placeholder={placeholder}
        />
      );
    }
    if (id === 'row') {
      return (
        <EditorItem
          key={path}
          active={props.selectedInput === path}
          Component={Row}
          production={props.production}
          nestingType="row"
          onEditorClick={props.onEditorClick}

          getInputElements={getInputElements}
          items={items}
          originIndex={path}
          path={path}
          type={type}
        />
      );
    }
    if (id === 'submit') {
      return (
        <EditorItem
          key={path}
          active={props.selectedInput === path}
          Component={Submit}
          production={props.production}
          onEditorClick={props.onEditorClick}

          label={label}
          path={path}
          style={style.submit}
        />
      );
    }
    if (type === 'date') {
      return (
        <EditorItem
          key={path}
          active={props.selectedInput === path}
          Component={InputDate}
          production={props.production}
          onEditorClick={props.onEditorClick}

          draggable
          eventDate={props.eventDate}
          error={(required && props.formError && props.eventDate === undefined)}
          id={id}
          label={label}
          onDateChange={props.onDateChange}
          path={path}
          placeholder={placeholder}
          required={required}
          windowWidth={props.windowWidth}
        />
      );
    }
    let Input = InputText;
    let dynamicOnChange = props.onInputChange;
    let dynamicOnBlur = () => {};
    if (type === 'select') {
      Input = InputSelect;
    } else if (type === 'textarea') {
      Input = InputTextarea;
    } else if (type === 'phone') {
      dynamicOnBlur = props.onPhoneBlur;
    } else if (type === 'email') {
      dynamicOnBlur = props.onEmailBlur;
    } else if (type === 'currency') {
      dynamicOnChange = props.onAmountChange;
    }
    return (
      <EditorItem
        key={path}
        active={props.selectedInput === path}
        Component={Input}
        production={props.production}
        onEditorClick={props.onEditorClick}

        classes={`F__g--${id}`}
        draggable
        error={required && props.formError !== '' && props[id] === ''}
        id={id}
        label={label}
        onChange={dynamicOnChange}
        onBlur={dynamicOnBlur}
        options={options ? [['', placeholder], ...options] : false}
        path={path}
        placeholder={placeholder}
        style={({ ...(hidden ? { display: 'none' } : {}) })}
        value={props[id]}
        valueRequired={required}
      />
    );
  };
  const errorClasses = [
    ...(props.formError ? ['F__E--form'] : []),
    ...(props.emailError ? ['F__E--email'] : []),
    ...(props.phoneError ? ['F__E--phone'] : [])
  ];
  return (
    <div className={`Signup ${props.classes ? props.classes : ''}${props.order ? ' Signup--custom-order' : ''}`} {...css(style.signup)}>
      <div className={`Signup__success${props.signupSuccess ? ' Signup__success--vis' : ''}`}>
        {
          props.signupSuccess &&
          <div className="Signup__success--txt">
            <h2 className="Signup__success-head h4">{props.signupSuccessHeading}</h2>
            <p className="Signup__success-msg h4">{props.signupSuccessMessage}</p>
            <button
              {...css(style.submit)}
              className="Signup__success-b B B--p"
              onClick={props.onSignupComplete}
            >
              {props.signupSuccessButton}
            </button>
          </div>
        }
      </div>
      {
        <div className={`F__E${errorClasses.length > 0 ? ` F__E--active ${errorClasses.join(' ')} F__E--${errorClasses.length}` : ''}`}>
          {props.formError && <p>{props.formError}</p>}
          {props.emailError && <p>{props.emailError}</p>}
          {props.phoneError && <p>{props.phoneError}</p>}
        </div>
      }
      <form className="F" onSubmit={props.onSubmit}>
        {
          props.inputs.map((input, index) => getInputElements(input, index))
        }
      </form>
    </div>
  );
};

Signup.propTypes = {
  accordionOpen: PropTypes.bool.isRequired,
  classes: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  eventDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  formError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    drawerColor: PropTypes.string,
    drawerColorBg: PropTypes.string,
    labelColor: PropTypes.string,
    negativeColor: PropTypes.string,
    negativeColorBg: PropTypes.string,
    placeholderColor: PropTypes.string,
    positiveColor: PropTypes.string,
    positiveColorHover: PropTypes.string,
    textColor: PropTypes.string,
    width: PropTypes.string
  }).isRequired,
  order: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  onEditorClick: PropTypes.func.isRequired,
  onAccordionClick: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onEmailBlur: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPhoneBlur: PropTypes.func.isRequired,
  onSignupComplete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  phoneError: PropTypes.string.isRequired,
  production: PropTypes.bool.isRequired,
  selectedInput: PropTypes.string.isRequired,
  signupSuccess: PropTypes.bool.isRequired,
  signupSuccessButton: PropTypes.string.isRequired,
  signupSuccessHeading: PropTypes.string.isRequired,
  signupSuccessMessage: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  windowWidth: PropTypes.number.isRequired
};
Signup.defaultProps = {
  inputs: [],
  eventDate: undefined,
  order: false,
  submitText: undefined
};

export default Signup;
