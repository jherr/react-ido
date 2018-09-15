import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default Comp => DragDropContext(HTML5Backend)(Comp);
