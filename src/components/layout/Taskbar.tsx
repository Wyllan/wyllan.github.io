import NavBar from "../navigation/NavBar";
import NavItem from "../navigation/NavItem";

export default function Taskbar() {
  return (
    <div className="taskbar flex items-center justify-between bg-stone-300">
      <NavBar>
        <NavItem>START</NavItem>
        <NavItem url={"about"}>About</NavItem>
      </NavBar>
      <Widget />
    </div>
  );
}

function Widget() {
  return <div className=" m-2">WIDGET</div>;
}
