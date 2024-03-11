import { useState, useEffect, useMemo, useCallback } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import React from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
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

  const rows = Math.floor(height / 64) - 2;
  const cols = Math.floor(width / 64);

  return { width, cols, rows, rowHeight: height / rows, colWidth: width / cols };
}

export function Desktop() {
  const [desktop, setDesktop] = useState<{ grid: CellProps[][] } & Dimensions>(generateDesktop(calcCells()));
  const [shortcuts, setShortcuts] = useState(() => generateShortcuts(desktop));
  const [movingShortcut, setMovingShortcut] = useState<ShortcutProps | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

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

      const { x: movingShortcutX, y: movingShortcutY } = movingShortcut.position;
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
        delete newPieces[movingShortcutY][movingShortcutX];
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
        sensors={sensors}
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
        {/* <DragOverlay>{movingShortcut?.id ? <Shortcut {...movingShortcut} /> : null}</DragOverlay> */}
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
