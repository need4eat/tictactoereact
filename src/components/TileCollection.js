import React from "react";
import Tile from "./Tile";

export default function TileCollection(props) {
  function onTileClicked(cellX, cellY) {
    props.onTileClicked(cellX, cellY);
  }

  let style = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(128,0,0)"
  };

  return (
    <div>
      <table>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[0][0]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[0][1]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[0][2]}
              onTileClicked={onTileClicked}
              cellY={0}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[1][0]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[1][1]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[1][2]}
              onTileClicked={onTileClicked}
              cellY={1}
              cellX={2}
            />
          </td>
        </tr>
        <tr>
          <td style={style}>
            <Tile
              cellState={props.board[2][0]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={0}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[2][1]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={1}
            />
          </td>
          <td style={style}>
            <Tile
              cellState={props.board[2][2]}
              onTileClicked={onTileClicked}
              cellY={2}
              cellX={2}
            />
          </td>
        </tr>
      </table>
    </div>
  );
}
