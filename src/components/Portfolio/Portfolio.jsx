import { Link } from "react-router-dom";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            to="https://dima-penzev.github.io/how-to-learn/index.html"
            target="_blank"
            >
            Статичный сайт
            <span>&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            to="https://dima-penzev.github.io/russian-travel/index.html"
            target="_blank"
            >
            Адаптивный сайт
            <span>&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            to="https://mesto.full.nomoredomains.work"
            target="_blank"
            >
            Одностраничное приложение
            <span>&#8599;</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
