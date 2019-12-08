// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const Signup = ({
  classes,
  emailError,
  errorClasses,
  formError,
  onSignupComplete,
  onSubmit,
  phoneError,
  renderedInputs,
  signupSuccess,
  signupSuccessButton,
  signupSuccessHeading,
  signupSuccessMessage,
  style
}) => (
  <div className={`Signup ${classes || ''}`} {...css(style.signup)}>
    <div className={`Signup__success${signupSuccess ? ' Signup__success--vis' : ''}`}>
      {
        signupSuccess &&
        <div className="Signup__success--txt">
          <h2 className="Signup__success-head h4">{signupSuccessHeading}</h2>
          <p className="Signup__success-msg h4">{signupSuccessMessage}</p>
          <button
            {...css(style.submit)}
            className="Signup__success-b B B--p"
            onClick={onSignupComplete}
          >
            {signupSuccessButton}
          </button>
        </div>
      }
    </div>
    {
      <div className={`F__E${errorClasses.length > 0 ? ` F__E--active ${errorClasses.join(' ')} F__E--${errorClasses.length}` : ''}`}>
        {formError && <p>{formError}</p>}
        {emailError && <p>{emailError}</p>}
        {phoneError && <p>{phoneError}</p>}
      </div>
    }
    {
      (style && style.custom) &&
      <style>{style.custom}</style>
    }
    <form className="F" onSubmit={onSubmit}>
      {
        renderedInputs
      }
    </form>
  </div>
);

Signup.propTypes = {
  accordionOpen: PropTypes.bool.isRequired,
  classes: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  errorClasses: PropTypes.array.isRequired,
  eventDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  formError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAccordionClick: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onEmailBlur: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPhoneBlur: PropTypes.func.isRequired,
  onSignupComplete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  phoneError: PropTypes.string.isRequired,
  renderedInputs: PropTypes.array.isRequired,
  signupSuccess: PropTypes.bool.isRequired,
  signupSuccessButton: PropTypes.string.isRequired,
  signupSuccessHeading: PropTypes.string.isRequired,
  signupSuccessMessage: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  submitText: PropTypes.string,
  windowWidth: PropTypes.number.isRequired
};
Signup.defaultProps = {
  classes: '',
  eventDate: undefined,
  submitText: undefined
};

export default Signup;
