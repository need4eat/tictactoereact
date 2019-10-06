import React, { useState } from "react";

export default function App() {
  return <Game />;
}

function Game() {
  const startingState = {
    turn: "X",
    board: [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    isGameInProgress: true
  };

  const [state, setState] = useState(startingState);

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

    // Check if the game has ended in a draw
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

  function setNextTurn(currentTurn) {
    state.turn = currentTurn == "X" ? "O" : "X";
  }

  function setBoardState(cellX, cellY) {
    state.board[cellY][cellX] = state.turn;
  }

  function onTileClicked(cellX, cellY) {
    if (!state.isGameInProgress) {
      return;
    }

    setBoardState(cellX, cellY);

    if (hasGameEnded(state.board)) {
      state.isGameInProgress = false;
    }

    setNextTurn(state.turn);

    setState({
      turn: state.turn,
      board: state.board,
      isGameInProgress: state.isGameInProgress
    });
  }

  function resetGame() {
    setState(startingState);
  }

  return (
    <div>
      <GameStatus isGameInProgress={state.isGameInProgress} />
      <br />
      <br />
      <Tiles board={state.board} onTileClicked={onTileClicked} />
      <br />
      <br />
      <CurrentTurn turn={state.turn} />
      <br />
      <br />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

function Tiles(props) {
  function onTileClicked(cellX, cellY) {
    props.onTileClicked(cellX, cellY);
  }

  let style = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(128,0,0)"
  };

  return (
    <div>
      <table>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[0][0]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[0][1]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[0][2]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[1][0]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[1][1]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[1][2]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[2][0]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[2][1]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[2][2]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={2}
            />
          </td>
        </tr>
      </table>
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
      onClick={() => {
        if (cellState != "") {
          return;
        }
        props.onTileClicked(props.cellX, props.cellY);
      }}
    >
      {cellState}
    </div>
  );
}

function CurrentTurn(props) {
  return <div>Next Turn: {props.turn}</div>;
}

function GameStatus(props) {
  const color = props.isGameInProgress ? "green" : "red";
  return (
    <div style={{ color: color, fontSize: "30" }}>&nbsp;&nbsp;&nbsp;⏺</div>
  );
}
