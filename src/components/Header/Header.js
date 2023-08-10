import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import s from "./Header.module.css";

export default function Header({ children }) {
  return (
    <header className={s.header}>
      <Link className={s.header__link} to="/">
        <img className={s.header__image} src={logo} alt="логотип" />
      </Link>
      {children}
    </header>
  );
}
