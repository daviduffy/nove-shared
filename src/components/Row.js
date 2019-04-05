// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  items,
  type,
  getInputElements,
  originIndex
}) => (
  <div className={`F__r${type ? ` F__r--${type}` : ''}`}>
    {
      items.map((subItem, i) => getInputElements(subItem, i, `${originIndex}/items/`))
    }
  </div>
);
Row.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string,
  getInputElements: PropTypes.func.isRequired,
  originIndex: PropTypes.string
};
Row.defaultProps = {
  type: '',
  originIndex: ''
};
export default Row;
