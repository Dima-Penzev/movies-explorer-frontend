import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import avatar from "../../images/icon-avatar.svg";

export default function Navigation() {
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();

  return (
    <div className="navigation">
      <button
        aria-label="меню"
        type="button"
        className="navigation__menu navigation__invisible"
        onClick={() => {
          setMenuOpened(true);
        }}
      ></button>
      <nav
        className={`navigation__container ${
          menuOpened && "navigation__opened"
        }`}
      >
        <button
          className="navigation__close navigation__invisible"
          type="button"
          aria-label="закрыть"
          onClick={() => {
            setMenuOpened(false);
          }}
        ></button>
        <Link
          className={`navigation__link navigation__invisible ${
            location.pathname === "/" && "navigation__link_active"
          }`}
          to="/"
        >
          Главная
        </Link>
        <Link
          className={`navigation__link ${
            location.pathname === "/movies" && "navigation__link_active"
          }`}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link
          className={`navigation__link ${
            location.pathname === "/saved-movies" && "navigation__link_active"
          }`}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </Link>
        <Link className="navigation__account" to="/profile">
          Аккаунт
          <span className="navigation__avatar">
            <img src={avatar} alt="аватар пользователя" />
          </span>
        </Link>
      </nav>
    </div>
  );
}
