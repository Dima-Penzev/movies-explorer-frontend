import logo from "../../images/logo.png";
import s from "./NavTab.module.css";
import { Link } from "react-router-dom";

export default function NavTab() {
  return (
    <header className={s.header__container}>
      <img className={s.header__image} src={logo} alt="логотип" />
      <nav className={s.header__nav}>
        <Link className={s.header__auth} to="/signup">
          Регистрация
        </Link>
        <Link className={s.header__entry} to="/signin">
          Войти
        </Link>
      </nav>
    </header>
  );
}
