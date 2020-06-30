import * as React from "react";
import Square from "./Square";
import { CellValue } from "./CellValue";
import { NUM_OF_ROWS } from "./Board";

interface Props {
  squares: CellValue[];
  winning: number[];
  onClick(i: number, j: number): void;
  rowNum: number;
}

const BoardRow: React.FC<Props> = ({ squares, winning, onClick, rowNum }) => {
  const renderSquare = React.useCallback(
    (i: number, j: number) => <Square
      key={(NUM_OF_SQUARES * j) + i}
      colored={winning.includes(j * NUM_OF_ROWS + i)}
      value={squares[j * NUM_OF_ROWS + i]}
      onClick={() => onClick(i, j)} />,
    [onClick, squares, winning]
  );

  let renderSquares = [];
  const NUM_OF_SQUARES: number = 3;
  for (let i = 0; i < NUM_OF_SQUARES; i++) {
    renderSquares.push(renderSquare(i, rowNum));
  }

  return <div className="board-row">{renderSquares}</div>;
};

export default BoardRow;
