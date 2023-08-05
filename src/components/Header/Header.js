import logo from "../../images/logo.png";
import s from "./Header.module.css";

export default function Header({ children }) {
  return (
    <header className={s.header__container}>
      <img className={s.header__image} src={logo} alt="логотип" />
      {children}
    </header>
  );
}
