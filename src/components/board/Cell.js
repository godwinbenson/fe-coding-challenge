import React from "react";

const Cell = ({ player, winner, onClick, ...rest }) => {
  return (
    <div
      className={`Cell ${player}`}
      onClick={() => !player && !winner && onClick()}
      {...rest}
    >
      {player}
    </div>
  );
};

export default Cell;
