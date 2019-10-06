import React from "react";

export default function Tile(props) {
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
