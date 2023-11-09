import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Button({ children }: Props) {
  return <button className="">{children}</button>;
}
