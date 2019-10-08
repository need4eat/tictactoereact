import React, { useState } from "react";
import {
  TicTacToeGameStatus,
  getTicTacToeGameStatus
} from "../BoardStatusChecker";
import TileCollection from "./TileCollection";
import ResetButton from "./ResetButton";
import GameStatusDisplay from "./GameStatusDisplay";

export default function App() {
  return <Game />;
}

function Game() {
  const startingState = {
    turn: "X",
    board: [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    isGameInProgress: true,
    winner: "-"
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

    const gameStatus = getTicTacToeGameStatus(state.board, cellX, cellY);
    if (gameStatus != TicTacToeGameStatus.IN_PROGRESS) {
      state.isGameInProgress = false;

      switch (gameStatus) {
        case TicTacToeGameStatus.DRAW: {
          state.winner = "-";
          break;
        }
        case TicTacToeGameStatus.X_WON: {
          state.winner = "X";
          break;
        }
        case TicTacToeGameStatus.O_WON: {
          state.winner = "O";
          break;
        }
      }
    }

    setNextTurn(state.turn);

    setState({
      turn: state.turn,
      board: state.board,
      isGameInProgress: state.isGameInProgress,
      winner: state.winner
    });
  }

  function resetGame() {
    setState(startingState);
  }

  const gameState = {
    isGameInProgress: state.isGameInProgress,
    nextTurn: state.turn,
    winner: state.winner
  };

  return (
    <div>
      <GameStatusDisplay gameState={gameState} />
      <br />
      <br />
      <TileCollection board={state.board} onTileClicked={onTileClicked} />
      <br />
      <br />
      <ResetButton resetGame={resetGame} />
    </div>
  );
}
