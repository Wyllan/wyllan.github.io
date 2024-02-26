import React from "react";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

import styles from "./Cell.module.css";

export interface CellProps {
  children?: React.ReactElement | null | string;
  id: string;
  size?: number;
  validDropLocation?: boolean;
  x: number;
  y: number;
}

export function Cell({ children, validDropLocation, id, x, y, size }: CellProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ "--size": size } as React.CSSProperties}
      className={cn(styles.Cell, (x + y) % 2 ? styles.odd : styles.even, isOver && styles.over)}
      data-x={x}
      data-y={y}
    >
      {children}
    </div>
  );
}
