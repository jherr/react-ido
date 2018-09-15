import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import Target from '../components/Target';
import Draggable from '../components/Draggable';

import { modelType, elementType } from '../types';

const EditableElementContainer = styled('div')`
  padding: 0px;
  background: #efefef;
  border-radius: 10px;

  display: grid;
  grid-template-columns: 32px auto 32px;
  width: 100%;
`;

const TitleBarTitle = styled('div')`
  padding-top: 5px;
  text-align: center;
`;

const ElementInterior = styled('div')`
  background: white;
`;

const LinkButton = styled('button')`
  background: none;
  border: none;
  height: 35px;
`;

const DraggableEditableElementContainer = Draggable(EditableElementContainer);

class EditableElementBase extends Component {
  render() {
    const { element, manager, last } = this.props;
    const Comp = this.props.typeMap[element.type].editComponent || this.props.typeMap[element.type].component;
    return (
      <div
        className="rounded"
        style={{
          padding: 2,
        }}
      >
        <DraggableEditableElementContainer
          onEndDrag={this.props.onEndDrag}
          onBeginDrag={this.props.onBeginDrag}
          manager={this.props.manager}
          element={element}
          id={element.id}
        >
          <div>
            <LinkButton
              onClick={() => this.props.onDelete(element.id)}
            >
              <i
                className={`oi oi-circle-x`}
                style={{
                  width: 30,
                  height: 30,
                  color: 'white',
                }}
              />
            </LinkButton>
          </div>
          <TitleBarTitle>
            {this.props.typeMap[element.type].name}
          </TitleBarTitle>
          <div>
            <LinkButton
              onClick={() => this.props.toggleEditMode(element.id)}
            >
              <i
                className={`oi oi-cog`}
                style={{
                  width: 30,
                  height: 30,
                  color: 'white',
                }}
              />
            </LinkButton>
          </div>
          <Target
            beforeElement={element.id}
            id={`before-${element.id}`}
            key={`before-row-${element.id}`}
            active={manager.activeTarget === `before-${element.id}`}
            isDragging={manager.isDragging}
            onActivate={(id) => manager.activeTarget = id}
            onDrop={(source, target) => manager.onDrop(source, target)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '2px 5px 2px 5px',
              textAlign: 'center',
            }}
          />
          <ElementInterior>
            <Comp
              element={element}
              id={element.id}
              editMode={this.props.editMode}
              {...element.data}
            />
          </ElementInterior>
          {last && 
          (
            <Target
              afterElement={element.id}
              id={`after-${element.id}`}
              key={`after-${element.id}`}
              active={manager.activeTarget === `after-${element.id}`}
              isDragging={manager.isDragging}
              onActivate={(id) => manager.activeTarget = id}
              onDrop={(source, target) => manager.onDrop(source, target)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '2px 5px 2px 5px',                
              }}
            />
          )}
        </DraggableEditableElementContainer>
      </div>
    );
  }
};

EditableElementBase.propTypes = {
  manager: modelType,
  element: elementType,
  typeMap: PropTypes.object,
  onEndDrag: PropTypes.func.isRequired,
  onBeginDrag: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  last: PropTypes.bool,
  editMode: PropTypes.bool,
};

export default observer(EditableElementBase);
