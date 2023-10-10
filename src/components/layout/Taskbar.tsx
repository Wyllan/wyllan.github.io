import NavBar from "../navigation/NavBar";
import NavItem from "../navigation/NavItem";

export default function Taskbar() {
  return (
    <div className="taskbar flex">
      <button>Start</button>
      <NavBar>
        <NavItem url={"about"}>About</NavItem>
      </NavBar>
    </div>
  );
}
