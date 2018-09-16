import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import { configType, elementsType } from '../types';
import IdoContext from '../model/IdoContext';
import IdoModel from '../model/IdoModel';

class IdoSurface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: new IdoModel(
        props.config,
        props.elements,
        props.onChange,
      ),
    };
  }

  render() {
    const { manager } = this.state;
    const { children } = this.props;
    return (
      <IdoContext.Provider value={manager}>
        {children}
      </IdoContext.Provider>
    );
  }
}

IdoSurface.propTypes = {
  config: configType.isRequired,
  elements: elementsType.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default DragDropContext(HTML5Backend)(IdoSurface);
