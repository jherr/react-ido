import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

export default (Comp) => {
  class ComponentEditable extends Component {
    render() {
      const { connectDragSource, children } = this.props;

      return connectDragSource(
        <div>
          <Comp>
            {children}
          </Comp>
        </div>,
      );
    }
  }

  ComponentEditable.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
  };

  return DragSource('field', {
    beginDrag(props) {
      props.onBeginDrag();
      return props.id;
    },

    endDrag(props) {
      props.onEndDrag();
    },
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(ComponentEditable);
};
