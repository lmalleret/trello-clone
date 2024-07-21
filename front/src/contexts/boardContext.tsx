import React, { createContext, useState, ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { initData } from "../actions/initData";
import { Board } from "../types/board.type";
import { Column } from "../types/column.type";
import { Task } from "../types/task.type";

interface BoardContextProps {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  addColumn: (boardId: string, title: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  addTask: (boardId: string, columnId: string, title: string) => void;
  deleteTask: (boardId: string, columnId: string, taskId: string) => void;
  onDragEnd: (result: DropResult, boardId: string) => void;
  updateColumnTitle: (boardId: string, columnId: string, newTitle: string) => void;
  updateTaskTitle: (boardId: string, columnId: string, taskId: string, newTitle: string) => void;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>(initData.boards);

  const addColumn = (boardId: string, title: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      const board = updatedBoards.find((b) => b.id === boardId);
      if (board) {
        const newColumn: Column = {
          id: uuidv4(),
          boardId,
          title,
          taskOrder: [],
          tasks: [],
          delete: false,
        };
        board.columns.push(newColumn);
        board.columnOrder.push(newColumn.id);
      }
      return updatedBoards;
    });
  };

  const deleteColumn = (boardId: string, columnId: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      const board = updatedBoards.find((b) => b.id === boardId);
      if (board) {
        board.columns = board.columns.filter((col) => col.id !== columnId);
        board.columnOrder = board.columnOrder.filter((id) => id !== columnId);
      }
      return updatedBoards;
    });
  };

  const addTask = (boardId: string, columnId: string, title: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      const board = updatedBoards.find((b) => b.id === boardId);
      if (board) {
        const column = board.columns.find((col) => col.id === columnId);
        if (column) {
          const newTask: Task = {
            id: uuidv4(),
            boardId,
            columnId,
            title,
            image: null,
            delete: false,
          };
          column.tasks.push(newTask);
          column.taskOrder.push(newTask.id);
        }
      }
      return updatedBoards;
    });
  };

  const deleteTask = (boardId: string, columnId: string, taskId: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      const board = updatedBoards.find((b) => b.id === boardId);
      if (board) {
        const column = board.columns.find((col) => col.id === columnId);
        if (column) {
          column.tasks = column.tasks.filter((task) => task.id !== taskId);
          column.taskOrder = column.taskOrder.filter((id) => id !== taskId);
        }
      }
      return updatedBoards;
    });
  };

  const onDragEnd = (result: DropResult, boardId: string) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    const board = boards.find((b) => b.id === boardId);
    const boardIndex = boards.findIndex((b) => b.id === boardId);
    if (!board) return;

    const columns = board.columns;

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

      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards[boardIndex] = newBoard;
        return updatedBoards;
      });

      return;
    }

    const startColumn = columns.find((column) => column.id === source.droppableId);
    const endColumn = columns.find((column) => column.id === destination.droppableId);
    if (!startColumn || !endColumn) return;

    if (startColumn === endColumn) {
      const newTaskOrder = Array.from(startColumn.taskOrder);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskOrder: newTaskOrder,
      };

      const newColumns = columns.map((col) =>
        col.id === newColumn.id ? newColumn : col
      );

      const newBoard = {
        ...board,
        columns: newColumns,
      };

      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards[boardIndex] = newBoard;
        return updatedBoards;
      });
    } else {
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

      const newColumns = columns.map((col) => {
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

      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards[boardIndex] = newBoard;
        return updatedBoards;
      });
    }
  };

  const updateColumnTitle = (boardId: string, columnId: string, newTitle: string) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          const updatedColumns = board.columns.map((column) => {
            if (column.id === columnId) {
              return { ...column, title: newTitle };
            }
            return column;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
    });
  };

  const updateTaskTitle = (boardId: string, columnId: string, taskId: string, newTitle: string) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          const updatedColumns = board.columns.map((column) => {
            if (column.id === columnId) {
              const updatedTasks = column.tasks.map((task) => {
                if (task.id === taskId) {
                  return { ...task, title: newTitle };
                }
                return task;
              });
              return { ...column, tasks: updatedTasks };
            }
            return column;
          });
          return { ...board, columns: updatedColumns };
        }
        return board;
      });
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        addColumn,
        deleteColumn,
        addTask,
        deleteTask,
        onDragEnd,
        updateColumnTitle,
        updateTaskTitle,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
