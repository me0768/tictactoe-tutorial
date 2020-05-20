import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import { CellValue } from './CellValue';

const Game: React.FC = () => {
  const [history, setHistory] = React.useState([{
    squares: Array(9).fill(null)
  }]);
  const [stepNumber, setStepNumber] = React.useState(0);

  const current = history[stepNumber];
  const [xIsNext, setXIsNext] = React.useState(true);
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = React.useCallback((i: number) => {
    const updatedHistory = history.slice(0, stepNumber + 1);
    const updatedSquares = current.squares.slice();

    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    updatedSquares[i] = xIsNext ? "X" : "O";
    setHistory(updatedHistory.concat([{squares:updatedSquares}]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }, [current.squares, stepNumber, history, xIsNext]);

  const jumpTo = React.useCallback((step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0);
  }, []);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
