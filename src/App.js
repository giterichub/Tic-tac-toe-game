import { useState } from "react";

function Square(props) {
  return (
    <button onClick={props.onSquareClick} className="square">
      {props.value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [state, setState] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculatePlayerTurn(squares)) {
      return;
    }
    var nextSquares = squares.slice();
    if (state) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setState(!state);
  }
  function clearUseState() {
    setSquares(Array(9).fill(null));
    setState(true);
  }

  const winner = calculatePlayerTurn(squares);
  let status;
  if (winner) {
    status = "WINNER: " + winner;
  } else {
    status = "TURN: " + (state ? "X" : "O");
  }

  return (
    <div>
      <div className="game-wrapper">
        <div className="status"> {status} </div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <button className="clear-button" onClick={clearUseState}>
          RESET
        </button>
      </div>
    </div>
  );
}

function calculatePlayerTurn(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
