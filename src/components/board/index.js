import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCell, resetGame } from "../../store/actions/moves";
import Cell from "../board/Cell";
import "./index.css";

const selectBoard = (state) => state.board;
const selectGame = (state) => state.game;

// const getRandomCell = (i) => Math.floor(Math.random() * i);

export const Board = () => {
  const board = useSelector(selectBoard);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  return (
    <div className="BoardContainer">
      {/* Board: {JSON.stringify(board)} */}
      <div className="Board">
        <div className="BoardControl">
          <p>{game.currentPlayer}'s turn</p>
          <div className="Reset" onClick={() => dispatch(resetGame())}>
            Reset
          </div>
        </div>
        <div className="BoardGrid">
          {board.map((cellGroup, cellGroupIndex) =>
            cellGroup.map((cell, cellIndex) => (
              <Cell
                key={`${cellGroupIndex}${cellIndex}`}
                player={cell}
                winner={game.winner}
                onClick={() =>
                  dispatch(
                    selectCell(game.currentPlayer, cellGroupIndex, cellIndex)
                  )
                }
              />
            ))
          )}
        </div>

        <p style={{ textAlign: "center" }}>Winner: {game.winner}</p>
      </div>
    </div>
  );
};
