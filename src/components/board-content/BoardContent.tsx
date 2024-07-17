import { useEffect, useRef, useState } from "react";
import { initData } from "../../actions/initData";
import Column from "../column/Column";
import "./BoardContent.scss";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function BoardContent() {
  const [board, setBoard] = useState<any>({});
  const [columns, setColumns] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef(null);
  const [newColumn, setNewColumn] = useState<any>({
    id: 0,
    boardId: 0,
    title: "",
    taskOrder: [],
    tasks: [],
  });

  useEffect(() => {
    if (open === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);
      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, "id")
      );
    }
  }, []);

  if (_.isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    // Si no hay destino (fuera de cualquier droppable), no hacer nada
    if (!destination) {
      return;
    }

    // Si la tarea fue soltada en la misma posición, no hacer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
      };

      setBoard(newBoard);
      setColumns(mapOrder(newBoard.columns, newBoard.columnOrder, "id"));
      return;
    }

    const startColumn = columns.find(
      (column: any) => column.id === source.droppableId
    );
    const endColumn = columns.find(
      (column: any) => column.id === destination.droppableId
    );

    // Si se está moviendo dentro de la misma columna
    if (startColumn === endColumn) {
      const newTaskOrder = Array.from(startColumn.taskOrder);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskOrder: newTaskOrder,
      };

      const newColumns = columns.map((col: any) =>
        col.id === newColumn.id ? newColumn : col
      );

      const newBoard = {
        ...board,
        columns: newColumns,
      };

      setColumns(newColumns);
      setBoard(newBoard);
    } else {
      // Si se está moviendo a otra columna
      const startTaskOrder = Array.from(startColumn.taskOrder);
      const startTaskList = Array.from(startColumn.tasks);
      startTaskOrder.splice(source.index, 1);
      const task = startTaskList.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskOrder: startTaskOrder,
        tasks: startTaskList,
      };

      const endTaskOrder = Array.from(endColumn.taskOrder);
      const endTaskList = Array.from(endColumn.tasks);
      endTaskOrder.splice(destination.index, 0, draggableId);
      endTaskList.splice(destination.index, 0, task[0]);

      const newEndColumn = {
        ...endColumn,
        taskOrder: endTaskOrder,
        tasks: endTaskList,
      };

      const newColumns = columns.map((col: any) => {
        if (col.id === newStartColumn.id) {
          return newStartColumn;
        }
        if (col.id === newEndColumn.id) {
          return newEndColumn;
        }
        return col;
      });

      const newBoard = {
        ...board,
        columns: newColumns,
      };

      setColumns(newColumns);
      setBoard(newBoard);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumn({ ...newColumn, [event.target.name]: event.target.value });
  };

  const addColumn = () => {
    const _columns = _.cloneDeep(columns);
    _columns.push({ ...newColumn, boardId: board.id, id: uuidv4() });
    setColumns(_columns);
    const newColumnOrder = _columns.map((col: any) => col.id);
    setBoard({ ...board, columnOrder: newColumnOrder, columns: _columns });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="board-columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns &&
                columns.map((column: any, index: number) => (
                  <Column key={column.id} column={column} index={index} />
                ))}
              {!open ? (
                <button
                  className="btn-new-column"
                  onClick={() => setOpen(true)}
                >
                  <i className="fa fa-plus icon"> </i> Add another column
                </button>
              ) : (
                <div className="content-add-column">
                  <input
                    type="text"
                    className="form-control"
                    ref={inputRef}
                    name="title"
                    value={newColumn.title}
                    onChange={handleChange}
                  />
                  <div>
                    <button className="btn-add-column" onClick={addColumn}>
                      Add list
                    </button>
                    <i
                      className="fa fa-times icon"
                      onClick={() => setOpen(false)}
                    ></i>
                  </div>
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default BoardContent;
