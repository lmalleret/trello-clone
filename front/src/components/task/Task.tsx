import { Draggable } from "react-beautiful-dnd";
import "./Task.scss";

function Task(props: any) {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`task-item ${snapshot.isDragging ? "is-dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.image && (
            <img className="card-cover" src={task.image} alt="card image" />
          )}
          {task.title}
        </li>
      )}
    </Draggable>
  );
}

export default Task;
