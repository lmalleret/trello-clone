import { Draggable, Droppable } from "react-beautiful-dnd";
import { mapOrder } from "../../utilities/sorts";
import Task from "../task/Task";
import "./Column.scss";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import ConfirmModal from "../../Common/ConfirmModal";
import { useEffect, useRef, useState } from "react";

function Column(props: any) {
  const { column, index } = props;
  const tasks = mapOrder(column.tasks, column.taskOrder, "id");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({ title: "", content: <p></p> });
  const [updateTitle, setUpdateTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    setAction({
      title: "Delete column",
      content: (
        <p>
          Are you sure you want to delete: <b>{column.title}</b>
        </p>
      ),
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
                <input type="text" className="form-control" ref={inputRef} />
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
            <div className="footer-action">
              <i className="fa fa-plus"></i> Add another card
            </div>
          </footer>
          <ConfirmModal
            open={open}
            setOpen={setOpen}
            title={action.title}
            content={action.content}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
