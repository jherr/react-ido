import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import IdoContext from '../model/IdoContext';
import { elementType, modelType } from '../types';

const createTypeMap = ({ widgets }) => {
  const map = {};
  widgets.forEach(widget => map[widget.type] = widget);
  return map;
};

const StaticElement = ({ element, typeMap }) => {
  const Comp = typeMap[element.type].component;
  return (
    <Comp
      {...element.data}
    />
  );
};

StaticElement.propTypes = {
  element: elementType.isRequired,
  typeMap: PropTypes.object.isRequired,
};

const Row = styled('div')`
  display: block;
  @media (min-width: 420px) {
    display: grid;
  }
`;

const StaticRenderer = ({ manager }) => {
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
};

StaticRenderer.propTypes = {
  manager: modelType.isRequired,
};

const ObservedStaticRenderer = observer(StaticRenderer);

export default () => (
  <IdoContext.Consumer>
    {manager => <ObservedStaticRenderer manager={manager} />}
  </IdoContext.Consumer>
);
