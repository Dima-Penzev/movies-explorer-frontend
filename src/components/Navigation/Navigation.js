import { Link } from "react-router-dom";
import s from "./Navigation.module.css";
import avatar from "../../images/icon-avatar.svg";

export default function Navigation() {
  return (
    <nav>
      <Link className={s.navigation__link}>Фильмы</Link>
      <Link className={s.navigation__link}>Сохранённые фильмы</Link>
      <Link className={s.navigation__account}>
        Аккаунт{" "}
        <span className={s.navigation__avatar}>
          <img src={avatar} alt="аватар пользователя" />
        </span>
      </Link>
    </nav>
  );
}
