import { mapOrder } from "../../utilities/sorts";
import Task from "../task/Task";
import "./Column.scss";
import _ from "lodash";

function Column(props: any) {
  const { column } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  return (
    <>
      <div className="column">
        <header>{column.title}</header>
        <ul className="task-list">
          {tasks &&
            !_.isEmpty(tasks) &&
            tasks.map((task: any) => <Task key={task.id} task={task} />)}
        </ul>
        <footer>Add another card</footer>
      </div>
    </>
  );
}

export default Column;
