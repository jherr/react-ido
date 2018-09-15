import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import { elementType, modelType } from '../types';

const createTypeMap = ( { widgets } ) => {
  const map = {};
  widgets.forEach( widget => map[ widget.type ] = widget );
  return map;
};

class StaticElement extends Component {
  render() {
    const { element } = this.props;
    const Comp = this.props.typeMap[element.type].component;
    return (
      <Comp
        {...element.data}
      />
    );
  }
};

StaticElement.propTypes = {
  element: elementType,
  typeMap: PropTypes.object,
  onEndDrag: PropTypes.func.isRequired,
  last: PropTypes.bool,
};

const Row = styled('div')`
  display: grid;
`;

class StaticRenderer extends Component {
  render() {
    const { manager } = this.props;
    const typeMap = createTypeMap(manager.config);
    return (
      <div>
        {manager.elements.map((row, index) => (
          <Row
            key={`row-${index}`}
            style={{
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
            }}
          >
            {
              row.map(element => (
                <StaticElement
                  element={element}
                  typeMap={typeMap}
                  key={element.id}
                  manager={manager}
                />
              ))
            }
          </Row>
        ))}
      </div>
    );
  }
};

StaticRenderer.propTypes = {
  manager: modelType.isRequired,
};

export default observer(StaticRenderer);
