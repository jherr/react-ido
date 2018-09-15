import React, { Component } from 'react';
import { Input, Label, FormGroup, Form } from 'reactstrap';
import { observer } from 'mobx-react';

class Editor extends Component {
  render() {
    return (
      <Form inline>
        {Object.keys(this.props.fields).map(f => (
          <FormGroup row key={f}>
            <Label for={`${this.props.id}-${f}`}>
              {this.props.fields[f].name}
            </Label>
            <Input
              id={`${this.props.id}-${f}`}
              type="text"
              value={this.props.element.data[f]}
              onChange={
                ({ target: { value }}) => this.props.element.data[f] = value
              }
            />
          </FormGroup>
        ))}
      </Form>
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
