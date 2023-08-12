import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__content">
        <Link className="footer__link" to="https://practicum.yandex.ru/" target="_blank">
          Яндекс.Практикум
        </Link>
        <Link className="footer__link" to="https://github.com/Dima-Penzev" target="_blank">
          Github
        </Link>
      </div>
      <p className="footer__year">&copy; {year}</p>
    </footer>
  );
}
