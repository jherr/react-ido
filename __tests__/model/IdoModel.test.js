import { toJS } from 'mobx';

import IdoModel from '../../src/model/IdoModel';

const fixElements = elements => toJS(elements).map(row =>
  row.map((elem) => {
    delete elem.id;
    return elem;
  })
);

describe('IdoModel', () => {
  it('should construct', () => {
    const model = new IdoModel({
      a: true,
    }, [], () => {});
    expect(model.config.a).toBe(true);
  });

  it('should handle togging edit mode', () => {
    const model = new IdoModel({}, [], () => {});
    expect(model.editMode.a).toBe(undefined);
    model.toggleEditMode('a');
    expect(model.editMode.a).toBe(true);
    model.toggleEditMode('a');
    expect(model.editMode.a).toBe(false);
  });

  it('should handle starting a drag', () => {
    const model = new IdoModel({}, [], () => {});
    model.onBeginDrag();
    expect(model.isDragging).toBe(true);
  });

  it('should handle ending a drag', () => {
    const model = new IdoModel({}, [], () => {});
    model.onEndDrag();
    expect(model.isDragging).toBe(false);
  });

  it('should allow a delete', () => {
    const model = new IdoModel({}, [
      [
        {
          id: 'a',
        },
      ],
    ], () => {});
    model.onDelete('a');
    expect(model.elements).toEqual([]);
  });

  it('should handle a palette drop at the end', () => {
    const model = new IdoModel({}, [
      [
      ],
    ], () => {});
    model.onDrop({
      source: 'palette',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
      id: 'after',
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
  });

  it('should handle a palette drop at the front', () => {
    const model = new IdoModel({}, [
      [
      ],
    ], () => {});
    model.onDrop({
      source: 'palette',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
      beforeRow: 0,
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
  });

  it('should handle a palette drop before an element', () => {
    const model = new IdoModel({}, [
      [
        {
          id: 'a',
        },
      ],
    ], () => {});
    model.onDrop({
      source: 'palette',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
      beforeElement: 'a',
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
  });

  it('should handle a palette drop after an element and fire onChange', () => {
    const spy = jest.fn();
    const model = new IdoModel({}, [
      [
        {
          id: 'a',
        },
      ],
    ], spy);
    model.onDrop({
      source: 'palette',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
      afterElement: 'a',
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
    expect(spy).toBeCalled();
  });

  it('should ignore drops it doesn\'t understand', () => {
    const model = new IdoModel({}, [
      [
        {
          id: 'a',
        },
      ],
    ], () => {});
    model.onDrop({
      source: 'palette',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
  });

  it('should handle a palette drop after an element', () => {
    const model = new IdoModel({}, [
      [
        {
          id: 'a',
        },
      ],
      [
        {
          id: 'b',
        },
      ],
    ]);
    model.onDrop({
      id: 'a',
      widget: {
        type: 'foo',
        defaultValues: {},
      },
    }, {
      beforeElement: 'b',
    });
    expect(fixElements(model.elements)).toMatchSnapshot();
  });

  it('should ignore a palette drop it doesn\'t understand', () => {
    const model = new IdoModel({}, []);
    model.onDrop({}, {});
    expect(fixElements(model.elements)).toMatchSnapshot();
  });
});