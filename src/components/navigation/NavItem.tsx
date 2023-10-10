import { Link } from "react-router-dom";

export default function NavItem({ url, children }: any) {
  return (
    <li>
      <button>
        <Link to={url}>{children}</Link>
      </button>
    </li>
  );
}
