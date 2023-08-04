import { Link } from "react-router-dom";
import s from "./UnknownPath.module.css";

export default function UnknownPath() {
  return (
    <div className={s.unknown__container}>
      <div className={s.unknown__content}>
        <h2 className={s.unknown__title}>404</h2>
        <p className={s.unknown__text}>Страница не найдена</p>
      </div>
      <Link className={s.unknown__link} to="/">
        Назад
      </Link>
    </div>
  );
}
