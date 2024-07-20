import { DropResult } from "react-beautiful-dnd";
import { mapOrder } from "./sorts";

export const onDragEnd = (result: DropResult, board: any, columns: any, setBoard: any, setColumns: any) => {
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