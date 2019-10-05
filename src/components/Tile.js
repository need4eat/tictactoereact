import React, { useState } from "react";

export default function Tile(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button id="tile" onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}