import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

class TargetBase extends Component {
  render() {
    const {
      connectDropTarget,
      isDragging,
      active,
      style,
      className,
    } = this.props;

    const iconStyling = {
      width: 30,
      height: 30,
      color: isDragging ? 'black' : '#ccc',
      opacity: isDragging ? 1 : 0,
    };

    return connectDropTarget(
      <div
        style={Object.assign(
          style || {}, {
            margin: active ? 0 : 2,
            border: `${active ? '3px' : '1px'} dashed ${isDragging ? 'black' : '#ccc'}`,
            textAlign: 'center',
            borderRadius: 5,
          },
        )}
        className={className}
      >
        <i
          className="oi oi-target"
          style={iconStyling}
        />
      </div>,
    );
  }
}

TargetBase.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

TargetBase.defaultProps = {
  className: null,
  style: null,
};

const Target = DropTarget('field', {
  drop(props, monitor) {
    props.onDrop(monitor.getItem(), props);
  },
  hover(props, monitor) {
    if (monitor.isOver()) {
      props.onActivate(props.id);
    }
  },
}, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(TargetBase);

export default Target;
