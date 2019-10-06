import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return <Game />;
}

function Game() {
  const [state, setState] = useState({
    currentPlayer: "X",
    nextPlayer: "O",
    board: [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    isGameInProgress: true
  });

  function isYCompleted(cellY, board) {
    if (board[cellY][0] == "-") {
      return false;
    }

    const candidate = board[cellY][0];
    for (let x = 0; x < 3; ++x) {
      if (board[cellY][x] != candidate) {
        return false;
      }
    }

    return true;
  }

  function isXCompleted(cellX, board) {
    if (board[0][cellX] == "-") return false;
    const candidate = board[0][cellX];
    for (let y = 0; y < 3; ++y) {
      if (board[y][cellX] != candidate) return false;
    }
    return true;
  }

  function isTopLeftDiagonalCompleted(board) {
    if (board[0][0] == "-") {
      return false;
    }

    const candidate = board[0][0];
    for (let i = 0; i < 3; ++i) {
      if (board[i][i] != candidate) {
        return false;
      }
    }

    return true;
  }

  function isTopRightDiagonalCompleted(board) {
    if (board[0][2] == "-") {
      return false;
    }

    const candidate = board[0][2];
    for (let i = 0; i < 3; ++i) {
      if (board[i][2 - i] != candidate) {
        return false;
      }
    }

    return true;
  }

  function hasGameEnded(board) {
    // Check if somebody won the game
    for (let i = 0; i < 3; ++i) {
      if (isYCompleted(i, board) || isXCompleted(i, board)) {
        return true;
      }
    }

    if (
      isTopLeftDiagonalCompleted(board) ||
      isTopRightDiagonalCompleted(board)
    ) {
      return true;
    }

    // Check if the game ended in a draw
    let hasGameEndedInADraw = true;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (board[i][j] == "-") {
          hasGameEndedInADraw = false;
        }
      }
    }

    return hasGameEndedInADraw;
  }

  function setCurrentPlayer(player) {
    setState({
      currentPlayer: player,
      nextPlayer: player == "X" ? "O" : "X",
      board: state.board,
      isGameInProgress: state.isGameInProgress
    });
  }

  function setBoardState(cellX, cellY) {
    state.board[cellY][cellX] = state.currentPlayer;
  }

  function onTileClicked(cellX, cellY) {
    if (!state.isGameInProgress) {
      return;
    }

    if (state.board[cellY][cellX] != "-") {
      return;
    }

    setBoardState(cellX, cellY);

    if (hasGameEnded(state.board)) {
      state.isGameInProgress = false;
    }

    setCurrentPlayer(state.nextPlayer);
  }

  return (
    <div>
      <GameStatus isGameInProgress={state.isGameInProgress} />
      <br />
      <br />
      <table border="1">
        <tr>
          <td>
            <Tile
              cellState={state.board[0][0]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={0}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[0][1]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={1}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[0][2]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Tile
              cellState={state.board[1][0]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={0}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[1][1]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={1}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[1][2]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Tile
              cellState={state.board[2][0]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={0}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[2][1]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={1}
            />
          </td>
          <td>
            <Tile
              cellState={state.board[2][2]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={2}
            />
          </td>
        </tr>
      </table>
      <br />
      <br />
      <CurrentPlayer currentPlayer={state.currentPlayer} />
    </div>
  );
}

function Tile(props) {
  const cellState = props.cellState == "-" ? "" : props.cellState;
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        textAlign: "center"
      }}
      onClick={() => props.onTileClicked(props.cellX, props.cellY)}
    >
      {cellState}
    </div>
  );
}

function CurrentPlayer(props) {
  return <div>Next Turn: {props.currentPlayer}</div>;
}

function GameStatus(props) {
  const color = props.isGameInProgress ? "green" : "red";
  return (
    <div style={{ color: color, fontSize: "30" }}>&nbsp;&nbsp;&nbsp;⏺</div>
  );
}
