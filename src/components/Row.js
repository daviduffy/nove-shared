// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  items,
  type,
  getInputElement,
  originIndex
}) => (
  <div className={`F__r${type ? ` F__r--${type}` : ''}`}>
    {
      items.map((subItem, i) => getInputElement(subItem, i, `${originIndex}/items/`))
    }
  </div>
);
Row.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string,
  getInputElement: PropTypes.func.isRequired,
  originIndex: PropTypes.string
};
Row.defaultProps = {
  type: '',
  originIndex: ''
};
export default Row;
