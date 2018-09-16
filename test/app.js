import React, { Component } from 'react';
import styled from 'react-emotion';

import {
  InlineEditable,
  IdoSurface,
  Palette,
  EditableRender,
  StaticRender,
} from '../src';

import '@icon/open-iconic/open-iconic.css';

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

const Image = ({ src }) => (
  <img
    className="rounded"
    style={{
      maxWidth: 500,
    }}
    alt="Probably a dog"
    src={src}
  />
);

const EditableImage = InlineEditable({
  src: {
    name: 'Source',
  },
})(Image);

const config = {
  widgets: [
    {
      type: 'field',
      name: 'Field',
      icon: 'list',
      editComponent: EditableField,
      component: Field,
      defaultValues: {
        name: 'Foo',
        value: 'Bar'
      }
    },
    {
      type: 'image',
      name: 'Image',
      icon: 'camera-slr',
      editComponent: EditableImage,
      component: Image,
      defaultValues: {
        src: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
      }
    }
  ]
};

const elements = [
  [
    {
      type: 'image',
      id: 1,
      data: {
        src: 'https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg',
      },
      width: 12,
    },
  ],
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
    {
      type: 'field',
      id: 3,
      data: {
        name: 'Artist',
        value: 'Matisse',
      },
      width: 6,
    },
  ],
  [
    {
      type: 'field',
      id: 4,
      data: {
        name: 'Medium',
        value: 'Black Velvet',
      },
      width: 6,
    }
  ]
];

const MainContainer = styled('div')`
  padding: 10px;
  font-family: arial, verdana, sans-serif;
`;
const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
    };
  }

  render() {
    return (
      <IdoSurface
        config={config}
        elements={elements}
        onChange={(els) => console.log(`changed - has ${els.length} rows`)}
      >
        <MainContainer>
          <div>
            <input
              type="checkbox"
              id="editable"
              checked={this.state.editable}
              onChange={() => this.setState({
                editable: !this.state.editable,
              })}
            />
            <label htmlFor="editable">
              Editable
            </label>
          </div>
          {this.state.editable ?
            (
              <GridContainer>
                <Palette />
                <EditableRender />
              </GridContainer>
            ) : (
              <StaticRender />
            )
          }
        </MainContainer>
      </IdoSurface>
    );
  }
}

export default App;
