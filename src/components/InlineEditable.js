
import React, { Component } from 'react';
import styled from 'react-emotion';
import { observer } from 'mobx-react';

const FormGrid = styled('div')`
  display: grid;
  grid: auto-flow / 25% 75%;
`;

class Editor extends Component {
  render() {
    return (
      <FormGrid>
        {Object.keys(this.props.fields).map(f => [
          <label for={`${this.props.id}-${f}`}>
            {this.props.fields[f].name}
          </label>,
          <input
            id={`${this.props.id}-${f}`}
            type="text"
            value={this.props.element.data[f]}
            onChange={
              ({ target: { value }}) => this.props.element.data[f] = value
            }
          >
          </input>
        ])}
      </FormGrid>
    );
  }
}

const OberservingEditor = observer(Editor);

export default (fields) => (Comp) => (props) => {
  return props.editMode ? (
    <OberservingEditor
      fields={fields}
      element={props.element}
      id={props.id}
    />
  ) : (
    <Comp
      {...props}
    />
  );
}
