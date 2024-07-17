import { Draggable, Droppable } from "react-beautiful-dnd";
import { mapOrder } from "../../utilities/sorts";
import Task from "../task/Task";
import "./Column.scss";
import _ from "lodash";

function Column(props: any) {
  const { column, index } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <header {...provided.dragHandleProps}>{column.title}</header>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <ul
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task: any, index: number) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <footer>
            <div className="footer-action">
              <i className="fa fa-plus"></i> Add another card
            </div>
          </footer>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
