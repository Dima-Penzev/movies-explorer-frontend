import { Link } from "react-router-dom";
import s from "./Navigation.module.css";
import avatar from "../../images/icon-avatar.svg";

export default function Navigation() {
  return (
    <div className={s.navigation}>
      <button
        aria-label="меню"
        type="button"
        className={[s.navigation__menu, s.navigation__invisible].join(" ")}
      ></button>
      <nav className={s.navigation__container}>
        <button
          className={[s.navigation__close, s.navigation__invisible].join(" ")}
          type="button"
          aria-label="закрыть"
        ></button>
        <Link
          className={[s.navigation__link, s.navigation__invisible].join(" ")}
          to="/"
        >
          Главная
        </Link>
        <Link
          className={[s.navigation__link, s.navigation__linkActive].join(" ")}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link className={s.navigation__link} to="/saved-movies">
          Сохранённые фильмы
        </Link>
        <Link className={s.navigation__account} to="/profile">
          Аккаунт{" "}
          <span className={s.navigation__avatar}>
            <img src={avatar} alt="аватар пользователя" />
          </span>
        </Link>
      </nav>
    </div>
  );
}
