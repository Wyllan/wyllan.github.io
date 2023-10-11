import { useState, useEffect } from "react";

function calcCells() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const rows = Math.floor(height / 64);
  const cols = Math.floor(width / 64);

  console.log(Math.ceil(rows * cols));

  return Math.ceil(rows * cols);
}

export default function Desktop() {
  const [totalCells, setTotalCells] = useState(calcCells());

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTotalCells(calcCells());
    });
  });

  return (
    <div className="flex grow flex-wrap-reverse justify-evenly">
      {Array(totalCells)
        .fill(null)
        .map((_, i) => (
          <Cell key={i} />
        ))}
    </div>
  );
}

function Cell() {
  return <h4 className="flex w-16 grow items-center justify-center border-2 border-stone-300">X</h4>;
}
