// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Drawer = ({
  isOpen,
  items,
  label,
  onClick,
  placeholder
}) => (
  <div key="drawer" className="F__g F__g--more">
    {
      label &&
      <span className="F__l"><span>{label}</span></span>
    }
    <div className={`Acrd${isOpen ? ' Acrd--o' : ''}`}>
      <button onClick={onClick} className="Acrd__trg">
        <span className="F__l">
          <span id="drawer_placeholder">{placeholder}</span>
        </span>
      </button>
      <div
        className="Acrd__cont-c"
        style={
          {
            maxHeight: (isOpen && items.length > 0) ? `${(items.length * 110) + 24}px` : 0
          }
        }
      >
        <div className="Acrd__cont">
          {
            items.map(item => item)
          }
        </div>
      </div>
    </div>
  </div>
);
Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};
Drawer.defaultProps = {
  label: '',
  placeholder: ''
};
export default Drawer;
