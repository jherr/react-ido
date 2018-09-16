import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import styled from 'react-emotion';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import IdoContext from '../model/IdoContext';
import { widgetType, modelType } from '../types';

const Pill = styled('div')`
  border-radius: 5px;
  background: #ccc;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

class PaletteWidgetBase extends Component {
  render() {
    return this.props.connectDragSource(
      <div>
        <Pill>
          <i
            className={`oi oi-${this.props.widget.icon}`}
            style={{
              paddingRight: 5,
            }}
          />
          {this.props.widget.name}
        </Pill>
      </div>,
    );
  }
}

PaletteWidgetBase.propTypes = {
  widget: widgetType.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

const PaletteWidget = DragSource('field', {
  beginDrag({ manager, id, widget }) {
    manager.onBeginDrag();
    const item = {
      id,
      widget,
      source: 'palette',
    };
    return item;
  },

  endDrag(props) {
    props.manager.onEndDrag();
  },
}, connect => ({
  connectDragSource: connect.dragSource(),
}))(PaletteWidgetBase);

const Palette = ({ manager }) => (
  <div>
    {manager.config.widgets.map(widget => (
      <PaletteWidget
        widget={widget}
        key={widget.name}
        manager={manager}
      />
    ))}
  </div>
);

Palette.propTypes = {
  manager: modelType.isRequired,
};

const ObserverPalette = observer(Palette);

export default () => (
  <IdoContext.Consumer>
    {manager => <ObserverPalette manager={manager} />}
  </IdoContext.Consumer>
);
