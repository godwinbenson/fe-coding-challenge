export const SELECT_CELL = "SELECT_CELL";
export const RESET_GAME = "RESET_GAME";
export const GAME_WON = "GAME_WON";

export function gameWon(currentPlayer) {
  return { type: GAME_WON, winner: currentPlayer };
}

export function selectCell(currentPlayer, row, col) {
  return (dispatch, getState) => {
    const hasWinner = getState().game.winner;
    dispatch({
      type: SELECT_CELL,
      currentPlayer,
      row,
      col,
    });
    if (checkGameWon(getState().board) && !hasWinner)
      dispatch(gameWon(currentPlayer));
  };
}

export function resetGame() {
  return { type: RESET_GAME };
}

function checkForMatchingRow(arrayOfArrays) {
  let matchingRow = arrayOfArrays.filter(
    (cellRows) =>
      cellRows.filter(Boolean).length === 3 &&
      cellRows.every((cell) => cell === cellRows[0])
  );
  if (matchingRow.length > 0) return true;
  return false;
}

function checkGameWon(board = []) {
  function checkHorizontal() {
    return checkForMatchingRow(board);
  }
  function checkVertical() {
    let transposedBoard = transpose(board);
    return checkForMatchingRow(transposedBoard);
  }
  function checkDiagonal() {
    const diagonalIndexes = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    let diagonalCells = diagonalIndexes.map((indexGroup) =>
      indexGroup.map((indices) => board.flat()[indices])
    );
    return checkForMatchingRow(diagonalCells);
  }

  if (checkHorizontal() || checkVertical() || checkDiagonal()) return true;
  return false;
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}
