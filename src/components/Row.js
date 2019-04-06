// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  items,
  type
}) => (
  <div className={`F__r${type ? ` F__r--${type}` : ''}`}>
    {
      items.map(item => item)
    }
  </div>
);
Row.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string
};
Row.defaultProps = {
  type: ''
};
export default Row;
