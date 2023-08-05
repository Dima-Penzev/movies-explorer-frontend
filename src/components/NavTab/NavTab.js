import { Link } from "react-router-dom";
import s from "./NavTab.module.css";

export default function NavTab() {
  return (
    <nav className={s.navTab}>
      <Link className={s.navTab__auth} to="/signup">
        Регистрация
      </Link>
      <Link className={s.navTab__entry} to="/signin">
        Войти
      </Link>
    </nav>
  );
}
