import { Draggable } from "react-beautiful-dnd";
import "./Task.scss";
import { Dropdown, FormControl } from "react-bootstrap";
import { useBoard } from "../../contexts/boardContext";
import ConfirmModal from "../../Common/ConfirmModal";
import { useEffect, useRef, useState } from "react";
import { ActionState } from "../../types/actionState.type";

interface TaskProps {
  task: {
    id: string;
    title: string;
    image?: string | null;
    delete: boolean;
  };
  index: number;
  columnId: string;
  boardId: string;
}

function Task({ task, index, columnId, boardId }: TaskProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { deleteTask, updateTaskTitle } = useBoard();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<ActionState>({
    title: "",
    content: <p></p>,
    action: null,
  });
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [updateTitle, setUpdateTitle] = useState<boolean>(false);

  useEffect(() => {
    if (updateTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [updateTitle]);

  const handleDeleteCard = () => {
    setAction({
      title: "Delete Task",
      content: (
        <p>
          Are you sure you want to delete: <b>{task.title}</b>
        </p>
      ),
      action: () => deleteTask(boardId, columnId, task.id),
    });
    setOpen(true);
  };

  const handleUpdateTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateTaskTitle(boardId, columnId, task.id, newTaskTitle);
      setUpdateTitle(false);
    }
  };

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
            <img className="card-cover" src={task.image} alt="card cover" />
          )}
          <div className="task">
            {updateTitle ? (
              <FormControl
                type="text"
                className="form-control"
                ref={inputRef}
                size="sm"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleUpdateTitle}
              />
            ) : (
              <span>{task.title}</span>
            )}
            <div className="column-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" size="sm" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => setUpdateTitle(true)}>
                    Edit card title
                  </Dropdown.Item>
                  <Dropdown.Item href="#" onClick={handleDeleteCard}>
                    Remove card
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <ConfirmModal
            open={open}
            setOpen={setOpen}
            title={action.title}
            content={action.content}
            action={action.action}
          />
        </li>
      )}
    </Draggable>
  );
}

export default Task;
