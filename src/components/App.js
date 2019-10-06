import React, { useState } from "react";
import {
  TicTacToeGameStatus,
  getTicTacToeGameStatus
} from "../BoardStatusChecker";
import TileCollection from "./TileCollection";
import ResetButton from "./ResetButton";

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
      <TileCollection board={state.board} onTileClicked={onTileClicked} />
      <br />
      <br />
      <CurrentTurn turn={state.turn} />
      <br />
      <br />
      <ResetButton resetGame={resetGame} />
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
