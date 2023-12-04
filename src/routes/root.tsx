import { Desktop, Taskbar } from "@components";

export default function Root() {
  return (
    <div className="flex min-h-screen min-w-full flex-col justify-end bg-sky-600">
      <Desktop />
      <Taskbar />
    </div>
  );
}
