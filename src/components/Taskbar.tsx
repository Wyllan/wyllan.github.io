import TaskbarItem from "./TaskbarItem";

export default function Taskbar() {
  return (
    <div className="taskbar flex items-center justify-between border-t border-white bg-stone-300">
      <ul className="flex">
        <TaskbarItem>START</TaskbarItem>
        <TaskbarItem url={"about"}>About</TaskbarItem>
      </ul>
      <Widget />
    </div>
  );
}

function Widget() {
  return <div className="widget m-1">WIDGET</div>;
}
