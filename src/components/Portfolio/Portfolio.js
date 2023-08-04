import { Link } from "react-router-dom";
import s from "./Portfolio.module.css";

export default function Portfolio() {
  return (
    <div className={s.portfolio__container}>
      <h2 className={s.portfolio__title}>Портфолио</h2>
      <ul className={s.portfolio__list}>
        <li className={s.portfolio__item}>
          Статичный сайт
          <Link
            className={s.portfolio__link}
            to="https://dima-penzev.github.io/how-to-learn/index.html"
          >
            &#8599;
          </Link>
        </li>
        <li className={s.portfolio__item}>
          Адаптивный сайт{" "}
          <Link
            className={s.portfolio__link}
            to="https://dima-penzev.github.io/russian-travel/index.html"
          >
            &#8599;
          </Link>
        </li>
        <li className={s.portfolio__item}>
          Одностраничное приложение
          <Link
            className={s.portfolio__link}
            to="https://mesto.full.nomoredomains.work"
          >
            &#8599;
          </Link>
        </li>
      </ul>
    </div>
  );
}
