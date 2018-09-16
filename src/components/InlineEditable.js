
import React from 'react';
import styled from 'react-emotion';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { elementType } from '../types';

const FormGrid = styled('div')`
  display: grid;
  grid: auto-flow / 25% 75%;
`;

const Editor = ({ fields, id, element }) => (
  <FormGrid>
    {Object.keys(fields).map(f => [
      <label htmlFor={`${id}-${f}`}>
        {fields[f].name}
      </label>,
      <input
        id={`${id}-${f}`}
        type="text"
        value={element.data[f]}
        onChange={
            ({ target: { value } }) => element.data[f] = value
          }
      />,
    ])}
  </FormGrid>
);

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  element: elementType.isRequired,
};

const OberservingEditor = observer(Editor);

export default fields => Comp => props => (props.editMode ? (
  <OberservingEditor
    fields={fields}
    element={props.element}
    id={props.id}
  />
) : (
  <Comp
    {...props}
  />
));
