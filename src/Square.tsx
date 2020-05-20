import * as React from 'react';
import { CellValue } from './CellValue';

interface SquareProps {
  value: CellValue 
  onClick(): void
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;