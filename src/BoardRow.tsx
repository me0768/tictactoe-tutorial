import * as React from "react";
import Square from "./Square";
import { CellValue } from "./CellValue";

interface Props {
  squares: CellValue[];
  winning: number[];
  onClick(i: number): void;
  rowNum: number;
}

const BoardRow: React.FC<Props> = ({ squares, winning, onClick, rowNum }) => {
  const renderSquare = React.useCallback(
    (i: number) => <Square key={i} colored={winning.includes(i)} value={squares[i]} onClick={() => onClick(i)} />,
    [onClick, squares, winning]
  );

  let renderSquares = [];
  const NUM_OF_SQUARES: number = 3;
  for (let i = 0; i < NUM_OF_SQUARES; i++) {
    renderSquares.push(renderSquare((NUM_OF_SQUARES * rowNum) + i));
  }

  return <div className="board-row">{renderSquares}</div>;
};

export default BoardRow;
