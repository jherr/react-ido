import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

import {
  Palette,
  EditableRender,
  StaticRender,
  SurfaceManager,
  IdoSurface,
  InlineEditable,
} from '../src';

import 'bootstrap/dist/css/bootstrap.min.css';
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

const sm = new SurfaceManager(config, elements);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Label check>
              <Input
                type="checkbox"
                id="checkbox2"
                checked={this.state.editable}
                onChange={() => this.setState({
                  editable: !this.state.editable,
                })}
              />
              Editable
            </Label>
          </div>
        </div>
        <div className="row">
        {
          this.state.editable ?
            [
              <div className="col-3" key="palette">
                <Palette
                  manager={sm}
                />
              </div>,
              <div className="col-9" key="edit-area">
                <EditableRender
                  manager={sm}
                />
              </div>
            ] : (
              <div>
                <StaticRender
                  manager={sm}
                />
              </div>
            )
        }
        </div>
      </div>
    );
  }
}

export default IdoSurface(App);
