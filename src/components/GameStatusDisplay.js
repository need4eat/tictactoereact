import React from "react";

export default function GameStatusDisplay(props) {
  if (props.gameState.isGameInProgress) {
    return <NextTurnDisplay nextTurn={props.gameState.nextTurn} />;
  } else {
    return <GameOverDisplay winner={props.gameState.winner} />;
  }
}

function GameOverDisplay(props) {
  let displayString = "It's a DRAW!";
  if (props.winner == "X") {
    displayString = "X WON!";
  } else if (props.winner == "O") {
    displayString = "O WON!";
  }

  const style = { fontFamily: "sans-serif" };
  return <div style={style}>{displayString}</div>;
}

function NextTurnDisplay(props) {
  const style = { fontFamily: "sans-serif" };
  return <div style={style}>Next Turn: {props.nextTurn}</div>;
}
