import React, { useState } from "react";

const GameState = {
  NEW_GAME: "New Game",
  PLAYER_X: "Player X's Turn",
  PLAYER_O: "Player Y's Turn",
  GAME_OVER: "Game Over"
};

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      This is a sample stateful and server-side rendered React application.
      <br />
      <br />
      Here is a button that will track how many times you click it:
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Game />
    </div>
  );
}

function Game() {
  const [state, setState] = useState({
    currentPlayer: "X",
    nextPlayer: "O",
    board: [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    gameState: GameState.NEW_GAME
  });

  function isYCompleted(cellY, board) {
    if (board[cellY][0] == "-") return false;
    let candidate = board[cellY][0];
    for (let x = 0; x < 2; ++x) {
      if (board[cellY][x] != candidate) return false;
    }
    return true;
  }

  function isXCompleted(cellX, board) {
    if (board[0][cellX] == "-") return false;
    let candidate = board[0][cellX];
    for (let y = 0; y < 2; ++y) {
      if (board[y][cellX] != candidate) return false;
    }
    return true;
  }

  function isGameOver(board) {
    for (let i = 0; i < 2; ++i) {
      if (isYCompleted(i, board) || isXCompleted(i, board)) return true;
    }
  }

  function setCurrentPlayer(player) {
    setState({
      currentPlayer: player,
      nextPlayer: player == "X" ? "O" : "X",
      board: state.board,
      gameState: player == "X" ? setGameState(GameState.PLAYER_X) : setGameState(GameState.PLAYER_O),
    });
  }

  function setBoardState(cellX, cellY) {
    state.board[cellY][cellX] = state.currentPlayer;
  }

  function setGameState(gameState) {
    state.gameState = gameState;
  }

  function onTileClicked(cellX, cellY) {
    if (state.board[cellY][cellX] != "-") return;

    setBoardState(cellX, cellY);
    setCurrentPlayer(state.nextPlayer);

    if (isGameOver(state.board)) {
      setGameState(GameState.GAME_OVER);
    }
  }

  return (
    <div>
      <GameStatus gameState={state.gameState} />
      <CurrentPlayer currentPlayer={state.currentPlayer} />
      <Tile
        cellState={state.board[0][0]}
        onTileClicked={onTileClicked}
        cellY={0}
        cellX={0}
      />
      <Tile
        cellState={state.board[0][1]}
        onTileClicked={onTileClicked}
        cellY={0}
        cellX={1}
      />
      <Tile
        cellState={state.board[0][2]}
        onTileClicked={onTileClicked}
        cellY={0}
        cellX={2}
      />
      <br />
      <Tile
        cellState={state.board[1][0]}
        onTileClicked={onTileClicked}
        cellY={1}
        cellX={0}
      />
      <Tile
        cellState={state.board[1][1]}
        onTileClicked={onTileClicked}
        cellY={1}
        cellX={1}
      />
      <Tile
        cellState={state.board[1][2]}
        onTileClicked={onTileClicked}
        cellY={1}
        cellX={2}
      />
      <br />
      <Tile
        cellState={state.board[2][0]}
        onTileClicked={onTileClicked}
        cellY={2}
        cellX={0}
      />
      <Tile
        cellState={state.board[2][1]}
        onTileClicked={onTileClicked}
        cellY={2}
        cellX={1}
      />
      <Tile
        cellState={state.board[2][2]}
        onTileClicked={onTileClicked}
        cellY={2}
        cellX={2}
      />
    </div>
  );
}

function Tile(props) {
  return (
    <div onClick={() => props.onTileClicked(props.cellX, props.cellY)}>
      {props.cellState}
    </div>
  );
}

function CurrentPlayer(props) {
  return <div>{props.currentPlayer}</div>;
}

function GameStatus(props) {
  return <div>{props.gameState}</div>;
}
