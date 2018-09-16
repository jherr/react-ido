import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import IdoContext from '../model/IdoContext';
import IdoModel from '../model/IdoModel';

class IdoSurface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: new IdoModel(
        props.config,
        props.elements,
        props.onChange
      ),
    }
  }

  render() {
    return (
      <IdoContext.Provider value={this.state.manager}>
        {this.props.children}
      </IdoContext.Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(IdoSurface);
