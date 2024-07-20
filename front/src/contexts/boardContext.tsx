import React, { createContext, useState, ReactNode, useContext } from "react";
import { initData } from "../actions/initData";
import { v4 as uuidv4 } from "uuid";

const BoardContext = createContext<any>(null);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [boards, setBoards] = useState<any>(initData.boards);

  const addColumn = (boardId: string, title: string) => {
    setBoards((prevBoards: any) => {
      const updatedBoards = [...prevBoards];
      const board = updatedBoards.find((b) => b.id === boardId);
      if (board) {
        const newColumn: any = {
          id: uuidv4(),
          title,
          taskOrder: [],
          tasks: [],
        };
        board.columns.push(newColumn);
        board.columnOrder.push(newColumn.id);
      }
      return updatedBoards;
    });
  };

  const deleteColumn = (boardId: string, columnId: string) => {
    setBoards((prevBoards: any) => {
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
            title,
            image: null,
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

  return (
    <BoardContext.Provider
      value={{ boards, setBoards, addColumn, deleteColumn, addTask, deleteTask }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a UserProvider");
  }
  return context;
};
