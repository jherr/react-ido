import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import EditableElement from '../components/EditableElement';
import Target from '../components/Target';

import { modelType } from '../types';

const createTypeMap = ( { widgets } ) => {
  const map = {};
  widgets.forEach( widget => map[ widget.type ] = widget );
  return map;
};

const Row = styled('div')`
  display: grid;
`;

class EditableRender extends Component {
  render() {
    const { manager } = this.props;
    const typeMap = createTypeMap(manager.config);
    return (
      <div>
        {manager.elements.map((row, index) => [
          <div key={`before-row-${index}`}>
              <Target
                beforeRow={index}
                id={`before-row-${index}`}
                key={`before-row-${index}`}
                active={manager.activeTarget === `before-row-${index}`}
                isDragging={manager.isDragging}
                onActivate={(id) => manager.activeTarget = id}
                onDrop={(source, target) => manager.onDrop(source, target)}
              />
          </div>,
          <Row
            key={`row-${index}`}
            style={{
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
            }}
          >
            {
              row.map((element, elementIndex) => (
                <EditableElement
                  element={element}
                  typeMap={typeMap}
                  key={element.id}
                  manager={manager}
                  editMode={Boolean(manager.editMode[element.id])}
                  toggleEditMode={(id) => manager.toggleEditMode(id)}
                  onDelete={(id) => manager.onDelete(id)}
                  onEndDrag={() => manager.onEndDrag()}
                  onBeginDrag={() => manager.onBeginDrag()}
                  last={elementIndex === row.length - 1}
                />
              ))
            }
          </Row>
      ])}
      <Target
        id="after"
        active={manager.activeTarget === 'after'}
        isDragging={manager.isDragging}
        onActivate={(id) => manager.activeTarget = id}
        onDrop={(source, target) => manager.onDrop(source, target)}
      />
    </div>
    );
  }
};

EditableRender.propTypes = {
  manager: modelType.isRequired,
};

export default observer(EditableRender);
