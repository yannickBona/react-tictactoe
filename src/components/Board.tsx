import { useState } from "react";
import Square from "./Square";
import "./styles.css";

const Board = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null)); // This is an array that stores the moves
  const [isX, setIsX] = useState<boolean>(true); // check which player is plpaying
  const [isGameEnded, setIsGameEnded] = useState(false); //check if game is ended
  const [foundWinner, setFoundWinner] = useState(false); // check if there is winner

  /*
  Manages the clicks on the board, checks if game is ended and stores the value of each move in the array
  @param i => index of the array
  */
  const handleClick = (i: number) => {
    if (foundWinner) {
      setFoundWinner(true);
      return;
    }

    if (squares[i]) return;

    squares[i] = isX ? "X" : "O";
    setIsX(!isX);
    setSquares(squares);

    if (checkWinner(squares)) {
      setFoundWinner(true);
    }

    if (squares.find((value) => value === null) === undefined) {
      setIsGameEnded(true);
    }
  };

  /*
  Restarts the game if the user clicks on the string. Empties the Array and set boolean to False
  */
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsGameEnded(false);
    setFoundWinner(false);
    setIsX(true);
  };

  const checkWinner = (squares: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setFoundWinner(true);
        return;
      }
    }
    return null;
  };

  return (
    <>
      {!isGameEnded && !foundWinner ? (
        <div className="board-container">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      ) : (
        <div className="restart">
          {foundWinner ? `Player ${isX ? "2" : "1"} WON!` : "TIE!"}
          <br />
          <br />
          <span onClick={restartGame} className="restart">
            Restart game
          </span>
        </div>
      )}

      <span className="player-turn">
        Turn: Player {isX ? "1 (X)" : "2 (O)"}
      </span>
    </>
  );
};

export default Board;
