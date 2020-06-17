import * as React from 'react';
import { CellValue } from './CellValue';

interface SquareProps {
  colored: boolean
  value: CellValue
  onClick(): void
}

const Square: React.FC<SquareProps> = ({colored, value, onClick}) => {
  return (
    <button className={colored ? "colored square" : "square"} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;