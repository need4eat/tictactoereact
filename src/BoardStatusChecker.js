export const TicTacToeGameStatus = {
  IN_PROGRESS: "in progress",
  DRAW: "draw",
  X_WON: "x won",
  O_WON: "o won"
};

export function getTicTacToeGameStatus(board, cellX, cellY) {
  const winnerCandidate = board[cellY][cellX];
  let isGameWon = false;

  if (isYCompleted(cellY, board) | isXCompleted(cellX, board)) {
    isGameWon = true;
  }

  if (cellX == cellY && isTopLeftDiagonalCompleted(board)) {
    isGameWon = true;
  }

  if (cellX + cellY == 2 && isTopRightDiagonalCompleted(board)) {
    isGameWon = true;
  }

  if (isGameWon) {
    return winnerCandidate == "X"
      ? TicTacToeGameStatus.X_WON
      : TicTacToeGameStatus.O_WON;
  }

  if (hasGameEndedInADraw(board)) {
    return TicTacToeGameStatus.DRAW;
  }

  return TicTacToeGameStatus.IN_PROGRESS;
}

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
  if (board[0][cellX] == "-") {
    return false;
  }

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

function hasGameEndedInADraw(board) {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (board[i][j] == "-") {
        return false;
      }
    }
  }

  return true;
}
