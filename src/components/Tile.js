import React from "react";

export default function Tile(props) {
  const cellText = props.cellState == "-" ? "" : props.cellState;

  const font = {
    fontFamily: "sans-serif",
    fontSize: "40px",
    color: props.cellState == "X" ? "blue" : "red"
  };

  const layout = {
    width: "50px",
    height: "50px",
    textAlign: "center",
    verticalAlign: "middle",
    display: "table-cell"
  };

  return (
    <div
      style={{
        ...layout,
        ...font
      }}
      onClick={() => {
        if (cellText != "") {
          return;
        }
        props.onTileClicked(props.cellX, props.cellY);
      }}
    >
      {cellText}
    </div>
  );
}
