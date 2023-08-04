import { Link } from "react-router-dom";
import s from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer__container}>
      <h2 className={s.footer__title}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className={s.footer__content}>
        <Link className={s.footer__link} to="https://practicum.yandex.ru/">
          Яндекс.Практикум
        </Link>
        <Link className={s.footer__link} to="https://github.com/Dima-Penzev">
          Github
        </Link>
      </div>
      <p className={s.footer__year}>&copy; {year}</p>
    </footer>
  );
}
