import { Link } from "react-router-dom";
import s from "./Navigation.module.css";
import avatar from "../../images/icon-avatar.svg";

export default function Navigation() {
  return (
    <>
      <button></button>
      <nav className={s.navigation}>
        <button
          className={[s.navigation__close, s.navigation__invisible].join(" ")}
          type="button"
          aria-label="закрыть"
        ></button>
        <Link
          className={[s.navigation__link, s.navigation__invisible].join(" ")}
        >
          Главная
        </Link>
        <Link className={s.navigation__link}>Фильмы</Link>
        <Link className={s.navigation__link}>Сохранённые фильмы</Link>
        <Link className={s.navigation__account}>
          Аккаунт{" "}
          <span className={s.navigation__avatar}>
            <img src={avatar} alt="аватар пользователя" />
          </span>
        </Link>
      </nav>
    </>
  );
}