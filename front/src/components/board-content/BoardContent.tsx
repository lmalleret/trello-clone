import { useEffect, useRef, useState } from "react";
import Column from "../column/Column";
import "./BoardContent.scss";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useBoard } from "../../contexts/boardContext";
import { Board } from "../../types/board.type";
import { Column as ColumnType } from "../../types/column.type";

function BoardContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { boards, addColumn, onDragEnd } = useBoard();
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");

  useEffect(() => {
    if (open === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!_.isEmpty(boards)) {
      const board = boards.find((board: Board) => board.id === "board-1");
      if (board) {
        setBoard(board);
        setColumns(mapOrder(board.columns, board.columnOrder, "id"));
      }
    }
  }, [boards]);

  const handleColumnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const handleDragEnd = (result: DropResult) => {
    if (board) {
      onDragEnd(result, board.id);
    }
  };

  return (
    <>
      {_.isEmpty(boards) ? (
        <p>Board not found</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="board-columns"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columns.map((column, index) => (
                  <Column
                    key={column.id}
                    column={column}
                    index={index}
                    boardId={board!.id}
                  />
                ))}
                {!open ? (
                  <button className="btn-new-column" onClick={() => setOpen(true)}>
                    <i className="fa fa-plus icon"> </i> Add another column
                  </button>
                ) : (
                  <div className="content-add-column">
                    <input
                      type="text"
                      className="form-control"
                      ref={inputRef}
                      name="title"
                      value={columnTitle}
                      onChange={handleColumnTitle}
                    />
                    <div className="group-btn">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          if (board) {
                            addColumn(board.id, columnTitle);
                            setOpen(false);
                            setColumnTitle("");
                          }
                        }}
                      >
                        Add list
                      </button>
                      <i className="fa fa-times icon" onClick={() => setOpen(false)}></i>
                    </div>
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

export default BoardContent;
