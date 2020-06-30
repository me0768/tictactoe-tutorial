import * as React from "react";
import { CellValue } from "./CellValue";
import BoardRow from "./BoardRow";

interface Props {
  squares: CellValue[];
  winning: number[];
  onClick(i: number, j: number): void;
}

export const NUM_OF_ROWS: number = 3;

const Board: React.FC<Props> = ({ squares, winning, onClick }) => {
  const renderBoardRow = (rowNum: number) => (
    <BoardRow key={rowNum} squares={squares} onClick={onClick} winning={winning} rowNum={rowNum} />
  );

  let boardRows = [];
  for (let i = 0; i < NUM_OF_ROWS; i++) {
    boardRows.push(renderBoardRow(i));
  }

  return <div>{boardRows}</div>;
};

export default Board;
