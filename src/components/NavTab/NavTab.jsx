import { Link } from "react-router-dom";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <Link className="nav-tab__auth" to="/signup">
        Регистрация
      </Link>
      <Link className="nav-tab__entry" to="/signin">
        Войти
      </Link>
    </nav>
  );
}
