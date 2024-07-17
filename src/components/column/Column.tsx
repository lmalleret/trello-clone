import { Droppable } from "react-beautiful-dnd";
import { mapOrder } from "../../utilities/sorts";
import Task from "../task/Task";
import "./Column.scss";
import _ from "lodash";

function Column(props: any) {
  const { column } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  return (
    <div className="column">
      <header>{column.title}</header>
      <Droppable droppableId={column.id}>
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
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
