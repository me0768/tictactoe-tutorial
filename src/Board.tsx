import * as React from "react";
import { CellValue } from "./CellValue";
import BoardRow from "./BoardRow";

interface Props {
  squares: CellValue[];
  winning: number[];
  onClick(i: number): void;
}

const Board: React.FC<Props> = ({ squares, winning, onClick }) => {
  const renderBoardRow = (rowNum: number) => (
    <BoardRow key={rowNum} squares={squares} onClick={onClick} winning={winning} rowNum={rowNum} />
  );

  let boardRows = [];
  const NUM_OF_ROWS: number = 3;
  for (let i = 0; i < NUM_OF_ROWS; i++) {
    boardRows.push(renderBoardRow(i));
  }

  return <div>{boardRows}</div>;
};

export default Board;
