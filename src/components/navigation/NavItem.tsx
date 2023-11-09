import { Link } from "react-router-dom";
import Button from "../Button";

export default function NavItem({ url, children }: any) {
  return (
    <li className="m-1">
      <Link to={url}>
        <Button>{children}</Button>
      </Link>
    </li>
  );
}
