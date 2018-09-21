import React from 'react';
import TestRenderer from 'react-test-renderer';

import {
  IdoSurface,
  Palette,
  EditableRender,
  InlineEditable,
} from '../../src';

const Field = ({ name, value }) => (
  <div>
    {`${name}: ${value}`}
  </div>
);

const EditableField = InlineEditable({
  value: {
    name: 'Value',
  },
})(Field);

const config = {
  widgets: [
    {
      type: 'field',
      name: 'Field',
      icon: 'list',
      component: Field,
      editComponent: EditableField,
      defaultValues: {
        name: 'Foo',
        value: 'Bar'
      }
    },
  ],
};

const elements = [
  [
    {
      type: 'field',
      id: 2,
      data: {
        name: 'Price',
        value: '$20.00',
      },
      width: 6,
    },
  ],
];

describe('EditableRenderer', () => {
  it('should render', () => {
    expect(
      TestRenderer.create(
        <IdoSurface
          config={config}
          elements={elements}
          onChange={() => {}}
        >
          <Palette />
          <EditableRender />
        </IdoSurface>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
