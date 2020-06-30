import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board, { NUM_OF_ROWS } from './Board';
import { CellValue } from './CellValue';

const Game: React.FC = () => {
  const [history, setHistory] = React.useState([{
    squares: Array(9).fill(null),
    clickedSquare: {row: -1, col: -1}
  }]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [moveAsc, setMoveAsc] = React.useState(true);

  const current = history[stepNumber];
  const [xIsNext, setXIsNext] = React.useState(true);
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo && winnerInfo.winner ? winnerInfo.winner : null;
  const winningLine = winnerInfo && winnerInfo.winningLine ? winnerInfo.winningLine : [];
  const filledAllWithoutWinner = () => !current.squares.includes(null);
  
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (filledAllWithoutWinner()) {
    status = "Draw!!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = React.useCallback((col: number, row: number) => {
    const updatedHistory = history.slice(0, stepNumber + 1);
    const updatedSquares = current.squares.slice();

    if (calculateWinner(current.squares) || current.squares[row * NUM_OF_ROWS + col]) {
      return;
    }

    updatedSquares[row * NUM_OF_ROWS + col] = xIsNext ? "X" : "O";
    setHistory(updatedHistory.concat([{squares: updatedSquares, clickedSquare: {row, col}}]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }, [current.squares, stepNumber, history, xIsNext]);

  const reverseMoves = React.useCallback(() => {
    setMoveAsc(!moveAsc);
  }, [moveAsc]);

  const jumpTo = React.useCallback((step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0);
  }, []);

  const moves = history.map((step, move) => {
    const description = move ?
      `Go to move # ${move} (${step.clickedSquare.row}, ${step.clickedSquare.col})` :
      'Go to game start';
    return (
      <li className={(stepNumber === move) ? "red-text" : ""} key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winning={winningLine}
          onClick={(i, j) => handleClick(i,j)}
        />
      </div>
      <div className="game-info">
        <button onClick={() => reverseMoves()}>Move history upside down!</button>
        <div>{status}</div>
        <ol>{moveAsc ? moves : moves.reverse()}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares: CellValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: lines[i]
      }
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
