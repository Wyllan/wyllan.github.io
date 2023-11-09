import NavBar from "../navigation/NavBar";
import NavItem from "../navigation/NavItem";

export default function Taskbar() {
  return (
    <div className="taskbar flex items-center justify-between border-t border-white bg-stone-300">
      <NavBar>
        <NavItem>START</NavItem>
        <NavItem url={"about"}>About</NavItem>
      </NavBar>
      <Widget />
    </div>
  );
}

function Widget() {
  return <div className="widget m-1">WIDGET</div>;
}
