// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const Submit = ({ label, style }) => (
  <div className="F__g F__g--submit">
    <button className="B B--p F__sb" {...css(style)}>{label}</button>
  </div>
);
Submit.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object.isRequired
};
Submit.defaultProps = {
  label: 'Submit'
};
export default Submit;
