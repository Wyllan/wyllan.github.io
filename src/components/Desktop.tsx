import { useState, useEffect, useMemo, useCallback } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import React from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Cell, CellProps } from "./cell";

import styles from "./Desktop.module.css";
import { Shortcut, ShortcutProps } from "./shortcut";

interface Desktop extends Dimensions {
  grid: CellProps[][];
}

interface Dimensions {
  width: number;
  cols: number;
  rows: number;
  colWidth: number;
  rowHeight: number;
}

function calcCells(): Dimensions {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const rows = Math.floor(height / 64);
  const cols = Math.floor(width / 64) - 1;

  return { width, cols, rows, rowHeight: height / rows, colWidth: width / cols };
}

export function Desktop() {
  const [desktop, setDesktop] = useState<{ grid: CellProps[][] } & Dimensions>(generateDesktop(calcCells()));
  const [shortcuts, setShortcuts] = useState(() => generateShortcuts(desktop));
  const [movingShortcut, setMovingShortcut] = useState<ShortcutProps | null>(null);

  useEffect(() => {
    let resizeDelay: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeDelay);
      resizeDelay = window.setTimeout(() => setDesktop(generateDesktop(calcCells())), 150);
    });
  });

  const handleDragCancel = useCallback(() => {
    setMovingShortcut(null);
  }, []);

  const handleDragEnd = useCallback(
    function handleDragEnd(event: DragEndEvent) {
      if (!movingShortcut?.position || !event.over?.id) {
        return;
      }

      const { x: movingPieceX, y: movingPieceY } = movingShortcut.position;
      const [cellY, cellX] = event.over.id.toString().split("-").map(Number);

      const potentialExistingPiece = shortcuts[cellY][cellX];

      setMovingShortcut(null);

      if (event.over && !potentialExistingPiece) {
        const newPiece: ShortcutProps = {
          ...movingShortcut,
          position: { x: cellX, y: cellY },
        };
        // Clone shortcuts
        const newPieces = shortcuts.map((row) => row.slice());
        // Place new
        delete newPieces[movingPieceY][movingPieceX];
        newPieces[cellY][cellX] = newPiece;

        setShortcuts(newPieces);
      }
    },
    [movingShortcut, shortcuts],
  );

  const handleDragStart = useCallback(
    function handleDragStart({ active }: DragStartEvent) {
      const shortcut = shortcuts.reduce<ShortcutProps | undefined>((acc, row) => {
        return acc ?? row.find((cell) => cell?.id === active.id);
      }, undefined);

      if (shortcut) {
        setMovingShortcut(shortcut);
      }
    },
    [shortcuts],
  );

  return (
    <div id="desktop" className="flex grow overflow-hidden">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToWindowEdges]}
      >
        <div className={styles.Desktop} style={{ "--cols": desktop.cols, "--size": desktop.colWidth } as React.CSSProperties}>
          {desktop.grid.map((row, y) =>
            row.map((rowCase, x) => {
              const shortcut = shortcuts[y][x];

              if (!shortcut) {
                // const canDrop = movingShortcut
                //   ? checkCanMove(
                //       isOddTurn,
                //       movingShortcut.odd,
                //       movingShortcut,
                //       x,
                //       y
                //     ).canMove
                //   : false;

                return <Cell key={rowCase.id} {...rowCase} />;
              }

              return (
                <Cell key={rowCase.id} {...rowCase}>
                  <Shortcut {...shortcut} />
                </Cell>
              );
            }),
          )}
        </div>
      </DndContext>
    </div>
  );
}

function generateDesktop(d: Dimensions) {
  const grid: CellProps[][] = Array.from(Array(d.rows), () => new Array(d.cols));

  for (let y = 0; y < d.rows; y++) {
    for (let x = 0; x < d.cols; x++) {
      grid[y][x] = { id: `${y}-${x}`, x, y };
    }
  }

  return { grid, ...d };
}

function generateShortcuts({ grid, cols, rows }: Desktop) {
  const shortcuts: (ShortcutProps | undefined)[][] = Array.from(Array(rows), () => new Array(cols));

  // const shortcutsRows = [0];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // const boardCase = grid[y][x];
      if ([0].includes(y)) {
        shortcuts[y][x] = {
          odd: false,
          id: `${y}-${x}`,
          position: { x, y },
          disabled: false,
        };
      }
    }
  }

  return shortcuts;
}

// const ButtonC = ({ title, onClick }) => {
//   return (
//     <button
//       style={{ backgroundColor: "lightblue", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}
//       onClick={onClick}
//     >
//       <h2>{title}</h2>
//       {/* <p>This is my button component!</p> */}
//     </button>
//   );
// };

// export const Shortcut = (): ReactNode => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button className="bg-slate-400">Open popover</Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <div className="grid gap-4">
//           <div className="space-y-2">
//             <h4 className="font-medium leading-none">Dimensions</h4>
//             <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
//           </div>
//           <div className="grid gap-2"></div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };
// export const DesktopShortcut = ({ name, onClick, point }: DesktopShortcut): ReactNode => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <button className="bg-slate-400">Open popover</button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <div className="grid gap-4">
//           <div className="space-y-2">
//             <h4 className="font-medium leading-none">Dimensions</h4>
//             <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
//           </div>
//           <div className="grid gap-2"></div>
//         </div>
//       </PopoverContent>
//     </Popover>
//     // <button onClick={() => setShowModal(true)} className="bg-slate-400" key={name} data-grid={{ ...point, w: 1, h: 1, isResizable: false }}>
//     //   {name}
//     //   {showModal &&
//     //     createPortal(
//     //       <div className="modal">
//     //         <div>I'm a modal dialog</div>
//     //         <button onClick={() => setShowModal(false)}>Close</button>
//     //       </div>,
//     //       document.getElementById("desktop")!,
//     //     )}
//     // </button>
//   );
// };
