import { useEffect, useRef, useState } from "react";
import Column from "../column/Column";
import "./BoardContent.scss";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoard } from "../../contexts/boardContext";
import { onDragEnd } from "../../utilities/onDragEnd";

function BoardContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { boards, addColumn } = useBoard();
  const [board, setBoard] = useState<any>({});
  const [columns, setColumns] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");

  useEffect(() => {
    if (open === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!_.isEmpty(boards)) {
      const board = boards.find((board: any) => board.id === "board-1");
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "id"));
    }
  }, [boards]);

  const handleColumnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  return (
    <>
      {_.isEmpty(boards) ? (
        <p>Board not found</p>
      ) : (
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, board, columns, setBoard, setColumns)
          }
        >
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
                    <Column
                      key={column.id}
                      column={column}
                      index={index}
                      boardId={board.id}
                    />
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
                      value={columnTitle}
                      onChange={handleColumnTitle}
                    />
                    <div className="group-btn">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          addColumn(board.id, columnTitle);
                          setOpen(false);
                          setColumnTitle("");
                        }}
                      >
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
      )}
    </>
  );
}

export default BoardContent;
