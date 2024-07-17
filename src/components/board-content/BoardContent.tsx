import { useEffect, useState } from "react";
import { initData } from "../../actions/initData";
import Column from "../column/Column";
import "./BoardContent.scss";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";

function BoardContent() {
  const [board, setBoard] = useState<any>({});
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);
      setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'));
    }
  }, []);

  if (_.isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  return (
    <>
      <div className="board-columns">
        {columns &&
          !_.isEmpty(columns) &&
          columns.map((column: any) => {
            return <Column key={column.id} column={column} />;
          })}
      </div>
    </>
  );
}

export default BoardContent;
