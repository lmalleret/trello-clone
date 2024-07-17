import { useEffect, useState } from "react";
import { initData } from "../../actions/initData";
import Column from "../column/Column";
import "./BoardContent.scss";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function BoardContent() {
  const [board, setBoard] = useState<any>({});
  const [columns, setColumns] = useState<any>([]);

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
    const { source, destination, draggableId } = result;

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

      setColumns(newColumns);
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
      endTaskList.splice(destination.index, 0, task[0])

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

      setColumns(newColumns);
    }
  };

  return (
    <div className="board-columns">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column: any) => (
          <Column key={column.id} column={column} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default BoardContent;
