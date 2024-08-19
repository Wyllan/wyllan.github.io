import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

import styles from "./Shortcut.module.css";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export interface ShortcutProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  odd: boolean;
  clone?: boolean;
  position?: { x: number; y: number };
  disabled?: boolean;
}

export function Shortcut({ clone, disabled, id, odd, position, ...props }: ShortcutProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // const test = (event) => console.log(event);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={{
            opacity: isDragging ? 0.5 : undefined,
            ...style,
          }}
          // onClick={() => alert("anything")}
          className={cn(styles.Shortcut, odd ? styles.odd : styles.even, disabled && styles.disabled, clone && styles.clone)}
          data-position={JSON.stringify(position)}
          // aria-describedby={`piece id ${id}`}
          // aria-roledescription="You have selected a piece"
          {...props}
          {...listeners}
          {...attributes}
        >
          {props.children}
        </div>
      </DialogTrigger>
      <DialogContent>Test</DialogContent>
    </Dialog>
  );
}
