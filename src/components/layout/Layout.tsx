import Desktop from "./Desktop";
import Taskbar from "./Taskbar";

export default function Layout() {
  return (
    <div className=" flex min-h-screen min-w-full flex-col justify-end bg-sky-700">
      <Desktop />
      <Taskbar />
    </div>
  );
}
