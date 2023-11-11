import { Link } from "react-router-dom";

export default function TaskbarItem({ url, children }: any) {
  return (
    <li className="m-1">
      <Link to={url}>
        <button>{children}</button>
      </Link>
    </li>
  );
}
