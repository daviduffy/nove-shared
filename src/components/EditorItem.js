// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

class EditorItem extends React.Component {
  constructor(props) {
    super(props);
    this.complete = false;
  }
  register = (e) => {
    clearTimeout(this.complete);
    e.persist();
    this.complete = setTimeout(() => {
      this.dispatch(e);
    }, 50);
  }
  dispatch = (e, drop = false) => {
    if (!e.target) return;
    const dropTarget = e.target.parentNode.dataset.path;
    const { pageX, pageY } = e;
    const { left, right, top, bottom, width, height } = e.target.getBoundingClientRect();

    const horizHoverSize = (width / 4) > 80 ? (width / 4) : 80;
    const vertHoverSize = height / 2;

    const LEFT = pageX > left && pageX < (left + horizHoverSize);
    const RIGHT = pageX >= (right - horizHoverSize) && pageX < right;
    const TOP = pageY > top && pageY < (top + vertHoverSize);
    const BOTTOM = pageY >= (top + vertHoverSize) && pageY < bottom;

    let dropRegion = '';
    if (LEFT) {
      dropRegion = 'LEFT';
    } else if (RIGHT) {
      dropRegion = 'RIGHT';
    } else if (TOP) {
      dropRegion = 'TOP';
    } else if (BOTTOM) {
      dropRegion = 'BOTTOM';
    }
    return { dropTarget, dropRegion, drop };
  }
  handleDragStart = (e, id) => {
    e.stopPropagation();
    console.log({ dragElement: this.props.id });
    e.dataTransfer.setData('id', id);
  }
  handleDragOver = (e) => {
    e.preventDefault();
    this.register(e);
  }
  handleDrop = (e) => {
    e.stopPropagation();
    console.log(this.dispatch(e, true));
  }
  render() {
    const {
      active,
      draggable,
      path,
      onEditorClick,
      production,
      Component,
      nestingType,
      ...rest
    } = this.props;
    const RenderedComponent = <Component {...rest} />;
    if (production) {
      return RenderedComponent;
    }
    const classes = ['F__g', 'EditorItem'];
    if (nestingType) classes.push(`EditorItem--${nestingType}`);
    return (
      <div
        className={classes.join(' ')}
        draggable={draggable}
        onDragStart={this.handleDragStart}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        data-path={path}
      >
        {RenderedComponent}
        <button
          className={`B EditorItem__button${active ? ' EditorItem__button--active' : ''}`}
          onClick={onEditorClick}
        >
          &nbsp;
        </button>
      </div>
    );
  }
}

EditorItem.propTypes = {
  active: PropTypes.bool.isRequired,
  Component: PropTypes.func.isRequired,
  draggable: PropTypes.bool,
  onEditorClick: PropTypes.func.isRequired,
  production: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  nestingType: PropTypes.string
};
EditorItem.defaultProps = {
  draggable: false,
  nestingType: ''
};
export default EditorItem;
