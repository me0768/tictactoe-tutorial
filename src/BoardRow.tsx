import * as React from "react";
import Square from "./Square";
import { CellValue } from "./CellValue";

interface Props {
  squares: CellValue[];
  onClick(i: number): void;
  rowNum: number;
}

const BoardRow: React.FC<Props> = ({ squares, onClick, rowNum }) => {
  const renderSquare = React.useCallback(
    (i: number) => <Square value={squares[i]} onClick={() => onClick(i)} />,
    [onClick, squares]
  );

  let renderSquares = [];
  const NUM_OF_SQUARES: number = 3;
  for (let i = 0; i < NUM_OF_SQUARES; i++) {
    renderSquares.push(renderSquare(i * rowNum));
  }

  return <div className="board-row">{renderSquares}</div>;
};

export default BoardRow;
