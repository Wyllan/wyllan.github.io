import Desktop from "./Desktop";
import Taskbar from "./Taskbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Desktop />
      <Taskbar />
    </>
  );
}
