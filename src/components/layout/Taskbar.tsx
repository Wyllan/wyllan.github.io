import NavBar from "../navigation/NavBar";
import NavItem from "../navigation/NavItem";

export default function Taskbar() {
  return (
    <div className="taskbar flex items-center">
      <NavBar>
        <NavItem>START</NavItem>
        <NavItem url={"about"}>About</NavItem>
      </NavBar>
    </div>
  );
}
