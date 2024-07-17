import "./Task.scss";

function Task(props: any) {
  const { task } = props;
  console.log(task);
  return (
    <>
      <li className="task-item">
        {task.image && (
          <img className="card-cover" src={task.image} alt="card image" />
        )}
        {task.title}
      </li>
    </>
  );
}

export default Task;
