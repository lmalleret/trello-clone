import { Draggable, Droppable } from "react-beautiful-dnd";
import { mapOrder } from "../../utilities/sorts";
import Task from "../task/Task";
import "./Column.scss";
import _ from "lodash";
import { Dropdown, FormControl } from "react-bootstrap";
import ConfirmModal from "../../Common/ConfirmModal";
import { useEffect, useRef, useState } from "react";
import { useBoard } from "../../contexts/boardContext";

function Column(props: any) {
  const { column, index, boardId } = props;
  const { deleteColumn, addTask } = useBoard();
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<any>({
    title: "",
    content: <p></p>,
    action: null,
  });
  const [updateTitle, setUpdateTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [newTask, setNewTask] = useState<boolean>(false);

  const handleDelete = () => {
    setAction({
      title: "Delete column",
      content: (
        <p>
          Are you sure you want to delete: <b>{column.title}</b>
        </p>
      ),
      action: () => deleteColumn(boardId, column.id),
    });
    setOpen(true);
  };

  useEffect(() => {
    if (updateTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [updateTitle]);

  const handleUpdateTitle = () => {
    //lógica para cambiar título
    setUpdateTitle(false);
  };

  const handleTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <header {...provided.dragHandleProps} className="column-drag-handle">
            <div
              className="column-title"
              onClick={() => setUpdateTitle(true)}
              onBlur={handleUpdateTitle}
            >
              {updateTitle ? (
                <FormControl
                  type="text"
                  className="form-control"
                  ref={inputRef}
                  size="sm"
                />
              ) : (
                column.title
              )}
            </div>
            <div className="column-dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-basic"
                  size="sm"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Add card</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={handleDelete}>
                    Remove column
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </header>
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
            {newTask ? (
              <div className="content-add-task">
                <input
                  type="text"
                  className="form-control"
                  ref={inputRef}
                  name="title"
                  value={taskTitle}
                  onChange={handleTaskTitle}
                />
                <div className="group-btn">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      addTask(boardId, column.id, taskTitle);
                      setNewTask(false);
                      setTaskTitle("");
                    }}
                  >
                    Add list
                  </button>
                  <i
                    className="fa fa-times icon"
                    onClick={() => setNewTask(false)}
                  ></i>
                </div>
              </div>
            ) : (
              <div className="footer-action" onClick={() => setNewTask(true)}>
                <i className="fa fa-plus"></i> Add another card
              </div>
            )}
          </footer>
          <ConfirmModal
            open={open}
            setOpen={setOpen}
            title={action.title}
            content={action.content}
            action={action.action}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
