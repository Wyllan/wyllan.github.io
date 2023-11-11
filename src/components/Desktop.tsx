import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, ReactNode, Fragment, useRef } from "react";
import Draggable from "react-draggable";
import GridLayout, { Layout, Responsive, WidthProvider } from "react-grid-layout";
import Window from "./Window";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Dimensions = any;
// {
//   rowHeight: number;
//   width: number;
// };

type Point = { x: number; y: number };

type DesktopShortcut = { name: string; onClick: () => void; point: Point };

function calcCells(): Dimensions {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const rows = Math.floor(height / 64);
  const cols = Math.floor(width / 64) - 1;

  return { width, cols, rowHeight: height / rows };
}

export default function Desktop() {
  const [dimensions, setDimensions] = useState<Dimensions>(calcCells());

  useEffect(() => {
    let resizeDelay: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeDelay);
      resizeDelay = setTimeout(() => setDimensions(calcCells()), 150);
    });
  });
  const Loc = DesktopShortcut({ name: "Resume", onClick: () => {}, point: { x: 3, y: 2 } });
  const Test = Window({ x: 4, y: 4 });

  return (
    <>
      <GridLayout
        className="flex grow overflow-hidden"
        {...dimensions}
        compactType={null}
        isBounded
        autoSize={false}
        preventCollision
        margin={[2, 2]}
      >
        <div className="bg-slate-400" key="b" data-grid={{ x: 1, y: 0, w: 1, h: 1 }}>
          b
        </div>
        {Loc}
        {Test}
        <div className="bg-slate-400" key="a" data-grid={{ x: 8, y: 0, w: 1, h: 1 }}>
          a
        </div>
      </GridLayout>
    </>
  );
}

export const DesktopShortcut = ({ name, onClick, point }: DesktopShortcut): ReactNode => {
  return (
    <button onClick={onClick} className="bg-slate-400" key={name} data-grid={{ ...point, w: 1, h: 1, isResizable: false }}>
      {name}
    </button>
  );
};