import React from 'react';
import TestRenderer from 'react-test-renderer';

import {
  IdoSurface,
  StaticRender,
} from '../../src';

const Field = ({ name, value }) => (
  <div>
    {`${name}: ${value}`}
  </div>
);

const config = {
  widgets: [
    {
      type: 'field',
      name: 'Field',
      icon: 'list',
      component: Field,
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

describe('StaticRenderer', () => {
  it('should render', () => {
    expect(
      TestRenderer.create(
        <IdoSurface
          config={config}
          elements={elements}
          onChange={() => {}}
        >
          <StaticRender />
        </IdoSurface>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
