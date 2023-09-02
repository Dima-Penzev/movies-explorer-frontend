import { Link } from "react-router-dom";
import "./UnknownPath.css";

export default function UnknownPath() {
  return (
    <div className="unknown">
      <div className="unknown__content">
        <h2 className="unknown__title">404</h2>
        <p className="unknown__text">Страница не найдена</p>
      </div>
      <Link className="unknown__link" to="/">
        Назад
      </Link>
    </div>
  );
}
