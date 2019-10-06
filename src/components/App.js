import React, { useState } from "react";
import {
  TicTacToeGameStatus,
  getTicTacToeGameStatus
} from "../BoardStatusChecker";

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

    const gameStatus = getTicTacToeGameStatus(state.board);
    if (gameStatus != TicTacToeGameStatus.IN_PROGRESS) {
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
